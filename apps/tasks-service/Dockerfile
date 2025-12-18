FROM node:22-alpine AS development
WORKDIR /app/apps/tasks-service
COPY apps/tasks-service/package*.json ./
RUN npm install
COPY apps/tasks-service/ .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]