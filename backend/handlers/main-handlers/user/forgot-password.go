package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) ForgotPassword(c *gin.Context) {
	user := c.MustGet("user").(types.User)
	var req types.PasswordResetWithTokenReq

	err := utils.ValidateRequest(c, &req)
	if err != nil {
		return
	}

	if user.PasswordResetToken != req.PasswordResetToken {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token."})
		return
	}

	err = h.userRepository.UpdatePassword(req.Email, req.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Password reset failed."})
		return
	}

	go func() {
		_ = h.sessionRepository.DeleteSessionByUserID(user.ID)
		_, _ = h.userRepository.GenerateRandomPasswordResetToken(req.Email)
	}()

	c.SetCookie("digital_menu_session", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Password reset successfully"})
}
