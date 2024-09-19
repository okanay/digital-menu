package restaurantHandler

import (
	mr "github.com/okanay/digital-menu/repositories/menu"
	rr "github.com/okanay/digital-menu/repositories/restaurant"
)

type Handler struct {
	menuRepository       *mr.Repository
	restaurantRepository *rr.Repository
}

func NewHandler(mr *mr.Repository, rr *rr.Repository) *Handler {
	return &Handler{menuRepository: mr, restaurantRepository: rr}
}
