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
	if err := godotenv.Load(".env.local"); err != nil {
		log.Fatalf("Error loading .env file")
		return
	}

	// ->> Set Database Connection
	sqlDB, err := db.Init(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error connecting to database")
		return
	}
	defer sqlDB.Close()

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

	// ->> Main Group
	router := gin.Default()
	router.Use(c.CorsConfig())
	router.Use(mw.SecureMiddleware)
	router.Use(mw.TimeoutMiddleware(150 * time.Second))

	// :: Index
	router.GET("/", mh.Index)
	router.NoRoute(mh.NoRoute)

	// :: User Routes
	router.POST("/login", userHandler.Login)
	router.POST("/register", userHandler.Register)
	router.POST("/forgot-password", userHandler.ForgotPassword)

	// ->> Auth Group
	auth := router.Group("/auth")
	auth.Use(mw.AuthMiddleware(sessionRepository))
	// :: User Routes
	auth.POST("/logout", authUserHandler.Logout)
	auth.POST("/update-password", authUserHandler.UpdatePassword)

	// :: Restaurant Routes
	auth.GET("/restaurant", authRestaurantHandler.SelectRestaurants)
	auth.GET("/restaurant/:id", authRestaurantHandler.SelectRestaurant)
	auth.POST("/restaurant", authRestaurantHandler.CreateRestaurant)
	auth.PATCH("/restaurant/:id", authRestaurantHandler.UpdateRestaurant)
	auth.DELETE("/restaurant/:id", authRestaurantHandler.DeleteRestaurant)

	// :: Menu Routes
	auth.GET("/menu", authMenuHandler.Index)

	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
