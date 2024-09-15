package authRestaurantHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) CreateRestaurant(c *gin.Context) {
	user := c.MustGet("user").(types.User)
	if err := h.checkRestaurantLimit(c, user); err != nil {
		return
	}

	req := types.CreateRestaurantReq{UserID: user.ID}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	restaurant, err := h.restaurantRepository.CreateRestaurant(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"restaurant": restaurant})
}
