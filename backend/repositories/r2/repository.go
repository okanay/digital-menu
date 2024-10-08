package r2Repository

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type Repository struct {
	client            *s3.Client
	r2BucketName      string
	r2AccountId       string
	r2AccessKeyId     string
	r2SecretAccessKey string
}

func NewRepository(r2BucketName, r2AccountId, r2AccessKeyId, r2SecretAccessKey string) (*Repository, error) {
	// Load the default AWS configuration
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("auto"),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(
			r2AccessKeyId,
			r2SecretAccessKey,
			"",
		)),
	)
	if err != nil {
		return nil, fmt.Errorf("unable to load SDK config: %v", err)
	}

	// Create S3 client with custom endpoint
	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(fmt.Sprintf("https://%s.r2.cloudflarestorage.com", r2AccountId))
		// R2 requires PathStyle
		o.UsePathStyle = true
	})

	return &Repository{
		client:            client,
		r2BucketName:      r2BucketName,
		r2AccountId:       r2AccountId,
		r2AccessKeyId:     r2AccessKeyId,
		r2SecretAccessKey: r2SecretAccessKey,
	}, nil
}
