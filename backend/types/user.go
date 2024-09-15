package types

import "time"

type MembershipType string

const (
	Regular MembershipType = "Regular"
	Premium MembershipType = "Premium"
)

type User struct {
	ID                     int64          `json:"id"`
	Email                  string         `json:"email"`
	HashedPassword         string         `json:"hashedPassword"`
	CreatedAt              time.Time      `json:"createdAt"`
	UpdatedAt              time.Time      `json:"updatedAt"`
	LastLogin              time.Time      `json:"lastLogin"`
	Membership             MembershipType `json:"membership"`
	EmailVerified          bool           `json:"emailVerified"`
	EmailVerificationToken string         `json:"emailVerificationToken"`
	PasswordResetToken     string         `json:"passwordResetToken"`
}

type UserResponse struct {
	ID            int64          `json:"id"`
	Email         string         `json:"email"`
	Membership    MembershipType `json:"membership"`
	EmailVerified bool           `json:"emailVerified"`
}

type CreateUserReq struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required" validate:"min=8,max=32"`
}

type LoginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UpdatePasswordReq struct {
	Email           string `json:"email"`
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
}

type PasswordResetWithTokenReq struct {
	Email              string `json:"email"`
	PasswordResetToken string `json:"passwordResetToken"`
	NewPassword        string `json:"newPassword"`
}
