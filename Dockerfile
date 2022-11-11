FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.build.json ./

RUN npm install rimraf

RUN npm install --only=development

RUN npm run-script build

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
