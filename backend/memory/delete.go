package memory

func (c *Cache) Delete(key string) {
	c.cache.Delete(key)
}
