package userHandler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) Check(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	var response = types.UserResponse{
		ID:            userContext.ID,
		Email:         userContext.Email,
		EmailVerified: userContext.EmailVerified,
		Membership:    userContext.Membership,
	}

	// TODO :: Session Token kullanarak JWT ile sign edilecek.
	token := utils.GenerateRandomString(32)
	cookieDuration := int(time.Second * 60 * 15)

	c.SetCookie("token", token, cookieDuration, "/", "", false, false)
	c.JSON(http.StatusOK, gin.H{"user": response})
}
