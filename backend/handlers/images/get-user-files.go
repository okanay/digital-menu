package imagesHandler

import (
	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/types"
)

func (h *Handler) GetUserFiles(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	images, err := h.imageRepository.GetUserImages(user.ID)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	emptyImages := []types.Image{}
	if len(images) == 0 {
		c.JSON(200, gin.H{"images": emptyImages})
		return
	}

	c.JSON(200, images)
}
