package utils

import (
	"time"
)

const SessionDuration = 30 * 24 * time.Hour

func GenerateSessionExpiry() time.Time {
	return time.Now().Add(30 * 24 * time.Hour) // 30 gün
}
