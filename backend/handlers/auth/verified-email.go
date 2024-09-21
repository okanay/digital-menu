package userHandler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) VerifyEmail(c *gin.Context) {
	var req types.VerifyEmailReq
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

	token, err := h.userRepository.SelectVerifyToken(user.Email, req.Token)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token."})
		return
	}

	now := time.Now()
	if token.ExpiresAt.Before(now) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token is expired."})
		return
	}

	err = h.userRepository.UpdateVerify(user.Email, true)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while updating user."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email verified successfully", "email": user.Email})
}
