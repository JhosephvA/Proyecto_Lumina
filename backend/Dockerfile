FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar solo package.json primero para aprovechar el cache de Docker
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

# Copiar el resto del código
COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "app.js"]
