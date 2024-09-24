package dbCleanup

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/utils"
)

type Repository struct {
	db            *sql.DB
	IsActive      bool
	CleanDuration time.Duration
}

func Init(db *sql.DB) {
	r := &Repository{
		db:            db,
		IsActive:      configs.CLEANUP_ACTIVE,
		CleanDuration: configs.CLEANUP_TICKER_DURATION,
	}

	if r.IsActive {
		fmt.Println("[DB-CLEANUP] Database cleanup is active.")
		go r.StartCleanupRoutine()
	}
}

func (r *Repository) StartCleanupRoutine() {
	ticker := time.NewTicker(r.CleanDuration)
	defer ticker.Stop()

	for range ticker.C {
		go r.CleanupPasswordResetTokens()
		go r.CleanupVerificationTokens()
	}
}

func (r *Repository) CleanupPasswordResetTokens() {
	defer utils.TimeTrack(time.Now(), "[DB-CLEANUP] All unused password reset tokens are deleted")

	fmt.Println("[DB-CLEANUP] Cleaning password reset tokens")
	query := `DELETE FROM password_reset_tokens WHERE expires_at < NOW() OR is_used = true`
	_, err := r.db.Exec(query)

	if err != nil {
		fmt.Println("[DB-CLEANUP] Error while cleaning password reset tokens", err.Error())
	}
}

func (r *Repository) CleanupVerificationTokens() {
	defer utils.TimeTrack(time.Now(), "[DB-CLEANUP] All unused verification tokens are deleted")
	query := `DELETE FROM email_verification_tokens WHERE expires_at < NOW() OR is_used = true`
	_, err := r.db.Exec(query)

	if err != nil {
		fmt.Println("[DB-CLEANUP] Error while cleaning verification tokens", err.Error())
	}
}
