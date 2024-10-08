package menuHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectMenu(c *gin.Context) {
	menuId := c.Param("menuId")

	if menuId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request."})
		return
	}

	menu, err := h.menuRepository.SelectMenu(menuId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Menu not found."})
		return
	}

	menuResponse := types.MenuResponse{
		Name:        menu.Name,
		Type:        menu.Type,
		Json:        menu.Json,
		Language:    menu.Language,
		Description: menu.Description,
		IsActive:    menu.IsActive,
		CreatedAt:   menu.CreatedAt,
		UpdatedAt:   menu.UpdatedAt,
		ExpiresAt:   menu.ExpiresAt,
	}

	c.JSON(http.StatusOK, gin.H{"menu": menuResponse})
}
