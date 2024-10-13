package shopHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectShops(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	shops, err := h.shopRepository.SelectShops(userContext.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Shop selection failed."})
		return
	}

	response := []types.ShopResponse{}
	if len(shops) == 0 {
		c.JSON(http.StatusOK, gin.H{"shops": response})
		return
	}

	for _, shop := range shops {
		response = append(response, types.ShopResponse{
			UniqueID:  shop.UniqueID,
			Name:      shop.Name,
			Slug:      shop.Slug,
			IsActive:  shop.IsActive,
			MenuCount: shop.MenuCount,
			CreatedAt: shop.CreatedAt,
			UpdatedAt: shop.UpdatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{"shops": response})
}
