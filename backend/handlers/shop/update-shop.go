package shopHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) UpdateShop(c *gin.Context) {
	user := c.MustGet("user").(types.User)
	var req types.UpdateShopReq

	idStr := c.Param("uniqueId")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "shop id is required."})
		return
	}

	req.UserID = user.ID
	req.UniqueID = idStr

	if err := utils.ValidateRequest(c, &req); err != nil {
		return
	}

	updatedShop, err := h.shopRepository.UpdateShop(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update shop."})
		return
	}

	response := types.ShopResponse{
		UniqueID:  updatedShop.UniqueID,
		Name:      updatedShop.Name,
		Slug:      updatedShop.Slug,
		IsActive:  updatedShop.IsActive,
		MenuCount: updatedShop.MenuCount,
		CreatedAt: updatedShop.CreatedAt,
		UpdatedAt: updatedShop.UpdatedAt,
	}

	c.JSON(http.StatusOK, gin.H{"shop": response})
}
