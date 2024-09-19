package memory

import (
	"encoding/json"
	"fmt"
	"time"
)

func (c *Cache) Get(key string, result interface{}) error {
	if !c.cacheIsActive {
		return fmt.Errorf("cache not active")
	}

	value, ok := c.cache.Load(key)
	if !ok {
		return fmt.Errorf("key %s not found", key)
	}

	item, ok := value.(*cacheItem)
	if !ok || time.Now().After(item.Expiration) {
		c.cache.Delete(key)
		return fmt.Errorf("key %s expired or invalid type", key)
	}

	return json.Unmarshal(item.Data, result)
}
