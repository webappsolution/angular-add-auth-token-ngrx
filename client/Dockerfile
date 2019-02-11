FROM nginx:alpine

COPY docker/nginx/default.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/angular-add-auth-token-ngrx .