#!/bin/bash
set -euo pipefail

ENV_FILE=".env"
BACKEND_LOG="backend.log"
FRONTEND_LOG="frontend.log"
MAIN_LOG="main.log"
BACKEND_PID_FILE="backend.pid"
FRONTEND_PID_FILE="frontend.pid"
PROJECT_ROOT=$(pwd)
BACKEND_PORT=8080
FRONTEND_PORT=3000

if [ ! -f "$ENV_FILE" ]; then
  echo "$(date) Error: .env file not found" >&2
  exit 1
fi

source "$ENV_FILE"

if [ -z "$REACT_APP_API_BASE_URL" ]; then
  echo "$(date) Error: REACT_APP_API_BASE_URL is not set in .env" >&2
  exit 1
fi
if [ -z "$JWT_SECRET" ]; then
  echo "$(date) Error: JWT_SECRET is not set in .env" >&2
  exit 1
fi
if [ -z "$DB_HOST" ]; then
  echo "$(date) Error: DB_HOST is not set in .env" >&2
  exit 1
fi
if [ -z "$DB_USER" ]; then
  echo "$(date) Error: DB_USER is not set in .env" >&2
  exit 1
fi
if [ -z "$DB_PASSWORD" ]; then
  echo "$(date) Error: DB_PASSWORD is not set in .env" >&2
  exit 1
fi
if [ -z "$DB_NAME" ]; then
  echo "$(date) Error: DB_NAME is not set in .env" >&2
  exit 1
fi
if [ -z "$DB_PORT" ]; then
  echo "$(date) Error: DB_PORT is not set in .env" >&2
  exit 1
fi

log_info() {
  echo "$(date) INFO: $1" | tee -a "$MAIN_LOG"
}

log_error() {
  echo "$(date) ERROR: $1" | tee -a "$MAIN_LOG" >&2
}

cleanup() {
  log_info "Cleaning up processes..."
  if [ -f "$BACKEND_PID_FILE" ]; then
    kill "$(cat "$BACKEND_PID_FILE")"
    rm "$BACKEND_PID_FILE"
    log_info "Killed and removed backend pid"
  fi
  if [ -f "$FRONTEND_PID_FILE" ]; then
    kill "$(cat "$FRONTEND_PID_FILE")"
    rm "$FRONTEND_PID_FILE"
    log_info "Killed and removed frontend pid"
  fi
}

trap cleanup EXIT ERR INT TERM

check_port() {
    local port="$1"
    if lsof -i:"$port" > /dev/null; then
        local pid=$(lsof -ti:"$port")
        log_info "Process found on port $port with PID: $pid"
        kill "$pid"
         log_info "Process on port $port terminated."
    else
        log_info "No process found on port $port."
    fi
}

store_pid() {
  echo "$1" > "$2"
}

log_info "Checking if any process is running on port $BACKEND_PORT."
check_port "$BACKEND_PORT"
log_info "Checking if any process is running on port $FRONTEND_PORT."
check_port "$FRONTEND_PORT"


log_info "Initializing database..."
node config/database.js
if [ "$?" -ne 0 ]; then
  log_error "Database initialization failed"
  exit 1
fi
log_info "Database initialized successfully."

log_info "Starting backend server..."
node index.js > "$BACKEND_LOG" 2>&1 &
BACKEND_PROCESS="$!"
store_pid "$BACKEND_PROCESS" "$BACKEND_PID_FILE"
log_info "Backend process started with PID: $BACKEND_PROCESS"

log_info "Starting frontend server..."
npm start > "$FRONTEND_LOG" 2>&1 &
FRONTEND_PROCESS="$!"
store_pid "$FRONTEND_PROCESS" "$FRONTEND_PID_FILE"
log_info "Frontend process started with PID: $FRONTEND_PROCESS"

log_info "Both processes running in background..."

wait

while true; do
    if ! kill -0 "$BACKEND_PROCESS" > /dev/null 2>&1; then
         log_error "Backend process terminated."
            cleanup
        exit 1
    fi
    if ! kill -0 "$FRONTEND_PROCESS" > /dev/null 2>&1; then
        log_error "Frontend process terminated."
         cleanup
        exit 1
    fi
   sleep 1
done