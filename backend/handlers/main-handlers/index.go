package mainHandlers

import "github.com/gin-gonic/gin"

func Index(c *gin.Context) {
	c.JSON(200, gin.H{
		"Language":  "Golang",
		"Framework": "Gin",
		"Database":  "PostgreSQL",
		"Status":    "System is running successfully!",
	})
}
