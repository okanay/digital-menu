package statistics

import (
	"database/sql"
	"fmt"
	"sync"

	"github.com/okanay/digital-menu/configs"
)

type RecordInterface interface {
	Add(key string, data interface{})
	Push()
	Start()
}

type Record struct {
	Key  string
	Data interface{}
}

type CollectionName string

type Collection struct {
	name    CollectionName
	Records []Record
}

type Statistics struct {
	db                *sql.DB
	Collections       map[CollectionName]*Collection
	mu                sync.Mutex
	IsActive          bool
	MaxGoroutineCount int
}

func Init(db *sql.DB) *Statistics {
	s := &Statistics{
		db:                db,
		Collections:       make(map[CollectionName]*Collection),
		IsActive:          configs.STATISTICS_ACTIVE,
		MaxGoroutineCount: configs.STATISTICS_MAX_GOROUTINE_COUNT,
	}

	collectionNames := []CollectionName{LastSeenSessionCollection, MenuVisitorCollection, UserLastLoginCollection}
	for _, collectionName := range collectionNames {
		s.Collections[collectionName] = &Collection{name: collectionName}
	}

	if s.IsActive {
		fmt.Println("[STATISTICS] Statistics is active.")
		go s.RecordSession().Start()
		go s.RecordUserLogin().Start()
	}

	return s
}
