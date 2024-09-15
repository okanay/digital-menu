package authRestaurantHandler

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	co "github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) checkRestaurantLimit(c *gin.Context, user types.User) error {
	restaurants, err := h.restaurantRepository.SelectAllRestaurantsByUserID(int(user.ID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong, while checking restaurant limit."})
		return err
	}

	limit := h.getRestaurantLimit(user.Membership)
	if len(restaurants) >= limit {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Only %d restaurants are allowed for your membership.", limit)})
		return errors.New("restaurant limit exceeded")
	}

	return nil
}

func (h *Handler) getRestaurantLimit(membership types.MembershipType) int {
	switch membership {
	case types.Basic:
		return co.BASIC_MAX_RESTAURANT_COUNT
	case types.Pro:
		return co.PRO_MAX_RESTAURANT_COUNT
	case types.Premium:
		return co.PREMIUM_MAX_RESTAURANT_COUNT
	default:
		return 0
	}
}
