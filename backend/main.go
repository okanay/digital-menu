package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	c "github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/configs/cleanup"
	memory "github.com/okanay/digital-menu/configs/memory"
	mw "github.com/okanay/digital-menu/configs/middlewares"
	"github.com/okanay/digital-menu/db"
	"github.com/okanay/digital-menu/handlers"
	ah "github.com/okanay/digital-menu/handlers/auth"
	mh "github.com/okanay/digital-menu/handlers/menu"
	rh "github.com/okanay/digital-menu/handlers/restaurant"
	"github.com/okanay/digital-menu/repositories/mail"
	mr "github.com/okanay/digital-menu/repositories/menu"
	rr "github.com/okanay/digital-menu/repositories/restaurant"
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
)

func main() {
	// 1. Environment Variables and Database Connection
	if err := godotenv.Load(".env.local"); err != nil {
		log.Fatalf("Error loading .env file")
		return
	}

	sqlDB, err := db.Init(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error connecting to database")
		return
	}
	defer sqlDB.Close()

	// 2. Configurations
	cleanup.Init(sqlDB)
	memory := memory.Init()
	rateLimit := mw.NewRateLimit(memory)
	timeout := mw.NewTimeout()

	// 4. Repositories
	userRepository := ur.NewRepository(sqlDB)
	sessionRepository := sr.NewRepository(sqlDB)
	menuRepository := mr.NewRepository(sqlDB)
	restaurantRepository := rr.NewRepository(sqlDB)
	mailRepository := mail.NewRepository()

	// 5. Handlers
	authHandler := ah.NewHandler(userRepository, sessionRepository, mailRepository)
	menuHandler := mh.NewHandler(menuRepository, restaurantRepository, mailRepository)
	restaurantHandler := rh.NewHandler(menuRepository, restaurantRepository, mailRepository)

	// 6. Router Initialize
	router := gin.Default()
	router.Use(c.SecureConfig)
	router.Use(c.CorsConfig())
	router.Use(timeout.Middleware())
	router.Use(rateLimit.Middleware())

	// 7. Route Groups
	// :: Only verified email users can access these routes without authentication.
	verifyMail := router.Group("/")
	verifyMail.Use(mw.VerifyMiddleware(userRepository))
	// :: Only authenticated users can access these routes
	auth := router.Group("/auth")
	auth.Use(mw.AuthMiddleware(sessionRepository, userRepository))
	// :: Only verified email users can access these routes with authentication.
	verifyAuth := auth.Group("/")
	verifyAuth.Use(mw.VerifyAuthMiddleware())

	// 8. API Routes
	// Global Routes
	router.GET("/", handlers.Index)
	router.NoRoute(handlers.NoRoute)

	// User Routes
	auth.GET("/check", authHandler.Check)
	auth.POST("/logout", authHandler.Logout)
	verifyMail.POST("/reset-password", authHandler.ResetPassword)
	verifyMail.POST("/reset-password-request", authHandler.ResetPasswordRequest)
	router.POST("/verify-email-request", authHandler.SendEmailVerify)
	router.POST("/verify-email", authHandler.VerifyEmail)
	router.POST("/login", authHandler.Login)
	router.POST("/register", authHandler.Register)

	// Restaurant Routes
	verifyAuth.POST("/restaurant", restaurantHandler.CreateRestaurant)
	verifyAuth.PATCH("/restaurant/:restaurantId", restaurantHandler.UpdateRestaurant)
	verifyAuth.DELETE("/restaurant/:restaurantId", restaurantHandler.DeleteRestaurant)
	auth.GET("/restaurants", restaurantHandler.SelectRestaurants)
	auth.GET("/restaurant/:restaurantId", restaurantHandler.SelectRestaurant)

	// Menu Routes
	verifyAuth.POST("/menu", menuHandler.CreateMenu)
	verifyAuth.PATCH("/menu/:menuId", menuHandler.UpdateMenu)
	verifyAuth.DELETE("/menu/:menuId", menuHandler.DeleteMenu)
	auth.GET("/menu/:restaurantId", menuHandler.SelectMenus)
	router.GET("/menu/:menuId", menuHandler.SelectMenu)

	// 9. Start Server
	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
