# https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker#step-3-%E2%80%94-writing-the-dockerfile

FROM node:10.15.0-jessie-slim

# Create an app directory (in the Docker container)
RUN mkdir -p /home/nodejs/poe-build-scraper/node_modules && chown -R node:node /home/nodejs/poe-build-scraper
WORKDIR /home/nodejs/poe-build-scraper

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 9000
