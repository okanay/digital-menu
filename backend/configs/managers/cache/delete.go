package cache

func (c *Cache) Delete(key string) {
	c.Cache.Delete(key)
}
