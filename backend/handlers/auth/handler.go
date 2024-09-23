package userHandler

import (
	s "github.com/okanay/digital-menu/configs/managers/statistics"
	m "github.com/okanay/digital-menu/repositories/mail"
	sr "github.com/okanay/digital-menu/repositories/session"
	ur "github.com/okanay/digital-menu/repositories/user"
)

type Handler struct {
	userRepository    *ur.Repository
	sessionRepository *sr.Repository
	mailRepository    *m.Repository
	statistics        *s.Statistics
}

func NewHandler(ur *ur.Repository, sr *sr.Repository, m *m.Repository, s *s.Statistics) *Handler {
	return &Handler{userRepository: ur, sessionRepository: sr, mailRepository: m, statistics: s}
}
