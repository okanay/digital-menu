package authRestaurantHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectRestaurants(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)
	restaurants, err := h.restaurantRepository.SelectAllRestaurantsByUserID(int(userContext.ID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(restaurants) == 0 {
		emptyRestaurant := types.Restaurant{}
		c.JSON(http.StatusOK, gin.H{"restaurant": emptyRestaurant})
		return
	}

	c.JSON(http.StatusOK, gin.H{"restaurants": restaurants})
}
