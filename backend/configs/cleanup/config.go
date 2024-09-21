package cleanup

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/okanay/digital-menu/configs"
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
		fmt.Println("[Cleanup] Cleanup routine started")
		go r.StartCleanupRoutine()
	}
}

func (r *Repository) StartCleanupRoutine() {
	ticker := time.NewTicker(r.cleanInterval)
	defer ticker.Stop()

	for range ticker.C {
		fmt.Println("[Cleanup] Cleanup executed started...")
		r.CleanupExpiredItems()
	}
}

func (r *Repository) CleanupExpiredItems() {
	go r.CleanupPasswordResetTokens()
	go r.CleanupVerificationTokens()
}

func (r *Repository) CleanupPasswordResetTokens() {
	fmt.Println("[Cleanup] Cleaning password reset tokens")
	query := `DELETE FROM password_reset_tokens WHERE expires_at < NOW() OR is_used = true`
	_, err := r.db.Exec(query)

	if err != nil {
		fmt.Println("[Cleanup] Error while cleaning password reset tokens")
	}
}

func (r *Repository) CleanupVerificationTokens() {
	fmt.Println("[Cleanup] Cleaning verification tokens")
	query := `DELETE FROM email_verification_tokens WHERE expires_at < NOW() OR is_used = true`
	_, err := r.db.Exec(query)

	if err != nil {
		fmt.Println("[Cleanup] Error while cleaning verification tokens")
	}
}
