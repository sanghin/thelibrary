# https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker#step-3-%E2%80%94-writing-the-dockerfile

FROM node:10.15.0-jessie-slim

# Remove the version of yarn that is coming with node:10.15.0 & install given version of yarn
RUN rm -f /usr/local/bin/yarn && \
  curl -o- -L https://yarnpkg.com/install.sh | bash -s version=1.13.0 && \
  chmod +x ~/.yarn/bin/yarn && \
  ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn

# Create a non root user
RUN mkdir -p /home/nodejs/poe-build-scraper/node_modules && chown -R node:node /home/nodejs/poe-build-scraper
WORKDIR /home/nodejs/poe-build-scraper

COPY package*.json ./
# cache clean ->https://github.com/yarnpkg/yarn/issues/749#issuecomment-373752990
RUN yarn install --frozen-lockfile --production && yarn cache clean

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 9000
