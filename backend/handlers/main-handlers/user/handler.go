package userHandler

import (
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
)

type Handler struct {
	userRepository    *ur.Repository
	sessionRepository *sr.Repository
}

func NewHandler(ur *ur.Repository, sr *sr.Repository) *Handler {
	return &Handler{userRepository: ur, sessionRepository: sr}
}
