FROM node:22-alpine AS development
WORKDIR /app/apps/api-gateway
COPY apps/api-gateway/package*.json ./
RUN npm install
COPY apps/api-gateway/ .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]