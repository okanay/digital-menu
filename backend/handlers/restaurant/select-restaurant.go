package restaurantHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectRestaurant(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	id := c.Param("restaurantId")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restaurant id is required."})
		return
	}

	restaurant, err := h.restaurantRepository.SelectRestaurantByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if restaurant.UserID != userContext.ID {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized to see this restaurant."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"restaurant": restaurant})
}
