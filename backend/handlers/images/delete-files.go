package imagesHandler

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

type DeleteReq struct {
	UniqueName string `json:"uniqueName" validate:"required"`
}

func (h *Handler) DeleteFiles(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	var req DeleteReq
	err := utils.ValidateRequest(c, &req)

	if err != nil {
		fmt.Println("[ERROR] failed to validate request: ", err)
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.r2Repository.DeleteObject(c.Request.Context(), req.UniqueName)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}

	err = h.imageRepository.DeleteImages(req.UniqueName, user.ID)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Image deleted successfully"})
}
