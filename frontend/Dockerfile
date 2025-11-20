FROM node:18-alpine AS builder

WORKDIR /app
ENV CI=true

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto y construir la app
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# Copiar artefactos de build
COPY --from=builder /app .

EXPOSE 3001

# Usamos next start en producción
CMD ["npm", "run", "start", "--", "-p", "3001"]
