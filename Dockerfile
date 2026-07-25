# syntax=docker/dockerfile:1.7

# Stage 1: Composer dependencies
FROM composer:2 AS vendor

WORKDIR /app

COPY database/ database/
COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-scripts \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader

# Stage 2: Frontend build (Vite + React + Wayfinder)
#
# The @laravel/vite-plugin-wayfinder plugin shells out to
# `php artisan wayfinder:generate` during `vite build`, so this stage
# needs a working PHP + the app's vendor/ available, not just Node.
FROM node:24-bookworm-slim AS frontend

RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates curl gnupg2 lsb-release \
    && curl -sSL https://packages.sury.org/php/apt.gpg -o /usr/share/keyrings/sury-php.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/sury-php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" \
        > /etc/apt/sources.list.d/sury-php.list \
    && apt-get update && apt-get install -y --no-install-recommends \
        php8.4-cli php8.4-mbstring php8.4-xml php8.4-curl php8.4-tokenizer \
        php8.4-bcmath php8.4-pgsql php8.4-sqlite3 php8.4-intl php8.4-zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .
COPY --from=vendor /app/vendor ./vendor

# artisan just needs to boot (config, DB, etc. are irrelevant at build time),
# so a throwaway sqlite-backed .env is enough to satisfy wayfinder:generate.
RUN cp .env.example .env \
    && sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env \
    && php artisan key:generate --ansi

RUN npm ci
RUN npm run build

# Stage 3: Runtime image (php-fpm + nginx, supervised)
FROM php:8.4-fpm-alpine AS runtime

RUN apk add --no-cache \
        nginx \
        supervisor \
        bash \
        curl \
        postgresql-client \
        libpng \
        libjpeg-turbo \
        freetype \
        icu-libs \
        icu-data-full \
        libzip \
        oniguruma \
        libxml2 \
    && apk add --no-cache --virtual .build-deps \
        postgresql-dev \
        libzip-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        icu-dev \
        oniguruma-dev \
        libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        pdo_pgsql \
        pgsql \
        bcmath \
        intl \
        zip \
        gd \
        opcache \
        pcntl \
        exif \
    && apk del .build-deps

WORKDIR /var/www/html

COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=frontend /app/public/build ./public/build
COPY --from=frontend /app/resources/js/actions ./resources/js/actions
COPY --from=frontend /app/resources/js/routes ./resources/js/routes
COPY --from=frontend /app/resources/js/wayfinder ./resources/js/wayfinder

RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache \
        storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/php.ini /usr/local/etc/php/conf.d/laravel.ini
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]