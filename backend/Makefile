.PHONY: watch run db kill up down force air update clean build-up build-down build-force

# Binary paths
UP_BINARY = ./cmd/up
DOWN_BINARY = ./cmd/down
FORCE_BINARY = ./cmd/force

# Source paths
UP_SOURCE = ./cmd/functions/up/main.go
DOWN_SOURCE = ./cmd/functions/down/main.go
FORCE_SOURCE = ./cmd/functions/force/main.go

run:
	go run main.go

watch:
	reflex -r '\.go$$' -s -- sh -c 'go run main.go'

air:
	air

kill:
	npx kill-port 8080

up:
	./cmd/up

down:
	./cmd/down

force:
	./cmd/force

# Remove old binaries
clean:
	rm -f $(UP_BINARY) $(DOWN_BINARY) $(FORCE_BINARY)

# Build individual binaries
build-up:
	go build -o $(UP_BINARY) $(UP_SOURCE)

build-down:
	go build -o $(DOWN_BINARY) $(DOWN_SOURCE)

build-force:
	go build -o $(FORCE_BINARY) $(FORCE_SOURCE)

# Build all binaries
update: clean build-up build-down build-force

# Create a new migration file with up and down SQL scripts
db:
	@test -n "${n}" || (echo "Error: 'n' (name) is not set. Use 'make db n=yourfilename'"; exit 1)
	migrate create -ext sql -dir db/migrations -seq ${n}
