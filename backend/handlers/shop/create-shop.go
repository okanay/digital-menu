package shopHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) CreateShop(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	var req types.ShopRestaurantReq
	req.UserID = user.ID

	if err := utils.ValidateRequest(c, &req); err != nil {
		return
	}

	if err := h.checkShopLimit(c, user); err != nil {
		return
	}

	shop, err := h.shopRepository.CreateShop(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while creating the shop."})
		return
	}

	response := types.ShopResponse{
		UniqueID:  shop.UniqueID,
		Name:      shop.Name,
		Slug:      shop.Slug,
		IsActive:  shop.IsActive,
		MenuCount: shop.MenuCount,
		CreatedAt: shop.CreatedAt,
		UpdatedAt: shop.UpdatedAt,
	}

	c.JSON(http.StatusOK, gin.H{"shop": response})
}
