package middlewares

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
	c "github.com/okanay/digital-menu/configs/managers/cache"
)

// Bu struct yapisinin amaci cache'de tutulacak olan verinin yapisi ve cache'de tutulacak olan verinin hangi bilgileri icerdigini belirtmektir.
type RequestLimit struct {
	ClientIP   string    `json:"clientIP"`
	Count      int       `json:"count"`
	Expiration time.Time `json:"expiration"`
	IsLocked   bool      `json:"isLocked"`
}

// Bu struct yapisinin amaci rate limit middleware'i icin gerekli olan bilgileri tutmaktir.
type RateLimit struct {
	memory   *c.Cache
	limit    int
	duration time.Duration
}

// NewRateLimit fonksiyonu rate limit middleware'i icin gerekli olan bilgileri olusturur ve geriye RateLimit struct yapisini dondurur.
func NewRateLimit(c *c.Cache) *RateLimit {
	return &RateLimit{
		memory:   c,
		limit:    configs.RATE_LIMIT,
		duration: configs.RATE_LIMIT_DURATION,
	}
}

// Middleware fonksiyonu rate limit middleware'i olusturur ve ip adresine gore request sayisini kontrol eder.
func (m *RateLimit) Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientIP := c.ClientIP()
		now := time.Now()

		var req RequestLimit
		err := m.memory.Get(clientIP, &req)

		if err != nil || now.After(req.Expiration) {
			req = RequestLimit{
				ClientIP:   clientIP,
				Count:      0,
				Expiration: now.Add(m.duration),
				IsLocked:   false,
			}
		}

		if req.Count >= 0 {
			req.Count++
			if req.Count > m.limit {
				req.IsLocked = true
				retryAfter := req.Expiration.Sub(now)

				c.Header("Retry-After", fmt.Sprintf("%.0f", retryAfter.Seconds()))
				c.JSON(429, gin.H{
					"error":       "Too many requests",
					"retry_after": retryAfter.Seconds(),
				})
				c.Abort()

				return
			}
		}

		m.memory.Set(clientIP, req, m.duration)
		c.Next()
	}
}
