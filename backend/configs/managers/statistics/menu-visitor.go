package statistics

import "time"

const MenuVisitorCollection CollectionName = "MenuVisitorCollection"

type MenuVisitorRecord struct {
	MenuID    string
	IpAddress string
	UserAgent string
	VisitTime time.Time
}
