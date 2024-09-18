package authMenuHandler

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	co "github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) checkMenuLimit(c *gin.Context, restaurantId string, user types.User) error {
	menus, err := h.menuRepository.SelectMenus(restaurantId, user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong, while checking menu limit."})
		return err
	}

	limit := h.getMenuLimit(user.Membership)
	if len(menus) >= limit {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Only %d menu are allowed for your membership.", limit)})
		return errors.New("restaurant limit exceeded")
	}

	return nil
}

func (h *Handler) checkMenuTypeLimit(c *gin.Context, types int, user types.User) error {
	maxTypes := h.getMenuTypeLimit(user.Membership)
	if types > maxTypes {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Only %d menu types are allowed for your membership.", maxTypes)})
		return errors.New("menu type limit exceeded")
	}

	return nil
}

func (h *Handler) checkRestaurantOwner(c *gin.Context, restaurantId string, user types.User) error {
	restaurant, err := h.restaurantRepository.SelectRestaurantByID(restaurantId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong, while checking restaurant owner."})
		return err
	}

	if restaurant.UserID != user.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not the owner of this restaurant."})
		return errors.New("not restaurant owner")
	}

	return nil
}

func (h *Handler) getMenuLimit(membership types.MembershipType) int {
	switch membership {
	case types.Basic:
		return co.BASIC_MAX_MENU_COUNT
	case types.Pro:
		return co.PRO_MAX_MENU_COUNT
	case types.Premium:
		return co.PREMIUM_MAX_MENU_COUNT
	default:
		return 0
	}
}

func (h *Handler) getMenuTypeLimit(membership types.MembershipType) int {
	switch membership {
	case types.Basic:
		return co.BASIC_ALLOWED_MENU_TYPES
	case types.Pro:
		return co.PRO_ALLOWED_MENU_TYPES
	case types.Premium:
		return co.PREMIUM_ALLOWED_MENU_TYPES
	default:
		return 0
	}
}

func (h *Handler) getExpiryDuration(membership types.MembershipType) time.Duration {
	switch membership {
	case types.Basic:
		return co.BASIC_EXPIRATION_DURATION
	case types.Pro:
		return co.PRO_EXPIRATION_DURATION
	case types.Premium:
		return co.PREMIUM_EXPIRATION_DURATION
	default:
		return 0
	}
}
