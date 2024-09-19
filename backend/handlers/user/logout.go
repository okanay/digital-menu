package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) Logout(c *gin.Context) {
	sessionContext := c.MustGet("session").(types.Session)

	var req types.LogoutSessionReq
	err := utils.ValidateRequest(c, &req)
	if err != nil {
		return
	}

	go func() {
		if req.LogoutAllDevices {
			_ = h.sessionRepository.DeleteSessionByUserID(sessionContext.UserID)
		} else {
			_ = h.sessionRepository.DeleteSessionByTokenID(sessionContext.ID)
		}
	}()

	c.SetCookie(configs.SESSION_NAME, "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful."})
}
