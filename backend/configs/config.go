package configs

import "time"

const (
	// Rate Limit Rules
	RATE_LIMIT          = 100              // 100 requests per duration
	RATE_LIMIT_DURATION = 10 * time.Minute // 10 minute duration
	RATE_LIMIT_CLEANUP  = 5 * time.Minute  // 5 minutes cleanup

	// Session Rules
	SESSION_DURATION = 30 * 24 * time.Hour

	// Expertaion Rules
	BASIC_EXPIRATION_DURATION   = 7 * 24 * time.Hour       // 1 week
	PRO_EXPIRATION_DURATION     = 12 * 30 * 24 * time.Hour // 1 year
	PREMIUM_EXPIRATION_DURATION = 12 * 30 * 24 * time.Hour // 1 year

	// Restaurant Rules
	BASIC_MAX_RESTAURANT_COUNT   = 1
	PRO_MAX_RESTAURANT_COUNT     = 10
	PREMIUM_MAX_RESTAURANT_COUNT = 20

	// Restaurant Name Rules
	MAX_RESTAURANT_SLUG_LENGTH = 64

	// Menu Rules
	BASIC_ALLOWED_MENU_TYPES = 1
	PRO_MAX_MENU_COUNT       = 10
	PREMIUM_MAX_MENU_COUNT   = 20

	// Menu Type Rules
	BASIC_MAX_MENU_COUNT       = 1
	PRO_ALLOWED_MENU_TYPES     = 10
	PREMIUM_ALLOWED_MENU_TYPES = 20

	// Image Rules
	BASIC_ALLOWED_IMAGE    = 10
	BASIC_MAX_IMAGE_SIZE   = 5 * 1024 * 1024
	PRO_ALLOWED_IMAGE      = 100
	PRO_MAX_IMAGE_SIZE     = 10 * 1024 * 1024
	PREMIUM_ALLOWED_IMAGE  = 250
	PREMIUM_MAX_IMAGE_SIZE = 20 * 1024 * 1024
)
