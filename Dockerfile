FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

FROM node:20-alpine AS runtime

WORKDIR /app

# Install lightweight static file server + json-server
RUN npm install -g serve json-server

# Copy build artifacts
COPY --from=build /app/dist ./dist

# Seed database file (kept read-only as a template)
COPY --from=build /app/db.json /seed/db.json

# Startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Working data directory (will be a volume mount)
RUN mkdir -p /data

EXPOSE 3000 3001
CMD ["/start.sh"]