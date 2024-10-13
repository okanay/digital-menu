package shopHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectShop(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	id := c.Param("uniqueId")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "shop id is required."})
		return
	}

	shop, err := h.shopRepository.SelectShopByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if shop.UserID != userContext.ID {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized to see this shop."})
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
