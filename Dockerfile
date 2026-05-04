FROM node:22-alpine AS build

WORKDIR /app

COPY site/package*.json ./site/
RUN cd site && npm ci

COPY . .

ENV BOOK_VERSION=v4.1
ENV BOOK_LANGUAGE=en

RUN cd site && npm run build

FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/site/dist /usr/share/nginx/html

EXPOSE 80
