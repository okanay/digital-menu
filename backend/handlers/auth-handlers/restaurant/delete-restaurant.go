package authRestaurantHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) DeleteRestaurant(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	id := c.Param("restaurantId")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restaurant id is required"})
		return
	}

	err := h.restaurantRepository.DeleteRestaurant(id, userContext.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Restaurant deleted successfully"})
}
