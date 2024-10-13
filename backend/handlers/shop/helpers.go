package shopHandler

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	co "github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) checkShopLimit(c *gin.Context, user types.User) error {
	shop, err := h.shopRepository.SelectShops(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong, while checking shop limit."})
		return err
	}

	limit := h.getShopLimit(user.Membership)
	if len(shop) >= limit {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Only %d shops are allowed for your membership.", limit)})
		return errors.New("shop limit exceeded")
	}

	return nil
}

func (h *Handler) getShopLimit(membership types.MembershipType) int {
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
