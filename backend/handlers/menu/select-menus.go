package menuHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) SelectMenus(c *gin.Context) {
	userContext := c.MustGet("user").(types.User)

	idStr := c.Param("restaurantId")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restaurant id is required."})
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restaurant id must be a number."})
		return
	}

	menus, err := h.menuRepository.SelectMenus(id, userContext.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Menu selection failed."})
		return
	}

	if len(menus) == 0 {
		empty := []types.Menu{}
		c.JSON(http.StatusOK, gin.H{"menu": empty})
		return
	}

	c.JSON(http.StatusOK, gin.H{"menus": menus})
}
