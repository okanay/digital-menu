package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/okanay/digital-menu/db"

	c "github.com/okanay/digital-menu/configs"
	memory "github.com/okanay/digital-menu/configs/memory"
	mw "github.com/okanay/digital-menu/configs/middlewares"
	amh "github.com/okanay/digital-menu/handlers/auth-handlers/menu"
	arh "github.com/okanay/digital-menu/handlers/auth-handlers/restaurant"
	ah "github.com/okanay/digital-menu/handlers/auth-handlers/user"
	g "github.com/okanay/digital-menu/handlers/main-handlers"
	mh "github.com/okanay/digital-menu/handlers/main-handlers/menu"
	uh "github.com/okanay/digital-menu/handlers/main-handlers/user"
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
	authUserHandler := ah.NewHandler(userRepository, sessionRepository)
	authMenuHandler := amh.NewHandler(menuRepository, restaurantRepository)
	authRestaurantHandler := arh.NewHandler(menuRepository, restaurantRepository)

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
	router.GET("/", g.Index)
	router.NoRoute(g.NoRoute)

	// User Routes
	router.POST("/login", userHandler.Login)
	router.POST("/register", userHandler.Register)
	verified.POST("/forgot-password", userHandler.ForgotPassword)
	verified.POST("/forgot-password-request", userHandler.ForgotPasswordRequest)
	auth.GET("/check", authUserHandler.Check)
	auth.POST("/logout", authUserHandler.Logout)
	verifiedAuth.POST("/update-password", authUserHandler.UpdatePassword)

	// Restaurant Routes
	auth.GET("/restaurants", authRestaurantHandler.SelectRestaurants)
	auth.GET("/restaurant/:restaurantId", authRestaurantHandler.SelectRestaurant)
	verifiedAuth.POST("/restaurant", authRestaurantHandler.CreateRestaurant)
	verifiedAuth.PATCH("/restaurant/:restaurantId", authRestaurantHandler.UpdateRestaurant)
	verifiedAuth.DELETE("/restaurant/:restaurantId", authRestaurantHandler.DeleteRestaurant)

	// Menu Routes
	verifiedAuth.POST("/menu", authMenuHandler.CreateMenu)
	verifiedAuth.PATCH("/menu/:menuId", authMenuHandler.UpdateMenu)
	verifiedAuth.DELETE("/menu/:menuId", authMenuHandler.DeleteMenu)
	auth.GET("/menu/:restaurantId", authMenuHandler.SelectMenus)
	router.GET("/menu/:menuId", menuHandler.SelectMenu)

	// 8. Start Server
	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
