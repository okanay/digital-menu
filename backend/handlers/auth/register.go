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

func (h *Handler) Register(c *gin.Context) {
	var req types.CreateUserReq

	err := utils.ValidateRequest(c, &req)
	if err != nil {
		return
	}

	_, err = h.userRepository.SelectUser(req.Email)
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists."})
		return
	}

	user, err := h.userRepository.CreateUser(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user.", "message": err.Error()})
		return
	}

	userRes := types.UserResponse{
		ID:            user.ID,
		Email:         user.Email,
		EmailVerified: user.EmailVerified,
		Membership:    user.Membership,
	}

	go func() {
		token, err := h.userRepository.CreateVerifyToken(user.Email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while creating email verification token."})
			return
		}

		mail := mail.VerificationMailRequest{
			To:       user.Email,
			Title:    fmt.Sprintf("%s - Email Verification", os.Getenv("PROJECT_NAME")),
			Token:    token.Token,
			ExpireAt: token.ExpiresAt,
		}

		err = h.mailRepository.SendVerificationMail(mail)
		if err != nil {
			fmt.Println("[ERROR] An error occurred while sending verification email." + err.Error())
		}
	}()

	c.JSON(http.StatusOK, gin.H{"user": userRes})
}
