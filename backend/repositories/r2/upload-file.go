package r2Repository

import (
	"context"
	"fmt"
	"mime/multipart"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func (r *Repository) UploadFile(ctx context.Context, file *multipart.FileHeader, contentType, fileName string) (string, error) {
	// Multipart dosyayı aç
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("dosya açılırken hata: %v", err)
	}
	defer src.Close()

	// Dosyayı R2'ya yükle
	input := &s3.PutObjectInput{
		Bucket:      aws.String(r.r2BucketName),
		Key:         aws.String(fileName),
		Body:        src,
		ContentType: aws.String(contentType),
	}

	_, err = r.client.PutObject(ctx, input)
	if err != nil {
		return "", fmt.Errorf("dosya yüklenirken hata: %v", err)
	}

	// Public URL'i oluştur
	fileURL := fmt.Sprintf("https://%s.r2.cloudflarestorage.com/%s/%s",
		r.r2AccountId,
		r.r2BucketName,
		fileName,
	)
	return fileURL, nil
}
