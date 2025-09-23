FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

FROM node:20-alpine AS runtime

WORKDIR /app

RUN npm install -g serve json-server

COPY --from=build /app/dist ./dist

COPY --from=build /app/db.json /seed/db.json

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /data

EXPOSE 3000 3001
CMD ["/start.sh"]