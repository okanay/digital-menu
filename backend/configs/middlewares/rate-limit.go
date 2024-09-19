package middlewares

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
	mr "github.com/okanay/digital-menu/memory"
)

type RateLimit struct {
	memory         *mr.Cache
	maxRequests    int
	windowDuration time.Duration
}

type RequestLimit struct {
	ClientIP   string    `json:"clientIP"`
	Count      int       `json:"count"`
	ExpiryTime time.Time `json:"expiryTime"`
}

func NewRateLimit(mr *mr.Cache) *RateLimit {
	return &RateLimit{
		memory:         mr,
		maxRequests:    configs.RATE_LIMIT,
		windowDuration: configs.RATE_LIMIT_DURATION,
	}
}

func (m *RateLimit) Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientIP := c.ClientIP()
		now := time.Now()

		var req RequestLimit
		err := m.memory.Get(clientIP, &req)

		if err != nil || now.After(req.ExpiryTime) {
			req = RequestLimit{
				ClientIP:   clientIP,
				Count:      1,
				ExpiryTime: now.Add(m.windowDuration),
			}
		}

		if req.Count > 0 {
			req.Count++
			if req.Count > m.maxRequests {
				retryAfter := req.ExpiryTime.Sub(now)

				c.Header("Retry-After", fmt.Sprintf("%.0f", retryAfter.Seconds()))
				c.JSON(429, gin.H{
					"error":       "Too many requests",
					"retry_after": retryAfter.Seconds(),
				})
				c.Abort()

				return
			}
		}

		m.memory.Set(clientIP, req)
		c.Next()
	}
}
