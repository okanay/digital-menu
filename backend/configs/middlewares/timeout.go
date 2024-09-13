package configs

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func TimeoutMiddleware(timeout time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), timeout)
		defer cancel()

		done := make(chan bool, 1)
		go func() {
			c.Next()
			done <- true
		}()

		select {
		case <-done:
			return
		case <-ctx.Done():
			if !c.IsAborted() {
				fmt.Println("Timeout occurred")
				c.AbortWithStatusJSON(http.StatusRequestTimeout, gin.H{"error": "Request Timeout"})
			}
		}
	}
}
