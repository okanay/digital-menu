package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) ForgotPasswordRequest(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	token, err := h.userRepository.GenerateRandomPasswordResetToken(user.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error while generating password reset token."})
		return
	}

	// TODO:: Send email with token here
	c.JSON(http.StatusOK, gin.H{"message": "Password reset token generated successfully.", "token": token, "email": user.Email})
}
