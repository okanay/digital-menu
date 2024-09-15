package authMenuHandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) UpdateMenu(c *gin.Context) {
	// user := c.MustGet("user").(types.User)
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO :: Burada önce id ile menüyü çekip user'ın restaurant'ına ait olup olmadığını kontrol et.

	var req types.UpdateMenuReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	req.ID = id
	req.RestaurantID = 1 // TODO: restaurant id'yi user'dan al

	updatedMenu, err := h.menuRepository.UpdateMenu(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"menu": updatedMenu})
}
