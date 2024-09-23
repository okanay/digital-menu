package cleanup

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/utils"
)

type Repository struct {
	db            *sql.DB
	isActive      bool
	cleanInterval time.Duration
}

func Init(db *sql.DB) {
	r := &Repository{
		db:            db,
		isActive:      configs.CLEANUP_ACTIVE,
		cleanInterval: configs.CLEANUP_TICKER_DURATION,
	}

	if r.isActive {
		fmt.Println("[CLEANUP] Cleanup routine started")
		go r.StartCleanupRoutine()
	}
}

func (r *Repository) StartCleanupRoutine() {
	ticker := time.NewTicker(r.cleanInterval)
	defer ticker.Stop()

	for range ticker.C {
		r.CleanupExpiredItems()
	}
}

func (r *Repository) CleanupExpiredItems() {
	go r.CleanupPasswordResetTokens()
	go r.CleanupVerificationTokens()
}

func (r *Repository) CleanupPasswordResetTokens() {
	defer utils.TimeTrack(time.Now(), "[CLEANUP] All unused password reset tokens are deleted")

	fmt.Println("[CLEANUP] Cleaning password reset tokens")
	query := `DELETE FROM password_reset_tokens WHERE expires_at < NOW() OR is_used = true`
	_, err := r.db.Exec(query)

	if err != nil {
		fmt.Println("[CLEANUP] Error while cleaning password reset tokens", err.Error())
	}
}

func (r *Repository) CleanupVerificationTokens() {
	defer utils.TimeTrack(time.Now(), "[CLEANUP] All unused verification tokens are deleted")
	query := `DELETE FROM email_verification_tokens WHERE expires_at < NOW() OR is_used = true`
	_, err := r.db.Exec(query)

	if err != nil {
		fmt.Println("[CLEANUP] Error while cleaning verification tokens", err.Error())
	}
}
