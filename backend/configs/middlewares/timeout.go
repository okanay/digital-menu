package middlewares

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
)

type Timeout struct {
	Timeout time.Duration `json:"timeout"`
}

func NewTimeout() *Timeout {
	return &Timeout{
		Timeout: configs.REQUEST_MAX_DURATION,
	}
}

func (t *Timeout) Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), t.Timeout)
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
