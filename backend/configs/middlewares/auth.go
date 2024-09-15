package configs

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	sr "github.com/okanay/digital-menu/repositories/session"
)

func AuthMiddleware(sr *sr.SessionRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Check if session cookie exists
		token, err := c.Cookie("digital_menu_session")
		if err != nil {
			handleUnauthorized(c, "Session not found.")
			return
		}

		session, user, err := sr.SelectSessionAndUserByToken(token)
		if err != nil {
			handleUnauthorized(c, "Session not valid.")
			return
		}

		if time.Now().After(session.ExpiresAt) {
			_ = sr.DeleteSessionByTokenID(int(session.ID))
			handleUnauthorized(c, "Session expired")
			return
		}

		c.Set("session", session)
		c.Set("user", user)
		c.Next()
	}
}

func handleUnauthorized(c *gin.Context, message string) {
	c.SetCookie("digital_menu_session", "", -1, "/", "", false, true)
	c.JSON(http.StatusUnauthorized, gin.H{"error": message})
	c.Abort()
}
