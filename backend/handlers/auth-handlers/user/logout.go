package authUserHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) Logout(c *gin.Context) {
	sessionContext := c.MustGet("session").(types.Session)
	if sessionContext.Token == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session not found"})
		return
	}

	var req struct {
		LogoutAllDevices bool `json:"logoutAllDevices"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Logout request failed"})
		return
	}

	c.SetCookie("digital_menu_session", "", -1, "/", "", false, true)

	if req.LogoutAllDevices {
		_ = h.sessionRepository.DeleteSessionByUserID(int(sessionContext.UserID))
	} else {
		_ = h.sessionRepository.DeleteSessionByTokenID(int(sessionContext.ID))
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}
