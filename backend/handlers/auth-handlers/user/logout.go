package authUserHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) Logout(c *gin.Context) {
	sessionContext := c.MustGet("session").(types.Session)

	var req types.LogoutSessionReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body."})
		return
	}

	go func() {
		if req.LogoutAllDevices {
			_ = h.sessionRepository.DeleteSessionByUserID(sessionContext.UserID)
		} else {
			_ = h.sessionRepository.DeleteSessionByTokenID(sessionContext.ID)
		}
	}()

	c.SetCookie("digital_menu_session", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful."})
}
