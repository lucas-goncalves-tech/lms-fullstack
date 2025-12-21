FROM node:24-alpine AS base
WORKDIR /app

FROM base AS development
ENV NODE_ENV=development
COPY package*.json .
RUN npm ci
CMD ["npm", "run", "dev"]