FROM nginx:alpine

MAINTAINER Mahmoud Zalt <mahmoud@zalt.me>

ADD nginx.conf /etc/nginx/
ADD laravel.conf /etc/nginx/conf.d/laravel.conf

ARG PHP_UPSTREAM=php-fpm

RUN apk update \
    && apk upgrade \
    && apk add --no-cache bash openssl \
    && adduser -D -H -u 1000 -s /bin/bash www-data \
    && rm /etc/nginx/conf.d/default.conf \
    && echo "upstream php-upstream { server ${PHP_UPSTREAM}:9000; }" > /etc/nginx/conf.d/upstream.conf \
    && mkdir /etc/nginx/ssl \
    && touch /etc/nginx/ssl/nginx.key \
    && touch /etc/nginx/ssl/nginx.crt

RUN openssl req -x509 -newkey rsa:2048 \
  -subj "/C=XX/ST=XXXX/L=XXXX/O=XXXX/CN=localhost" \
  -keyout "/etc/nginx/ssl/nginx.key" \
  -out "/etc/nginx/ssl/nginx.crt" \
  -days 3650 -nodes

CMD ["nginx"]

EXPOSE 80 443 8443 8080
