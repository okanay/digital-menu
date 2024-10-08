package types

import (
	"time"
)

type Image struct {
	ID           int       `db:"id" json:"id"`
	UserID       int       `db:"user_id" json:"userId"`
	Size         int       `db:"size" json:"size"`
	Type         string    `db:"type" json:"type"`
	Name         string    `db:"name" json:"name"`
	UniqueName   string    `db:"unique_name" json:"uniqueName"`
	URL          string    `db:"url" json:"url"`
	Description  string    `db:"description" json:"description"`
	PublicAccess bool      `db:"public_access" json:"publicAccess"`
	CreatedAt    time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt    time.Time `db:"updated_at" json:"updatedAt"`
}

type UploadReq struct {
	Description  string `json:"description" validate:"required"`  // JSON string
	PublicAccess bool   `json:"publicAccess" validate:"required"` // JSON boolean
}

type UploadImageReq struct {
	UserID       int    `json:"user_id" db:"user_id"`
	Size         int    `json:"size" db:"size"`
	Type         string `json:"type" db:"type"`
	Name         string `json:"name" db:"name"`
	UniqueName   string `json:"unique_name" db:"unique_name"`
	URL          string `json:"url" db:"url"`
	Description  string `json:"description" db:"description"`
	PublicAccess bool   `json:"public_access" db:"public_access"`
}
