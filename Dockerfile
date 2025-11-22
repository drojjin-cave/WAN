FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    git curl libpng-dev libjpeg-turbo-dev freetype-dev zip unzip oniguruma-dev libxml2-dev linux-headers \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . /var/www

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN composer install --optimize-autoloader --no-interaction --no-dev

EXPOSE 9000
CMD ["php-fpm"]
