package menuHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) UpdateMenu(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	idStr := c.Param("menuId")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuId is required"})
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restaurant id must be a number."})
		return
	}

	req := types.UpdateMenuReq{
		UserID: user.ID,
		ID:     id,
	}

	if err := utils.ValidateRequest(c, &req); err != nil {
		return
	}

	updatedMenu, err := h.menuRepository.UpdateMenu(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"menu": updatedMenu})
}
