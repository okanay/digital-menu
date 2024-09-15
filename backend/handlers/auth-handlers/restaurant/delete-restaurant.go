package authRestaurantHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) DeleteRestaurant(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id must be a number"})
		return
	}

	restaurant, err := h.restaurantRepository.SelectRestaurantByID(id)
	if err != nil || restaurant.UserID != userContext.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to delete this restaurant"})
		return
	}

	err = h.restaurantRepository.DeleteRestaurant(id, int(userContext.ID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Restaurant deleted successfully"})
}
