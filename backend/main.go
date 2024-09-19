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
	mh "github.com/okanay/digital-menu/handlers/main-handlers/menu"
	uh "github.com/okanay/digital-menu/handlers/main-handlers/user"
	memory "github.com/okanay/digital-menu/memory"
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

	// ->> Memory
	memoryRepository := memory.Init()

	// :: Rate Limit
	rateLimit := mw.NewRateLimit(memoryRepository)

	// ->> Repositories
	userRepository := ur.NewRepository(sqlDB)
	sessionRepository := sr.NewRepository(sqlDB)
	menuRepository := mr.NewRepository(sqlDB)
	restaurantRepository := rr.NewRepository(sqlDB)

	// ->> Handlers
	userHandler := uh.NewHandler(userRepository, sessionRepository)
	menuHandler := mh.NewHandler(menuRepository, restaurantRepository)
	authUserHandler := ah.NewHandler(userRepository, sessionRepository)
	authMenuHandler := amh.NewHandler(menuRepository, restaurantRepository)
	authRestaurantHandler := arh.NewHandler(menuRepository, restaurantRepository)

	// ->> Groups
	// :: Main
	router := gin.Default()
	router.Use(c.CorsConfig())
	router.Use(mw.SecureMiddleware)
	router.Use(mw.TimeoutMiddleware(150 * time.Second))
	router.Use(rateLimit.Middleware())
	// :: Auth
	auth := router.Group("/auth")
	auth.Use(mw.AuthMiddleware(sessionRepository))

	// ->> Routes
	// :: Global Routes
	router.GET("/", g.Index)
	router.NoRoute(g.NoRoute)

	// :: User
	router.POST("/login", userHandler.Login)
	router.POST("/register", userHandler.Register)
	router.POST("/forgot-password", userHandler.ForgotPassword)
	auth.POST("/logout", authUserHandler.Logout)
	auth.POST("/update-password", authUserHandler.UpdatePassword)

	// :: Restaurant
	auth.GET("/restaurants", authRestaurantHandler.SelectRestaurants)
	auth.POST("/restaurant", authRestaurantHandler.CreateRestaurant)
	auth.GET("/restaurant/:restaurantId", authRestaurantHandler.SelectRestaurant)
	auth.PATCH("/restaurant/:restaurantId", authRestaurantHandler.UpdateRestaurant)
	auth.DELETE("/restaurant/:restaurantId", authRestaurantHandler.DeleteRestaurant)

	// :: Menu
	auth.POST("/menu", authMenuHandler.CreateMenu)
	auth.PATCH("/menu/:menuId", authMenuHandler.UpdateMenu)
	auth.DELETE("/menu/:menuId", authMenuHandler.DeleteMenu)
	auth.GET("/menu/:restaurantId", authMenuHandler.SelectMenus)
	router.GET(":menuId", menuHandler.SelectMenu)

	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
