FROM node:17

ENV GOOGLE_APPLICATION_CREDENTIALS="/home/node/app/credentials.json"

WORKDIR /home/node/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .
