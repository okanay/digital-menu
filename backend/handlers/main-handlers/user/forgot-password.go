package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) ForgotPassword(c *gin.Context) {
	var req types.PasswordResetWithTokenReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request."})
		return
	}

	user, err := h.userRepository.SelectUser(req.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email not found."})
		return
	}

	if !user.EmailVerified {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email not verified."})
		return
	}

	if user.PasswordResetToken != req.PasswordResetToken {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token."})
		return
	}

	err = h.userRepository.UpdatePassword(types.UpdatePasswordReq{
		Email:           req.Email,
		NewPassword:     req.NewPassword,
		CurrentPassword: "",
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Password reset failed."})
		return
	}

	go func() {
		_ = h.sessionRepository.DeleteSessionByUserID(int(user.ID))
		_ = h.userRepository.UpdatePasswordResetToken(req.Email)
	}()

	c.SetCookie("digital_menu_session", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Password reset successfully"})
}
