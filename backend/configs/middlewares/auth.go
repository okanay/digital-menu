package middlewares

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
)

func AuthMiddleware(sr *sr.Repository, ur *ur.Repository) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie("digital_menu_session")
		if err != nil {
			handleUnauthorized(c, "Session not found.")
			return
		}

		session, user, err := sr.SelectSessionAndUser(token)
		if err != nil {
			handleUnauthorized(c, "Session not valid.")
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

func handleUnauthorized(c *gin.Context, message string) {
	c.SetCookie("digital_menu_session", "", -1, "/", "", false, true)
	c.JSON(http.StatusUnauthorized, gin.H{"error": message})
	c.Abort()
}
