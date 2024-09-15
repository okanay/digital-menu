package main

import (
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/okanay/digital-menu/db"

	c "github.com/okanay/digital-menu/configs"
	mw "github.com/okanay/digital-menu/configs/middlewares"
	amh "github.com/okanay/digital-menu/handlers/auth-handlers/menu"
	arh "github.com/okanay/digital-menu/handlers/auth-handlers/restaurant"
	ah "github.com/okanay/digital-menu/handlers/auth-handlers/user"
	mh "github.com/okanay/digital-menu/handlers/main-handlers"
	uh "github.com/okanay/digital-menu/handlers/main-handlers/user"
	mr "github.com/okanay/digital-menu/repositories/menu"
	rr "github.com/okanay/digital-menu/repositories/restaurant"
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
)

func main() {
	// ->> Load Environments
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatalf("Error loading .env file")
		return
	}
	// ->> Set Database Connection
	sqlDB, err := db.Init(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Println(err)
		return
	}
	defer db.Close(sqlDB)

	// ->> Repositories
	userRepository := ur.NewRepository(sqlDB)
	sessionRepository := sr.NewRepository(sqlDB)
	menuRepository := mr.NewRepository(sqlDB)
	restaurantRepository := rr.NewRepository(sqlDB)

	// ->> Handlers
	userHandler := uh.NewHandler(userRepository, sessionRepository)
	authUserHandler := ah.NewHandler(userRepository, sessionRepository)
	authMenuHandler := amh.NewHandler(menuRepository, restaurantRepository)
	authRestaurantHandler := arh.NewHandler(menuRepository, restaurantRepository)

	// ->> Middlewares
	router := gin.Default()
	router.Use(c.CorsConfig())
	router.Use(mw.SecureMiddleware)
	router.Use(mw.TimeoutMiddleware(150 * time.Second))

	// ->> Auth Group
	auth := router.Group("/auth")
	auth.Use(mw.AuthMiddleware(sessionRepository))

	// 404 Handler
	router.NoRoute(mh.NoRoute)
	// ->> Main Routes
	router.GET("/", mh.Index)

	router.POST("/login", userHandler.Login)
	router.POST("/register", userHandler.Register)
	router.POST("/forgot-password", userHandler.ForgotPassword)

	// ->> Auth Routes
	auth.POST("/logout", authUserHandler.Logout)
	auth.POST("/update-password", authUserHandler.UpdatePassword)

	auth.GET("/menu", authMenuHandler.Index)

	auth.GET("/restaurant", authRestaurantHandler.SelectRestaurants)
	auth.GET("/restaurant/:id", authRestaurantHandler.SelectRestaurant)
	auth.POST("/restaurant", authRestaurantHandler.CreateRestaurant)
	auth.DELETE("/restaurant/:id", authRestaurantHandler.DeleteRestaurant)

	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
