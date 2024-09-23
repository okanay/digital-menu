package statistics

import (
	"fmt"
	"sync"
	"time"

	"github.com/okanay/digital-menu/configs"
	"github.com/okanay/digital-menu/utils"
)

const LastSeenSessionCollection CollectionName = "LastSeenSessionCollection"

type LastSeenSessionRecord struct {
	SessionID int
	LastSeen  time.Time
}

type LastSeenSession struct {
	Statistics *Statistics
	Collection CollectionName
}

func (s *Statistics) RecordSession() *LastSeenSession {
	return &LastSeenSession{
		Statistics: s,
		Collection: LastSeenSessionCollection,
	}
}

func (s *LastSeenSession) Add(key string, data interface{}) {
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

func (s *LastSeenSession) Push() {
	s.Statistics.SafeExecute(func() {
		defer utils.TimeTrack(time.Now(), "[STATISTICS] All last seen session records update")

		query := `UPDATE sessions SET last_seen = $1 WHERE id = $2`
		sessions := s.Statistics.GetCollection(s.Collection)

		var wg sync.WaitGroup
		semaphore := make(chan struct{}, s.Statistics.MaxGoroutineCount)

		for _, record := range sessions.Records {
			wg.Add(1)
			session := record.Data.(LastSeenSessionRecord)

			go func(session LastSeenSessionRecord) {
				semaphore <- struct{}{}
				defer wg.Done()
				defer func() { <-semaphore }()

				fmt.Println("[STATISTICS] Updating last seen session record:", session.SessionID)
				_, err := s.Statistics.db.Exec(query, session.LastSeen, session.SessionID)
				if err != nil {
					fmt.Println("[STATISTICS] Error while updating last seen session record:", err.Error())
				}
			}(session)
		}

		wg.Wait()
		if collection, ok := s.Statistics.Collections[s.Collection]; ok {
			collection.Records = []Record{}
		}
	})
}

func (s *LastSeenSession) Start() {
	ticker := time.NewTicker(configs.STATISTICS_LAST_SEEN_TICKER)
	defer ticker.Stop()

	for range ticker.C {
		s.Push()
	}
}
