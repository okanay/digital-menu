package configs

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		token, err := c.Cookie("session_token")
		if err != nil {
			fmt.Println("[ERROR]", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		fmt.Println("[TOKEN]", token)

		c.Next()
	}
}
