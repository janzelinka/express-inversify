FROM node:14 as base
WORKDIR /app

COPY ./src /src
COPY ./.env /
COPY ./ormconfig.json /
COPY ./package.json /
COPY ./tsconfig.json /
COPY ./yarn.lock /
COPY ./database.sqlite /
RUN yarn

