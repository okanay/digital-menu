package middlewares

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
	"github.com/okanay/digital-menu/types"
)

func AuthMiddleware(sr *sr.Repository, ur *ur.Repository) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie(configs.SESSION_COOKIE_NAME)
		if err != nil {
			handleUnauthorized(c, "Session not found.")
			return
		}

		session, user, err := sr.SelectSessionAndUser(token)
		if err != nil {
			handleUnauthorized(c, err.Error())
			return
		}

		if time.Now().After(session.ExpiresAt) {
			_ = sr.DeleteSessionByTokenID(session.ID)
			handleUnauthorized(c, "Session expired")
			return
		}

		go func() {
			err = sr.UpdateLastAccessed(session.ID)
			if err != nil {
				fmt.Println("[ERROR SESSION] Session last accessed update failed.")
			}
		}()

		c.Set("session", session)
		c.Set("user", user)
		c.Next()
	}
}

func VerifiedAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userContext := c.MustGet("user").(types.User)

		if userContext.EmailVerified == false {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email not verified."})
			c.Abort()
			return
		}

		c.Next()
	}
}

func handleUnauthorized(c *gin.Context, message string) {
	c.SetCookie(configs.SESSION_COOKIE_NAME, "", -1, "/", "", false, true)
	c.JSON(http.StatusUnauthorized, gin.H{"error": message})
	c.Abort()
}
