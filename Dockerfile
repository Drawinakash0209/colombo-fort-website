FROM node:20-alpine AS build
WORKDIR /app

# better-sqlite3 (a listed dependency, unused at runtime since DATABASE_CLIENT=postgres)
# needs a native build toolchain to install.
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app ./

EXPOSE 1337
CMD ["npm", "run", "start"]
