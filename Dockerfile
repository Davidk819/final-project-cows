FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN nx run server:build --configuration=development

CMD ["node", "./dist/apps/server/main.js"]
