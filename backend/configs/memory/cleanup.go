package memory

import (
	"fmt"
	"time"

	"github.com/okanay/digital-menu/configs"
)

func (c *Cache) CleanupExpiredItems() {
	c.cache.Range(func(key, value interface{}) bool {
		item, ok := value.(*cacheItem)
		if !ok {
			c.cache.Delete(key)
			return true
		}

		if time.Now().After(item.expiration) {
			c.cache.Delete(key)
		}

		return true
	})
}

func (c *Cache) StartCleanupRoutine() {
	fmt.Println("[Memory-Cache] Cache cleanup routine started")

	ticker := time.NewTicker(configs.MEMORY_CLEANUP_TICKER_DURATION)
	defer ticker.Stop()

	for range ticker.C {
		fmt.Println("[Memory-Cache] Cache cleanup executed")
		c.CleanupExpiredItems()
	}
}
