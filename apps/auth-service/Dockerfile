FROM node:22-slim AS development
WORKDIR /app/apps/auth-service
COPY apps/auth-service/package*.json ./
RUN npm install
COPY apps/auth-service/ .
EXPOSE 3002
CMD ["npm", "run", "start:dev"]