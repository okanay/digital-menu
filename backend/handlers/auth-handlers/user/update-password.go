package authUserHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) UpdatePassword(c *gin.Context) {
	var req types.UpdatePasswordReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := c.MustGet("user").(types.User)
	passwordMatch := utils.CheckPassword(req.CurrentPassword, user.HashedPassword)

	if !passwordMatch {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Current password does not match"})
		return
	}

	err := h.userRepository.UpdatePasswordByEmail(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.SetCookie("digital_menu_session", "", -1, "/", "", false, true)
	_ = h.sessionRepository.DeleteSessionByUserID(int(user.ID))

	c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully"})
}
