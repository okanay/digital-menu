package utils

import (
	"log"
	"time"
)

func TimeTrack(start time.Time, name string) {
	elapsed := time.Since(start)

	if elapsed <= 5*time.Millisecond {
		return
	}

	log.Printf("%s ~TOOK~ %s", name, elapsed.Round(time.Millisecond))
}
