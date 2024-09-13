package types

import "time"

type MembershipType string

const (
	Regular MembershipType = "Regular"
	Premium MembershipType = "Premium"
)

type User struct {
	ID             int64          `json:"id"`
	Email          string         `json:"email"`
	HashedPassword string         `json:"hashed_password"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	LastLogin      time.Time      `json:"last_login"`
	Membership     MembershipType `json:"membership"`
}
