package memory

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
	cache         sync.Map
	isActive      bool
	cleanInterval time.Duration
}

func Init() *Cache {
	fmt.Println("[Memory Cache] Initializing the memory cache")

	c := &Cache{
		cache:         sync.Map{},
		isActive:      configs.MEMORY_ACTIVE,
		cleanInterval: configs.MEMORY_CLEANUP_TICKER_DURATION,
	}

	if c.isActive {
		go c.StartCleanupRoutine()
	}

	return c
}
