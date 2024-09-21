package menuHandler

import (
	m "github.com/okanay/digital-menu/repositories/mail"
	mr "github.com/okanay/digital-menu/repositories/menu"
	rr "github.com/okanay/digital-menu/repositories/restaurant"
)

type Handler struct {
	menuRepository       *mr.Repository
	restaurantRepository *rr.Repository
	mailRepository       *m.Repository
}

func NewHandler(mr *mr.Repository, rr *rr.Repository, m *m.Repository) *Handler {
	return &Handler{menuRepository: mr, restaurantRepository: rr, mailRepository: m}
}
