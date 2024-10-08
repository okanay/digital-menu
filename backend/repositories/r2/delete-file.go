package r2Repository

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func (r *Repository) DeleteObject(ctx context.Context, fileName string) error {
	_, err := r.client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(r.r2BucketName),
		Key:    aws.String(fileName),
	})
	if err != nil {
		return fmt.Errorf("dosya silinirken hata: %v", err)
	}
	return nil
}
