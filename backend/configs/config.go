package configs

import "time"

const (
	// Project Rules
	PROJECT_NAME = "Menu Arts"

	// Statistics Rules
	STATISTICS_ACTIVE              = true
	STATISTICS_MAX_GOROUTINE_COUNT = 20
	STATISTICS_LAST_SEEN_TICKER    = 5 * time.Minute
	STATISTICS_LAST_LOGIN_TICKER   = 30 * time.Minute
	STATISTICS_VISITOR_MENU_TICKER = 15 * time.Minute

	// Memory Cache Rules
	MEMORY_ACTIVE                  = true
	MEMORY_CLEANUP_TICKER_DURATION = 20 * time.Minute

	// Clean Up Rules
	CLEANUP_ACTIVE          = true
	CLEANUP_TICKER_DURATION = 2 * time.Hour

	// Rate Limit Rules
	RATE_LIMIT          = 50
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

	// Restaurant Max Count Rules
	BASIC_MAX_RESTAURANT_COUNT   = 2
	PRO_MAX_RESTAURANT_COUNT     = 5
	PREMIUM_MAX_RESTAURANT_COUNT = 10

	// Menu Max Count Rules
	BASIC_MAX_MENU_COUNT       = 2
	PRO_ALLOWED_MENU_TYPES     = 10
	PREMIUM_ALLOWED_MENU_TYPES = 20

	// Menu Type Rules
	BASIC_ALLOWED_MENU_TYPES = 1
	PRO_MAX_MENU_COUNT       = 10
	PREMIUM_MAX_MENU_COUNT   = 20

	// R2 Rules
	R2_BASE_URL = "https://image.menuarts.com/"

	// Image Max Count Rules
	BASIC_MAX_IMAGE_COUNT   = 10
	PRO_MAX_IMAGE_COUNT     = 40
	PREMIUM_MAX_IMAGE_COUNT = 80

	// Image Size Rules
	BASIC_MAX_IMAGE_SIZE   = 1024 * 1024 * 2  // 2 MB
	PRO_MAX_IMAGE_SIZE     = 1024 * 1024 * 5  // 8 MB
	PREMIUM_MAX_IMAGE_SIZE = 1024 * 1024 * 10 // 10 MB
)
