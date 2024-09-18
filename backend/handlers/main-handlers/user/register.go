package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) Register(c *gin.Context) {
	var req types.CreateUserReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body."})
		return
	}

	_, err := h.userRepository.SelectUser(req.Email)
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists."})
		return
	}

	user, err := h.userRepository.CreateUser(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user."})
		return
	}

	userRes := types.UserResponse{
		ID:            user.ID,
		Email:         user.Email,
		EmailVerified: user.EmailVerified,
		Membership:    user.Membership,
	}

	c.JSON(http.StatusOK, gin.H{"user": userRes})
}
