package types

import "time"

type MembershipType string

const (
	Basic   MembershipType = "Basic"
	Pro     MembershipType = "Pro"
	Premium MembershipType = "Premium"
	Admin   MembershipType = "Admin"
)

type User struct {
	ID                     int64          `json:"id"`
	Email                  string         `json:"email"`
	HashedPassword         string         `json:"hashedPassword"`
	Membership             MembershipType `json:"membership"`
	EmailVerified          bool           `json:"emailVerified"`
	EmailVerificationToken string         `json:"emailVerificationToken"`
	PasswordResetToken     string         `json:"passwordResetToken"`
	CreatedAt              time.Time      `json:"createdAt"`
	UpdatedAt              time.Time      `json:"updatedAt"`
	LastLogin              time.Time      `json:"lastLogin"`
}

type UserResponse struct {
	ID            int64          `json:"id"`
	Email         string         `json:"email"`
	Membership    MembershipType `json:"membership"`
	EmailVerified bool           `json:"emailVerified"`
}

type CreateUserReq struct {
	Email    string `json:"email" validate:"required,email" binding:"required"`
	Password string `json:"password" validate:"required,min=8,max=32" binding:"required"`
}

type LoginReq struct {
	Email    string `json:"email" validate:"required,email" binding:"required"`
	Password string `json:"password" validate:"required,min=8,max=32" binding:"required"`
}

type UpdatePasswordReq struct {
	Email           string `json:"email" validate:"required,email" binding:"required"`
	CurrentPassword string `json:"currentPassword" validate:"required,min=8,max=32" binding:"required"`
	NewPassword     string `json:"newPassword" validate:"required,min=8,max=32" binding:"required"`
}

type PasswordResetWithTokenReq struct {
	Email              string `json:"email" validate:"required,email" binding:"required"`
	PasswordResetToken string `json:"passwordResetToken" validate:"required" binding:"required"`
	NewPassword        string `json:"newPassword" validate:"required,min=8,max=32" binding:"required"`
}
