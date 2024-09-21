package userHandler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) ResetPassword(c *gin.Context) {
	user := c.MustGet("user").(types.User)
	var req types.ResetPasswordReq

	err := utils.ValidateRequest(c, &req)
	if err != nil {
		return
	}

	token, err := h.userRepository.SelectResetToken(user.Email, req.Token)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token", "message": err.Error()})
		return
	}

	if token.Token != req.Token {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token", "token": req.Token, "token2": token.Token})
		return
	}

	now := time.Now()
	if token.ExpiresAt.Before(now) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token expired"})
		return
	}

	err = h.userRepository.UpdatePassword(user.Email, req.Password)

	go func() {
		_ = h.sessionRepository.DeleteSessionByUserID(user.ID)
		_ = h.userRepository.ExpireResetToken(user.Email, req.Token)
	}()

	c.SetCookie(configs.SESSION_COOKIE_NAME, "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Password reset successfully"})
}
