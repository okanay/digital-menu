package authMenuHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) UpdateMenu(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	idStr := c.Param("menuId")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu id is required"})
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req := types.UpdateMenuReq{UserID: user.ID, ID: id}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	updatedMenu, err := h.menuRepository.UpdateMenu(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"menu": updatedMenu})
}
