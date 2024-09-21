package middlewares

import (
	"bytes"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	ur "github.com/okanay/digital-menu/repositories/user"
	"github.com/okanay/digital-menu/utils"
)

type VerifiedReq struct {
	Email string `json:"email" validate:"required,email"`
}

func VerifyMiddleware(ur *ur.Repository) gin.HandlerFunc {
	return func(c *gin.Context) {
		var bodyBytes []byte
		if c.Request.Body != nil {
			bodyBytes, _ = io.ReadAll(c.Request.Body)
		}

		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

		var req VerifiedReq
		err := utils.ValidateRequest(c, &req)
		if err != nil {
			c.Abort()
			return
		}

		user, err := ur.SelectUser(req.Email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User not found."})
			c.Abort()
			return
		}

		if !user.EmailVerified {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email not verified."})
			c.Abort()
			return
		}

		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
		c.Set("user", user)
		c.Next()
	}
}
