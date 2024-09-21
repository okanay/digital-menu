package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
)

func (h *Handler) UpdatePassword(c *gin.Context) {
	// user := c.MustGet("user").(types.User)

	c.SetCookie(configs.SESSION_COOKIE_NAME, "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully."})
}
