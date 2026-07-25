#!/bin/bash
set -e

cd /var/www/html

if [ -n "$DB_HOST" ]; then
    echo "Esperando a la base de datos en ${DB_HOST}:${DB_PORT:-5432}..."
    until pg_isready -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-postgres}" -q; do
        sleep 1
    done
    echo "Base de datos disponible."
fi

if [ ! -f .env ]; then
    cp .env.example .env
fi

if ! grep -q '^APP_KEY=.\+' .env; then
    php artisan key:generate --force
fi

php artisan storage:link || true
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec "$@"
