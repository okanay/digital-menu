package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/repositories/mail"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) ResetPasswordRequest(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	token, err := h.userRepository.CreateResetToken(user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while creating reset token."})
		return
	}

	go func() {
		mail := mail.ResetMailRequest{
			To:       user.Email,
			Title:    "Reset Password : " + token.Token,
			Token:    token.Token,
			ExpireAt: token.ExpiresAt,
		}

		_ = h.mailRepository.SendResetPasswordMail(mail)
	}()

	c.JSON(http.StatusOK, gin.H{"message": "Password reset token generated successfully.", "email": user.Email})
}
