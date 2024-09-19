package menuHandler

import (
	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) Index(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)
	sessionContext := c.MustGet("session").(types.Session)

	c.JSON(200, gin.H{
		"path":    "auth-menu-handler",
		"user":    userContext,
		"session": sessionContext,
	})
}
