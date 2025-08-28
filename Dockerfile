# Build stage
FROM oven/bun:1.1.13 AS builder

WORKDIR /app

COPY bun.lockb package.json ./
RUN bun install

COPY . .
RUN bun run build

# Production stage
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Development stage
FROM oven/bun:1.1.13 AS development

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

EXPOSE 5173

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]