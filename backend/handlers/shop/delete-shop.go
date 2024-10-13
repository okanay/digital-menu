package shopHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) DeleteShop(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	id := c.Param("uniqueId")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "shop id is required"})
		return
	}

	err := h.shopRepository.DeleteShop(id, userContext.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "shop deleted successfully"})
}
