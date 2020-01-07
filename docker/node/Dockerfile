ARG PORT=3000
FROM node:13.5.0-alpine3.11

# Required depencies
RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    yarn


WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "dev"]
