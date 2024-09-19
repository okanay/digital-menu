package handlers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
)

func Index(c *gin.Context) {
	cacheStatus := configs.MEMORY_CACHE_ACTIVE
	cacheDuration := configs.MEMORY_CLEANUP_TICKER_DURATION.Minutes()
	rateLimit := configs.RATE_LIMIT
	rateLimitDuration := configs.RATE_LIMIT_DURATION.Seconds()
	sessionDuration := configs.SESSION_DURATION.Hours() / 24

	c.JSON(200, gin.H{
		"Language":                "Golang",
		"Framework":               "Gin",
		"Database":                "PostgreSQL",
		"Status":                  "System is running successfully!",
		"Config Cache":            cacheStatus,
		"Config Cache Duration":   fmt.Sprintf("%.0f minute", cacheDuration),
		"Config Rate Limit":       fmt.Sprintf("%d requests per %.0f second", rateLimit, rateLimitDuration),
		"Config Session Duration": fmt.Sprintf("%.0f day", sessionDuration),
	})

}
