package cache

import (
	"fmt"
	"sync"
	"time"

	"github.com/okanay/digital-menu/configs"
)

type cacheItem struct {
	Data       []byte    `json:"data"`
	Expiration time.Time `json:"expiration"`
}

type Cache struct {
	Cache              sync.Map
	IsActive           bool
	CacheCleanDuration time.Duration
}

func Init() *Cache {
	c := &Cache{
		Cache:              sync.Map{},
		IsActive:           configs.MEMORY_ACTIVE,
		CacheCleanDuration: configs.MEMORY_CLEANUP_TICKER_DURATION,
	}

	if c.IsActive {
		fmt.Println("[CACHE] Memory cache is active.")
		go c.StartCleanupRoutine()
	}

	return c
}
