package authRestaurantHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) UpdateRestaurant(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	idStr := c.Param("restaurantId")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restaurant id is required."})
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restaurant id must be a number"})
		return
	}

	req := types.UpdateRestaurantReq{UserID: user.ID, ID: id}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body."})
		return
	}

	updatedRestaurant, err := h.restaurantRepository.UpdateRestaurant(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update restaurant."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"restaurant": updatedRestaurant})
}
