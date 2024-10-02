package middlewares

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
	s "github.com/okanay/digital-menu/configs/managers/statistics"
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
	"github.com/okanay/digital-menu/types"
)

func AuthMiddleware(sr *sr.Repository, ur *ur.Repository, statistics *s.Statistics) gin.HandlerFunc {
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

		statistics.RecordSession().Add(session.Token, s.LastSeenSessionRecord{
			SessionID: session.ID,
			LastSeen:  time.Now(),
		})

		c.Set("session", session)
		c.Set("user", user)
		c.Next()
	}
}

func handleUnauthorized(c *gin.Context, message string) {
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(configs.SESSION_COOKIE_NAME, "", -1, "/", "", false, false)
	c.JSON(http.StatusUnauthorized, gin.H{"error": message})
	c.Abort()
}

func VerifyAuthMiddleware() gin.HandlerFunc {
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
