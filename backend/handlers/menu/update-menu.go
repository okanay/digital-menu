package menuHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) UpdateMenu(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	uniqueId := c.Param("uniqueId")
	if uniqueId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "uniqueId is required"})
		return
	}

	req := types.UpdateMenuReq{
		UserID:   user.ID,
		UniqueID: uniqueId,
	}

	if err := utils.ValidateRequest(c, &req); err != nil {
		return
	}

	updatedMenu, err := h.menuRepository.UpdateMenu(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	menuResponse := types.MenuResponse{
		ShopUniqueID: updatedMenu.ShopUniqueID,
		UniqueID:     updatedMenu.UniqueID,
		Name:         updatedMenu.Name,
		Type:         updatedMenu.Type,
		Json:         updatedMenu.Json,
		IsActive:     updatedMenu.IsActive,
		CreatedAt:    updatedMenu.CreatedAt,
		UpdatedAt:    updatedMenu.UpdatedAt,
	}

	c.JSON(http.StatusOK, gin.H{"menu": menuResponse})
}
