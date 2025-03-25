FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY .env .env

EXPOSE 3000

CMD ["node", "dist/main"]
