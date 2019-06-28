FROM node:alpine

RUN apk update && apk add redis

WORKDIR /home

COPY package.json ./
COPY src src
COPY entrypoint.sh entrypoint.sh

RUN yarn install --production --silent

ENTRYPOINT /home/entrypoint.sh

