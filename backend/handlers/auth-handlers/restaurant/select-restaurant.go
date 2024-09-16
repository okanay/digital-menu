package authRestaurantHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectRestaurant(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required."})
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id must be a number."})
	}

	restaurant, err := h.restaurantRepository.SelectRestaurant(id)
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
