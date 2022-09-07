FROM node:18.8.0-alpine3.16

COPY ./ /app
WORKDIR /app
RUN yarn

CMD ["node", "./bin/www"]
