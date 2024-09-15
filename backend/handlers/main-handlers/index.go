package mainHandlers

import "github.com/gin-gonic/gin"

func Index(c *gin.Context) {
	c.JSON(200, gin.H{
		"Language":  "GO",
		"Framework": "Gin",
		"Database":  "PostgreSQL",
		"Status":    "Running..",
	})
}
