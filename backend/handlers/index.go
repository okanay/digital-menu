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
	timeoutDuration := configs.TIMEOUT_DURATION.Seconds()

	c.JSON(200, gin.H{
		"Language":  "Golang",
		"Framework": "Gin",
		"Database":  "PostgreSQL",
		"Status":    "System is running successfully!",
		"Config": gin.H{
			"Cache":            cacheStatus,
			"Cache Duration":   fmt.Sprintf("%.0f minute", cacheDuration),
			"Rate Limit":       fmt.Sprintf("%d requests per %.0f second", rateLimit, rateLimitDuration),
			"Session Duration": fmt.Sprintf("%.0f day", sessionDuration),
			"Timeout Duration": fmt.Sprintf("%.0f second", timeoutDuration),
		},
	})

}
