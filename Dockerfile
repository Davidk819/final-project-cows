FROM node:lts-slim AS builder

RUN npm install

RUN npx nx run server:build --configuration=development

CMD ["node", "./dist/apps/server/main.js"]
