package menuHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) CreateMenu(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	req := types.CreateMenuReq{
		UserID:   userContext.ID,
		IsActive: true,
	}

	if err := utils.ValidateRequest(c, &req); err != nil {
		return
	}

	err := h.checkMenuLimit(c, userContext)
	if err != nil {
		return
	}

	err = h.checkMenuTypeLimit(c, req.Type, userContext)
	if err != nil {
		return
	}

	shop, err := h.checkShopOwner(c, req.ShopUniqueID, userContext)
	if err != nil {
		return
	}

	menu, err := h.menuRepository.CreateMenu(shop.ID, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	menuResponse := types.MenuResponse{
		ShopUniqueID: menu.ShopUniqueID,
		UniqueID:     menu.UniqueID,
		Name:         menu.Name,
		Type:         menu.Type,
		Json:         menu.Json,
		IsActive:     menu.IsActive,
		CreatedAt:    menu.CreatedAt,
		UpdatedAt:    menu.UpdatedAt,
	}

	c.JSON(http.StatusOK, gin.H{"menu": menuResponse})
}
