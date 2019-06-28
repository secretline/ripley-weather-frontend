FROM node:alpine

WORKDIR /home

COPY package.json ./
COPY public public
COPY src src

RUN yarn install --production --silent

RUN yarn build

ENTRYPOINT yarn serve

