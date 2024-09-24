package cache

import (
	"time"

	"github.com/okanay/digital-menu/utils"
)

func (c *Cache) CleanupExpiredItems() {
	defer utils.TimeTrack(time.Now(), "[CACHE] All expired items are deleted")

	c.Cache.Range(func(key, value interface{}) bool {
		item, ok := value.(*cacheItem)
		if !ok {
			c.Cache.Delete(key)
			return true
		}

		if time.Now().After(item.Expiration) {
			c.Cache.Delete(key)
		}

		return true
	})
}

func (c *Cache) StartCleanupRoutine() {
	ticker := time.NewTicker(c.CacheCleanDuration)
	defer ticker.Stop()

	for range ticker.C {
		c.CleanupExpiredItems()
	}
}
