package middlewares

import (
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

type RequestLimit struct {
	Count      int
	ExpiryTime time.Time
}

type RateLimiter struct {
	ipLimitCache   *sync.Map
	maxRequests    int
	windowDuration time.Duration
	clearInterval  time.Duration
}

func NewRateLimiter(maxRequests int, windowDuration time.Duration, clearInterval time.Duration) *RateLimiter {
	// RateLimiter struct'ı oluşturulur ve gerekli alanlar doldurulur
	rl := &RateLimiter{
		ipLimitCache:   &sync.Map{},
		maxRequests:    maxRequests,
		windowDuration: windowDuration,
		clearInterval:  clearInterval,
	}

	// Temizleme işlemi için goroutine başlatılır. Bu sayede bloklanma olmadan temizleme işlemi yapılır.
	go rl.startCleanupRoutine()
	return rl
}

func (rl *RateLimiter) startCleanupRoutine() {
	// Ticker oluşturulur ve belirli aralıklarla temizleme işlemi için belirlenen süre kadar bekletilir
	ticker := time.NewTicker(rl.clearInterval)
	// Ticker durdurulana kadar döngü oluşturulur aslında bu döngü sürekli olarak temizleme işlemi yapar.
	for range ticker.C {
		rl.cleanupExpiredEntries()
	}
}

func (rl *RateLimiter) cleanupExpiredEntries() {
	// Rate limit süresi dolan IP adreslerinin temizlenmesi tetiklendiği için LOG mesajı yazılır
	fmt.Println("[RATE LIMIT] Cleaning up expired rate limit entries")
	// Şu anki zaman alınır
	now := time.Now()

	// Sync.Map üzerinde döngü ile IP adreslerine ait limit bilgileri kontrol edilir
	rl.ipLimitCache.Range(func(key, value interface{}) bool {
		// IP adresine ait limit IP adresi ile birlikte alınır
		limit := value.(RequestLimit)
		// Süresi dolmuş limit bilgisi kontrol edilir
		if now.After(limit.ExpiryTime) {
			// Süresi dolmuş limit bilgisi temizlenir
			rl.ipLimitCache.Delete(key)
		}
		// Bir sonraki IP adresine ait limit bilgisine geçilir
		return true
	})
}

func (rl *RateLimiter) Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// IP adresi alınır
		clientIP := c.ClientIP()
		// Şu anki zaman alınır
		now := time.Now()
		// IP adresine ait limit bilgisi ve varlığı kontrol edilir
		limit, _ := rl.getLimitInfo(clientIP, now)
		// Eğer limit aşıldıysa, işlem yapılır
		if rl.isLimitExceeded(limit) {
			// Rate limit aşıldığı için StatusTooManyRequests (429) durum kodu ile hata döndürülür
			rl.handleExceededLimit(c, clientIP, limit.ExpiryTime)
			return
		}

		// Eğer limit aşılmadıysa, IP adresine ait limit bilgisi güncellenir
		rl.updateLimitInfo(clientIP, limit)
		// Bir sonraki middleware veya işlem çalıştırılır
		c.Next()
	}
}

func (rl *RateLimiter) getLimitInfo(ip string, now time.Time) (RequestLimit, bool) {
	// IP adresine ait limit bilgisi sync.Map'ten IP adresi ile alınır
	value, exists := rl.ipLimitCache.Load(ip)
	// Eğer limit bilgisi varsa, kontrol edilir
	if exists {
		// Limit bilgisi alınır
		limit := value.(RequestLimit)
		// Eğer süre dolduysa, limit sıfırlanır
		if now.After(limit.ExpiryTime) {
			return RequestLimit{Count: 0, ExpiryTime: now.Add(rl.windowDuration)}, false
		}
		// Limit bilgisi döndürülür
		return limit, true
	}
	// Eğer limit bilgisi yoksa, yeni bir limit bilgisi oluşturulur
	return RequestLimit{Count: 0, ExpiryTime: now.Add(rl.windowDuration)}, false
}

func (rl *RateLimiter) isLimitExceeded(limit RequestLimit) bool {
	// Eğer limit bilgisi içerisindeki istek sayısı, maksimum istek sayısına eşit veya büyükse true döndürülür
	return limit.Count >= rl.maxRequests
}

func (rl *RateLimiter) handleExceededLimit(c *gin.Context, ip string, resetTime time.Time) {
	// Log mesajı yazdırılır
	fmt.Printf("[RATE LIMIT] Rate limit exceeded for IP: %s\n", ip)
	// Rate limit aşıldığı için StatusTooManyRequests (429) durum kodu ile hata döndürülür
	c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
		"error": "Rate limit exceeded. Please try again later.",
		"reset": resetTime,
	})
}

func (rl *RateLimiter) updateLimitInfo(ip string, limit RequestLimit) {
	// IP adresine ait istek sayısı arttırılır
	limit.Count++
	// IP adresine ait limit bilgisi güncellenir
	rl.ipLimitCache.Store(ip, limit)
}
