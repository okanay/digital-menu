package authUserHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) Check(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	var response = types.UserResponse{
		ID:            userContext.ID,
		Email:         userContext.Email,
		EmailVerified: userContext.EmailVerified,
		Membership:    userContext.Membership,
	}

	c.JSON(http.StatusOK, gin.H{"user": response})
}
