package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) ForgotPasswordRequest(c *gin.Context) {
	var req types.RequestForgotPasswordReq

	err := utils.ValidateRequest(c, &req)
	if err != nil {
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

	token, err := h.userRepository.GenerateRandomPasswordResetToken(req.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error while generating password reset token."})
		return
	}

	// TODO:: Send email with token here
	c.JSON(http.StatusOK, gin.H{"message": "Password reset token generated successfully.", "token": token})
}
