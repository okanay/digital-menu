package menuHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectMenusByUserID(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	menus, err := h.menuRepository.SelectMenus(userContext.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Menu selection failed."})
		return
	}

	menuResponse := []types.MenuResponse{}
	for _, menu := range menus {
		menuResponse = append(menuResponse, types.MenuResponse{
			ShopUniqueID: menu.ShopUniqueID,
			UniqueID:     menu.UniqueID,
			Name:         menu.Name,
			Type:         menu.Type,
			Json:         menu.Json,
			IsActive:     menu.IsActive,
			CreatedAt:    menu.CreatedAt,
			UpdatedAt:    menu.UpdatedAt,
		})
	}

	if len(menuResponse) == 0 {
		c.JSON(http.StatusOK, gin.H{"menus": []types.MenuResponse{}})
		return
	}

	c.JSON(http.StatusOK, gin.H{"menus": menuResponse})
}
