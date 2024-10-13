package shopHandler

import (
	s "github.com/okanay/digital-menu/configs/managers/statistics"
	m "github.com/okanay/digital-menu/repositories/mail"
	mr "github.com/okanay/digital-menu/repositories/menu"
	sr "github.com/okanay/digital-menu/repositories/shop"
)

type Handler struct {
	menuRepository *mr.Repository
	shopRepository *sr.Repository
	mailRepository *m.Repository
	statistics     *s.Statistics
}

func NewHandler(mr *mr.Repository, rr *sr.Repository, m *m.Repository, s *s.Statistics) *Handler {
	return &Handler{menuRepository: mr, shopRepository: rr, mailRepository: m, statistics: s}
}
