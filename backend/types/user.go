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
	ID                     string         `db:"id" json:"id"`
	Email                  string         `db:"email" json:"email"`
	HashedPassword         string         `db:"hashed_password" json:"hashedPassword"`
	Membership             MembershipType `db:"membership" json:"membership"`
	EmailVerified          bool           `db:"email_verified" json:"emailVerified"`
	EmailVerificationToken string         `db:"email_verification_token" json:"emailVerificationToken"`
	PasswordResetToken     string         `db:"password_reset_token" json:"passwordResetToken"`
	CreatedAt              time.Time      `db:"created_at" json:"createdAt"`
	LastLogin              time.Time      `db:"last_login" json:"lastLogin"`
	UpdatedAt              time.Time      `db:"updated_at" json:"updatedAt"`
}

type UserResponse struct {
	ID            string         `json:"id"`
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

type RequestForgotPasswordReq struct {
	Email string `db:"email" json:"email" validate:"required,email"`
}
