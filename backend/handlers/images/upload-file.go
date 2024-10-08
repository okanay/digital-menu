package imagesHandler

import (
	"context"
	"fmt"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/types"
	"github.com/okanay/digital-menu/utils"
)

func (h *Handler) UploadHandler(c *gin.Context) {
	user := c.MustGet("user").(types.User)

	var req types.UploadReq
	err := utils.ValidateRequestData(c, &req, c.PostForm("data"))

	if err != nil {
		fmt.Println("[ERROR] failed to validate request: ", err)
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Dosya kontrolü
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File is required"})
		return
	}

	// Dosya boyutu kontrolü
	if err := h.validateFileSize(file, user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Kullanıcının yükleyebileceği maksimum resim sayısını kontrol et
	if err := h.imageRepository.CheckUserImagesCount(user.ID, user.Membership); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Dosya formatı kontrolü
	fileFormat := file.Header.Get("Content-Type")
	if err := h.validateFileFormat(fileFormat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Image oluşturma ve yükleme
	uniquePath := utils.GenerateRandomString(12)

	uploadImageReq := types.UploadImageReq{
		UserID:       user.ID,
		Size:         int(file.Size / 1024),
		Type:         fileFormat,
		Name:         file.Filename,
		UniqueName:   uniquePath,
		URL:          configs.R2_BASE_URL + uniquePath,
		Description:  req.Description,
		PublicAccess: req.PublicAccess,
	}

	// Veritabanına kaydet
	if err := h.imageRepository.UploadImage(uploadImageReq); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload image : " + err.Error()})
		return
	}

	// R2'ye yükle
	if _, err := h.r2Repository.UploadFile(context.Background(), file, fileFormat, uniquePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload image"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Image uploaded successfully", "data": uploadImageReq})
}

// validateFileSize dosya boyutunu kontrol eder
func (h *Handler) validateFileSize(file *multipart.FileHeader, user types.User) error {
	var maxSize int64

	switch user.Membership {
	case types.Basic:
		maxSize = configs.BASIC_MAX_IMAGE_SIZE
	case types.Pro:
		maxSize = configs.PRO_MAX_IMAGE_SIZE
	case types.Premium:
		maxSize = configs.PREMIUM_MAX_IMAGE_SIZE
	}

	if file.Size > maxSize {
		return fmt.Errorf("file size is too large")
	}

	return nil
}

// validateFileFormat dosya formatını kontrol eder
func (h *Handler) validateFileFormat(fileFormat string) error {
	allowedFormats := []string{"image/webp", "image/png", "image/jpeg", "image/svg+xml"}

	for _, format := range allowedFormats {
		if format == fileFormat {
			return nil
		}
	}
	return fmt.Errorf("file format is not allowed")
}
