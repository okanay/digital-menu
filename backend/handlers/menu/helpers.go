package menuHandler

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	co "github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) checkMenuLimit(c *gin.Context, user types.User) error {
	menus, err := h.menuRepository.SelectMenus(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong, while checking menu limit."})
		return err
	}

	limit := h.getMenuLimit(user.Membership)
	if len(menus) >= limit {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Only %d menu are allowed for your membership.", limit)})
		return errors.New("shop limit exceeded")
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

func (h *Handler) checkShopOwner(c *gin.Context, shopUniqueId string, user types.User) (types.Shop, error) {
	shop, err := h.shopRepository.SelectShopByUniqueID(shopUniqueId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong, while checking shop owner."})
		return types.Shop{}, err
	}

	if shop.UserID != user.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not the owner of this shop."})
		return types.Shop{}, errors.New("not shop owner")
	}

	return shop, nil
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
