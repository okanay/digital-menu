package cache

import (
	"encoding/json"
	"fmt"
	"time"
)

func (c *Cache) Get(key string, result interface{}) error {
	value, ok := c.Cache.Load(key)
	if !ok {
		return fmt.Errorf("key %s not found", key)
	}

	item, ok := value.(*cacheItem)
	if !ok || time.Now().After(item.Expiration) {
		c.Cache.Delete(key)
		return fmt.Errorf("key %s expired or invalid type", key)
	}

	return json.Unmarshal(item.Data, result)

}
