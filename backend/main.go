package main

import (
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	c "github.com/okanay/digital-menu/configs"
	mw "github.com/okanay/digital-menu/configs/middlewares"
	"github.com/okanay/digital-menu/db"
	"github.com/okanay/digital-menu/handlers"
	authUserHandler "github.com/okanay/digital-menu/handlers/auth-handlers/user"
	userHandler "github.com/okanay/digital-menu/handlers/user"
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
	ur := ur.NewUserRepository(sqlDB)
	sr := sr.NewSessionRepository(sqlDB)

	// ->> Middlewares
	router := gin.Default()
	router.Use(c.CorsConfig())
	router.Use(mw.SecureMiddleware)
	router.Use(mw.TimeoutMiddleware(150 * time.Second))

	// ->> Auth Group
	auth := router.Group("/auth")
	auth.Use(mw.AuthMiddleware(sr))

	// ->> Handlers
	userHandler := userHandler.NewUserHandler(ur, sr)
	authUserHandler := authUserHandler.NewAuthUserHandler(ur, sr)

	// ->> Main Routes
	router.GET("/", handlers.Index)

	router.POST("/login", userHandler.Login)
	router.POST("/register", userHandler.Register)
	router.POST("/forgot-password", userHandler.ForgotPassword)

	// ->> Auth Routes
	auth.POST("/logout", authUserHandler.Logout)
	auth.POST("/update-password", authUserHandler.UpdatePassword)

	// 404 Handler
	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"message": "The requested " + c.Request.URL.Path + " was not found."})
	})

	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
