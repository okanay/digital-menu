package r2Repository

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func (r *Repository) ListObjects(ctx context.Context) ([]string, error) {
	result, err := r.client.ListObjectsV2(ctx, &s3.ListObjectsV2Input{
		Bucket: aws.String(r.r2BucketName),
	})
	if err != nil {
		return nil, fmt.Errorf("dosyalar listelenirken hata: %v", err)
	}

	var files []string
	for _, object := range result.Contents {
		files = append(files, *object.Key)
	}
	return files, nil
}
