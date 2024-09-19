package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	ur "github.com/okanay/digital-menu/repositories/user"
	"github.com/okanay/digital-menu/utils"
)

type Request struct {
	Email string `db:"email" json:"email" validate:"required,email"`
}

func VerifiedMiddleware(ur *ur.Repository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req Request
		err := utils.ValidateRequest(c, &req)
		if err != nil {
			return
		}

		user, err := ur.SelectUser(req.Email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User not found."})
			c.Abort()
			return
		}

		if user.EmailVerified == false {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email not verified."})
			c.Abort()
			return
		}

		c.Set("user", user)
		c.Next()
	}
}
