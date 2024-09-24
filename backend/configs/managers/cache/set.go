package cache

import (
	"encoding/json"
	"time"
)

func (c *Cache) Set(key string, value interface{}, expiration time.Duration) {
	if c.IsActive {
		data, err := json.Marshal(value)
		if err != nil {
			return
		}

		item := &cacheItem{
			Data:       data,
			Expiration: time.Now().Add(expiration),
		}

		c.Cache.Store(key, item)
	}
}
