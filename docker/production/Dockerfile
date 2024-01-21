FROM node:18.18-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:18.18-alpine as production
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ecosystem.config.json ./
RUN npm ci --ignore-scripts
COPY --from=builder /app/dist ./dist
EXPOSE 8001
CMD ["npm", "run", "start:prod"]