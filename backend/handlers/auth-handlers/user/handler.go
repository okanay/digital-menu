package authUserHandler

import (
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
)

type Handler struct {
	userRepository    *ur.UserRepository
	sessionRepository *sr.SessionRepository
}

func NewAuthUserHandler(ur *ur.UserRepository, sr *sr.SessionRepository) *Handler {
	return &Handler{userRepository: ur, sessionRepository: sr}
}
