package authMenuHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) DeleteMenu(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	idStr := c.Param("menuId")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu id is required"})
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu id must be a number"})
		return
	}

	err = h.menuRepository.DeleteMenu(id, userContext.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Menu deleted successfully"})
}
