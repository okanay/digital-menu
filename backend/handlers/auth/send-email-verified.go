package userHandler

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/repositories/mail"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) SendEmailVerify(c *gin.Context) {
	var req types.EmailVerificationMail
	err := utils.ValidateRequest(c, &req)
	if err != nil {
		return
	}

	user, err := h.userRepository.SelectUser(req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while getting user by email."})
		return
	}

	if user.EmailVerified {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is already verified."})
		return
	}

	token, err := h.userRepository.CreateVerifyToken(user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while creating email verification token."})
		return
	}

	go func() {
		mail := mail.VerificationMailRequest{
			To:       user.Email,
			Title:    fmt.Sprintf("%s - Email Verification", os.Getenv("PROJECT_NAME")),
			Token:    token.Token,
			ExpireAt: token.ExpiresAt,
		}

		_ = h.mailRepository.SendVerificationMail(mail)
	}()

	c.JSON(http.StatusOK, gin.H{"message": "Verification email sent successfully", "email": user.Email})
}
