package authRestaurantHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) UpdateRestaurant(c *gin.Context) {
	user := c.MustGet("user").(types.User)
	var req types.UpdateRestaurantReq

	req.UserID = user.ID
	req.ID = c.Param("restaurantId")

	if err := utils.ValidateRequest(c, &req); err != nil {
		return
	}

	updatedRestaurant, err := h.restaurantRepository.UpdateRestaurant(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update restaurant."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"restaurant": updatedRestaurant})
}
