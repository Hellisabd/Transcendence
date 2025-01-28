#!/bin/sh

set -e

host="$DJANGO_DB_HOST"
port="$DJANGO_DB_PORT"

echo "Waiting for database at $host:$port..."

while ! python -c "import socket; s = socket.socket(); s.connect(('$host', int('$port')))" 2>/dev/null; do
  sleep 1
done

echo "Database is up!"
exec "$@"