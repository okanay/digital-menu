package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/okanay/digital-menu/db"
	"github.com/okanay/digital-menu/handlers"
	mh "github.com/okanay/digital-menu/handlers/menu"
	rh "github.com/okanay/digital-menu/handlers/restaurant"
	uh "github.com/okanay/digital-menu/handlers/user"

	c "github.com/okanay/digital-menu/configs"
	memory "github.com/okanay/digital-menu/configs/memory"
	mw "github.com/okanay/digital-menu/configs/middlewares"
	mr "github.com/okanay/digital-menu/repositories/menu"
	rr "github.com/okanay/digital-menu/repositories/restaurant"
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
)

func main() {
	// 1. Environment ve Database
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

	// 2. Memory ve Rate Limit
	memory := memory.Init()
	rateLimit := mw.NewRateLimit(memory)

	// 3. Repositories
	userRepository := ur.NewRepository(sqlDB)
	sessionRepository := sr.NewRepository(sqlDB)
	menuRepository := mr.NewRepository(sqlDB)
	restaurantRepository := rr.NewRepository(sqlDB)

	// 4. Handlers
	userHandler := uh.NewHandler(userRepository, sessionRepository)
	menuHandler := mh.NewHandler(menuRepository, restaurantRepository)
	restaurantHandler := rh.NewHandler(menuRepository, restaurantRepository)

	// 5. Router Setup
	router := gin.Default()
	router.Use(c.CorsConfig())
	router.Use(mw.SecureMiddleware)
	router.Use(mw.TimeoutMiddleware())
	router.Use(rateLimit.Middleware())

	// 6. Route Groups
	auth := router.Group("/auth")
	auth.Use(mw.AuthMiddleware(sessionRepository, userRepository))

	verified := router.Group("/")
	verified.Use(mw.VerifiedMiddleware(userRepository))

	verifiedAuth := auth.Group("/")
	verifiedAuth.Use(mw.VerifiedAuthMiddleware())

	// 7. Routes
	// Global Routes
	router.GET("/", handlers.Index)
	router.NoRoute(handlers.NoRoute)

	// User Routes
	router.POST("/login", userHandler.Login)
	router.POST("/register", userHandler.Register)
	verified.POST("/forgot-password", userHandler.ForgotPassword)
	verified.POST("/forgot-password-request", userHandler.ForgotPasswordRequest)
	auth.GET("/check", userHandler.Check)
	auth.POST("/logout", userHandler.Logout)
	verifiedAuth.POST("/update-password", userHandler.UpdatePassword)

	// Restaurant Routes
	auth.GET("/restaurants", restaurantHandler.SelectRestaurants)
	auth.GET("/restaurant/:restaurantId", restaurantHandler.SelectRestaurant)
	verifiedAuth.POST("/restaurant", restaurantHandler.CreateRestaurant)
	verifiedAuth.PATCH("/restaurant/:restaurantId", restaurantHandler.UpdateRestaurant)
	verifiedAuth.DELETE("/restaurant/:restaurantId", restaurantHandler.DeleteRestaurant)

	// Menu Routes
	verifiedAuth.POST("/menu", menuHandler.CreateMenu)
	verifiedAuth.PATCH("/menu/:menuId", menuHandler.UpdateMenu)
	verifiedAuth.DELETE("/menu/:menuId", menuHandler.DeleteMenu)
	auth.GET("/menu/:restaurantId", menuHandler.SelectMenus)
	router.GET("/menu/:menuId", menuHandler.SelectMenu)

	// 8. Start Server
	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
