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
	g "github.com/okanay/digital-menu/handlers/main-handlers"
	menuHandler "github.com/okanay/digital-menu/handlers/main-handlers/menu"
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
	menuHandler := menuHandler.NewHandler(menuRepository, restaurantRepository)

	authUserHandler := ah.NewHandler(userRepository, sessionRepository)
	authMenuHandler := amh.NewHandler(menuRepository, restaurantRepository)
	authRestaurantHandler := arh.NewHandler(menuRepository, restaurantRepository)

	// ->> Main Group
	router := gin.Default()
	router.Use(c.CorsConfig())
	router.Use(mw.SecureMiddleware)
	router.Use(mw.TimeoutMiddleware(150 * time.Second))

	// ->> Auth Group
	auth := router.Group("/auth")
	auth.Use(mw.AuthMiddleware(sessionRepository))

	// :: Global Routes
	router.GET("/", g.Index)
	router.NoRoute(g.NoRoute)

	// :: User Routes
	router.POST("/login", userHandler.Login)
	router.POST("/register", userHandler.Register)
	router.POST("/forgot-password", userHandler.ForgotPassword)
	auth.POST("/logout", authUserHandler.Logout)
	auth.POST("/update-password", authUserHandler.UpdatePassword)

	// :: Restaurant Routes
	auth.GET("/restaurant", authRestaurantHandler.SelectRestaurants)
	auth.POST("/restaurant", authRestaurantHandler.CreateRestaurant)
	auth.GET("/restaurant/:restaurantId", authRestaurantHandler.SelectRestaurant)
	auth.PATCH("/restaurant/:restaurantId", authRestaurantHandler.UpdateRestaurant)
	auth.DELETE("/restaurant/:restaurantId", authRestaurantHandler.DeleteRestaurant)

	// :: Menu Routes
	auth.POST("/menu", authMenuHandler.CreateMenu)
	auth.PATCH("/menu/:menuId", authMenuHandler.UpdateMenu)
	auth.DELETE("/menu/:menuId", authMenuHandler.DeleteMenu)
	auth.GET("/menu/:menuId", authMenuHandler.SelectMenus)
	router.GET("/menu/:menuId", menuHandler.SelectMenu)

	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
