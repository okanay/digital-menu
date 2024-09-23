package statistics

import (
	"fmt"
	"sync"
	"time"

	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/utils"
)

const UserLastLoginCollection CollectionName = "UserLastLoginCollection"

type UserLastLoginRecord struct {
	UserID    int
	LastLogin time.Time
}

type UserLastLogin struct {
	Statistics *Statistics
	Collection CollectionName
}

func (s *Statistics) RecordUserLogin() *UserLastLogin {
	return &UserLastLogin{
		Statistics: s,
		Collection: UserLastLoginCollection,
	}
}

func (s *UserLastLogin) Add(key string, data interface{}) {
	s.Statistics.SafeExecute(func() {
		record := Record{
			Key:  key,
			Data: data,
		}

		if s.Statistics.KeyExists(s.Collection, key) {
			s.Statistics.UpdateRecordByKey(s.Collection, key, record.Data)
			return
		}

		s.Statistics.Collections[s.Collection].Records = append(s.Statistics.Collections[s.Collection].Records, record)
	})
}

func (s *UserLastLogin) Push() {
	s.Statistics.SafeExecute(func() {
		defer utils.TimeTrack(time.Now(), "[STATISTICS] All user last login records update")

		query := `UPDATE users SET last_login = $1 WHERE id = $2`
		users := s.Statistics.GetCollection(s.Collection)

		var wg sync.WaitGroup
		semaphore := make(chan struct{}, s.Statistics.MaxGoroutineCount)

		for _, record := range users.Records {
			wg.Add(1)
			user := record.Data.(UserLastLoginRecord)

			go func(user UserLastLoginRecord) {
				semaphore <- struct{}{}
				defer wg.Done()
				defer func() { <-semaphore }()

				fmt.Println("[STATISTICS] Updating user last login record:", user.UserID)
				_, err := s.Statistics.db.Exec(query, user.LastLogin, user.UserID)
				if err != nil {
					fmt.Println("[STATISTICS] Error while updating user last login record:", err.Error())
				}
			}(user)
		}

		wg.Wait()
		if collection, ok := s.Statistics.Collections[s.Collection]; ok {
			collection.Records = []Record{}
		}
	})
}

func (s *UserLastLogin) Start() {
	ticker := time.NewTicker(configs.STATISTICS_LAST_LOGIN_TICKER)
	defer ticker.Stop()

	for range ticker.C {
		s.Push()
	}
}
