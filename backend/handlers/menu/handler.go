package menuHandler

import (
	s "github.com/okanay/digital-menu/configs/managers/statistics"
	m "github.com/okanay/digital-menu/repositories/mail"
	mr "github.com/okanay/digital-menu/repositories/menu"
	rr "github.com/okanay/digital-menu/repositories/restaurant"
)

type Handler struct {
	menuRepository       *mr.Repository
	restaurantRepository *rr.Repository
	mailRepository       *m.Repository
	statistics           *s.Statistics
}

func NewHandler(mr *mr.Repository, rr *rr.Repository, m *m.Repository, s *s.Statistics) *Handler {
	return &Handler{menuRepository: mr, restaurantRepository: rr, mailRepository: m, statistics: s}
}
