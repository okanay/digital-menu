package imagesHandler

import (
	s "github.com/okanay/digital-menu/configs/managers/statistics"
	i "github.com/okanay/digital-menu/repositories/images"
	r2 "github.com/okanay/digital-menu/repositories/r2"
	user "github.com/okanay/digital-menu/repositories/user"
)

type Handler struct {
	r2Repository    *r2.Repository
	imageRepository *i.Repository
	userRepository  *user.Repository
	statistics      *s.Statistics
}

func NewHandler(r2 *r2.Repository, i *i.Repository, u *user.Repository, s *s.Statistics) *Handler {
	return &Handler{r2Repository: r2, imageRepository: i, userRepository: u, statistics: s}
}
