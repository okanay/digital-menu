package menuHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectMenu(c *gin.Context) {
	idStr := c.Param("menuId")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu id is required."})
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu id must be a number."})
	}

	menu, err := h.menuRepository.SelectMenu(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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
