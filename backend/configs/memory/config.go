package memory

import (
	"fmt"
	"sync"
	"time"

	"github.com/okanay/digital-menu/configs"
)

type cacheItem struct {
	data       []byte
	expiration time.Time
}

type Cache struct {
	cache         sync.Map
	cacheIsActive bool
}

func Init() *Cache {
	fmt.Println("[Memory Cache] Initializing the memory cache")

	c := &Cache{
		cache:         sync.Map{},
		cacheIsActive: configs.MEMORY_CACHE_ACTIVE,
	}

	if c.cacheIsActive {
		go c.StartCleanupRoutine()
	}

	return c
}
