package authRestaurantHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) CreateRestaurant(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	var req types.CreateRestaurantReq
	req.UserID = user.ID

	if err := utils.ValidateRequest(c, &req); err != nil {
		return
	}

	if err := h.checkRestaurantLimit(c, user); err != nil {
		return
	}

	restaurant, err := h.restaurantRepository.CreateRestaurant(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while creating the restaurant."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"restaurant": restaurant})
}
