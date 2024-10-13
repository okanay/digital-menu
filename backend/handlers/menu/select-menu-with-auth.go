package menuHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectMenu(c *gin.Context) {
	uniqueId := c.Param("uniqueId")

	if uniqueId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request."})
		return
	}

	menu, err := h.menuRepository.SelectMenu(uniqueId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Menu not found."})
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
