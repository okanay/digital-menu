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

	// ->> Middlewares
	router := gin.Default()
	router.Use(c.CorsConfig())
	router.Use(mw.SecureMiddleware)
	router.Use(mw.TimeoutMiddleware(150 * time.Second))

	// ->> Routes
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to Digital Menu API",
		})
	})

	// 404 Handler
	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"message": "The requested " + c.Request.URL.Path + " was not found."})
	})

	err = router.Run(":" + os.Getenv("PORT"))
	if err != nil {
		return
	}
}
