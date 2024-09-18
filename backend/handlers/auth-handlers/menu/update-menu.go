package authMenuHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) UpdateMenu(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	req := types.UpdateMenuReq{
		UserID: user.ID,
		ID:     c.Param("menuId"),
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
