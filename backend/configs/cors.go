package configs

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CorsConfig() gin.HandlerFunc {
	var origins = []string{
		"http://localhost:3000",
	}

	return cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowOrigins:     origins,
		AllowWildcard:    true,
		AllowCredentials: true,
		MaxAge:           60 * 24 * 30,
	})
}
