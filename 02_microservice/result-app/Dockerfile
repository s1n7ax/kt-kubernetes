FROM node:18.8.0-alpine3.16 AS builder

ARG REACT_APP_RESULT_MS_HOST
ARG REACT_APP_RESULT_MS_PORT

WORKDIR /app/
COPY ./ /app/
RUN yarn install
RUN yarn run build

FROM nginx:stable-alpine

COPY --from=builder /app/build/ /usr/share/nginx/html

RUN sed -i -e 's/listen.*/listen 3001;/g' /etc/nginx/conf.d/default.conf
