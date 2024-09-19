package memory

import (
	"encoding/json"
	"time"

	"github.com/okanay/digital-menu/configs"
)

func (c *Cache) Set(key string, value interface{}) {
	if !c.cacheIsActive {
		return
	}

	data, err := json.Marshal(value)
	if err != nil {
		return
	}

	item := &cacheItem{
		data:       data,
		expiration: time.Now().Add(configs.RATE_LIMIT_DURATION),
	}
	c.cache.Store(key, item)
}
