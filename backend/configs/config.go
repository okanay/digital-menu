package configs

import "time"

const (
	// Project Rules
	PROJECT_NAME = "Menu Arts"

	// Memory Cache Rules
	MEMORY_ACTIVE                  = true
	MEMORY_CLEANUP_TICKER_DURATION = 20 * time.Minute

	// Clean Up Rules
	CLEANUP_ACTIVE          = true
	CLEANUP_TICKER_DURATION = 2 * time.Hour

	// Rate Limit Rules
	RATE_LIMIT          = 10
	RATE_LIMIT_DURATION = 45 * time.Second

	// Timeout Rules
	REQUEST_MAX_DURATION = 10 * time.Second

	// Session Rules
	SESSION_DURATION    = 30 * 24 * time.Hour
	SESSION_COOKIE_NAME = "menu-arts-session"

	// Expertaion Rules
	BASIC_EXPIRATION_DURATION   = 7 * 24 * time.Hour       // 1 week
	PRO_EXPIRATION_DURATION     = 12 * 30 * 24 * time.Hour // 1 year
	PREMIUM_EXPIRATION_DURATION = 12 * 30 * 24 * time.Hour // 1 year

	// Restaurant Rules
	BASIC_MAX_RESTAURANT_COUNT   = 1
	PRO_MAX_RESTAURANT_COUNT     = 10
	PREMIUM_MAX_RESTAURANT_COUNT = 20

	// Menu Rules
	BASIC_ALLOWED_MENU_TYPES = 1
	PRO_MAX_MENU_COUNT       = 10
	PREMIUM_MAX_MENU_COUNT   = 20

	// Menu Type Rules
	BASIC_MAX_MENU_COUNT       = 1
	PRO_ALLOWED_MENU_TYPES     = 10
	PREMIUM_ALLOWED_MENU_TYPES = 20

	// Image Allowed Rules
	BASIC_ALLOWED_IMAGE   = 10
	PRO_ALLOWED_IMAGE     = 100
	PREMIUM_ALLOWED_IMAGE = 250

	// Image Size Rules
	BASIC_MAX_IMAGE_SIZE   = 1024 * 1024 * 5  // 5 MB
	PRO_MAX_IMAGE_SIZE     = 1024 * 1024 * 8  // 8 MB
	PREMIUM_MAX_IMAGE_SIZE = 1024 * 1024 * 10 // 10 MB
)
