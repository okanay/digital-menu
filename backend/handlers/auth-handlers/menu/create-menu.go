package authMenuHandler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) CreateMenu(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	req := types.CreateMenuReq{UserID: user.ID, ExpiresAt: time.Now().AddDate(0, 1, 0)}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body.", "message": err.Error()})
		return
	}

	err := h.checkMenuLimit(c, req.RestaurantID, user)
	if err != nil {
		return
	}

	err = h.checkMenuTypeLimit(c, req.Type, user)
	if err != nil {
		return
	}

	err = h.checkRestaurantOwner(c, int(req.RestaurantID), user)
	if err != nil {
		return
	}

	menu, err := h.menuRepository.CreateMenu(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"menu": menu})
}
