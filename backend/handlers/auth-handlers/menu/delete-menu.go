package authMenuHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) DeleteMenu(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	id := c.Param("menuId")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu id is required"})
		return
	}

	err := h.menuRepository.DeleteMenu(id, userContext.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Menu deleted successfully"})
}
