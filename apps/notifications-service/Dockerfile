FROM node:22-alpine AS development
WORKDIR /app/apps/notifications-service
COPY apps/notifications-service/package*.json ./
RUN npm install
COPY apps/notifications-service/ .
EXPOSE 3004
CMD ["npm", "run", "start:dev"]