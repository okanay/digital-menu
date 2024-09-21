package restaurantHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) UpdateRestaurant(c *gin.Context) {
	user := c.MustGet("user").(types.User)
	var req types.UpdateRestaurantReq

	if c.Param("restaurantId") == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restaurant id is required."})
		return
	}

	idStr := c.Param("restaurantId")
	id, err := strconv.Atoi(idStr)

	req.UserID = user.ID
	req.ID = id

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
