package configs

import "time"

const (
	SESSION_DURATION = 30 * 24 * time.Hour

	BASIC_MAX_RESTAURANT_COUNT   = 1
	PRO_MAX_RESTAURANT_COUNT     = 5
	PREMIUM_MAX_RESTAURANT_COUNT = 10

	BASIC_ALLOWED_MENU_TYPES   = 5
	PRO_ALLOWED_MENU_TYPES     = 10
	PREMIUM_ALLOWED_MENU_TYPES = 20
)
