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
	ID             int            `db:"id" json:"id"`
	UniqueID       string         `db:"unique_id" json:"uniqueId"`
	Email          string         `db:"email" json:"email"`
	HashedPassword string         `db:"hashed_password" json:"hashedPassword"`
	Membership     MembershipType `db:"membership" json:"membership"`
	EmailVerified  bool           `db:"email_verified" json:"emailVerified"`
	CreatedAt      time.Time      `db:"created_at" json:"createdAt"`
	LastLogin      time.Time      `db:"last_login" json:"lastLogin"`
	UpdatedAt      time.Time      `db:"updated_at" json:"updatedAt"`
}

type UserResponse struct {
	ID            int            `json:"id"`
	Email         string         `json:"email"`
	Membership    MembershipType `json:"membership"`
	EmailVerified bool           `json:"emailVerified"`
}

type CreateUserReq struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}

type LoginReq struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}

type RequestForgotPasswordReq struct {
	Email string `db:"email" json:"email" validate:"required,email"`
}

type ResetPassword struct {
	ID        int       `db:"id" json:"id"`
	Email     string    `db:"email" json:"email"`
	Token     string    `db:"token" json:"token"`
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
	ExpiresAt time.Time `db:"expires_at" json:"expiresAt"`
	IsUsed    bool      `db:"is_used" json:"isUsed"`
}

type ResetPasswordMail struct {
	Email string `json:"email" validate:"required,email"`
}

type ResetPasswordReq struct {
	Email    string `json:"email" validate:"required,email"`
	Token    string `json:"token" validate:"required"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}

type EmailVerification struct {
	ID        int       `db:"id" json:"id"`
	Email     string    `db:"email" json:"email"`
	Token     string    `db:"token" json:"token"`
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
	ExpiresAt time.Time `db:"expires_at" json:"expiresAt"`
	IsUsed    bool      `db:"is_used" json:"isUsed"`
}

type EmailVerificationMail struct {
	Email string `json:"email" validate:"required,email"`
}

type VerifyEmailReq struct {
	Email string `json:"email" validate:"required,email"`
	Token string `json:"token" validate:"required"`
}
