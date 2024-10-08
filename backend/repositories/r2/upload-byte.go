package r2Repository

import (
	"bytes"
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func (r *Repository) UploadBytes(ctx context.Context, fileName, contentType string, data []byte) (string, error) {
	input := &s3.PutObjectInput{
		Bucket:      aws.String(r.r2BucketName),
		Key:         aws.String(fileName),
		Body:        bytes.NewReader(data),
		ContentType: aws.String(contentType),
	}

	_, err := r.client.PutObject(ctx, input)
	if err != nil {
		return "", fmt.Errorf("dosya yüklenirken hata: %v", err)
	}

	fileURL := fmt.Sprintf("https://%s.r2.cloudflarestorage.com/%s/%s",
		r.r2AccountId,
		r.r2BucketName,
		fileName,
	)
	return fileURL, nil
}
