FROM node:22-alpine AS development
WORKDIR /app/apps/web
COPY apps/web/package*.json ./

RUN npm install --include=dev

COPY apps/web/ .
EXPOSE 3000
CMD ["npm", "run", "dev"]