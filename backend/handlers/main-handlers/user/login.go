package userHandler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) Login(c *gin.Context) {
	_, err := c.Cookie("digital_menu_session")
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot login while session is actively used, please logout first."})
		return
	}

	var req types.LoginReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body."})
		return
	}

	user, err := h.userRepository.SelectUser(req.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email not found."})
		return
	}

	passwordMatch := utils.CheckPassword(req.Password, user.HashedPassword)
	if !passwordMatch {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password does not match."})
		return
	}

	token := utils.GenerateRandomString(64)
	expireAt := time.Now().Add(configs.SESSION_DURATION)
	cookieDuration := int(configs.SESSION_DURATION.Seconds())

	var sessionReq = types.CreateSessionReq{
		UserID:    user.ID,
		Token:     token,
		ExpiresAt: expireAt,
		IPAddress: c.ClientIP(),
		UserAgent: c.Request.UserAgent(),
	}

	err = h.sessionRepository.CreateSession(sessionReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be created."})
		return
	}

	userRes := types.UserResponse{
		ID:            user.ID,
		Email:         user.Email,
		EmailVerified: user.EmailVerified,
		Membership:    user.Membership,
	}

	go func() {
		err := h.userRepository.UpdateLastLogin(user.Email)
		if err != nil {
			fmt.Println("[ERROR LOGIN] : User last login could not be updated.", err.Error())
		}
	}()

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("digital_menu_session", token, cookieDuration, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{"user": userRes})
}
