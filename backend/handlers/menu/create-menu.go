package menuHandler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) CreateMenu(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	req := types.CreateMenuReq{
		UserID:    userContext.ID,
		IsActive:  true,
		ExpiresAt: time.Now().Add(h.getExpiryDuration(userContext.Membership)),
	}

	if err := utils.ValidateRequest(c, &req); err != nil {
		return
	}

	err := h.checkMenuLimit(c, req.RestaurantID, userContext)
	if err != nil {
		return
	}

	err = h.checkMenuTypeLimit(c, req.Type, userContext)
	if err != nil {
		return
	}

	err = h.checkRestaurantOwner(c, req.RestaurantID, userContext)
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
