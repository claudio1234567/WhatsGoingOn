# Stage 1: Build the backend application
FROM node:20.5.0 AS build

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia il resto del codice sorgente nel container
COPY . .

# Stage 2: Setup MongoDB and run the application
FROM mongo:latest

# Copia l'applicazione dal primo stage
COPY --from=build /app /app

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Espone la porta che il backend usa
EXPOSE 5000

# Specifica il comando per eseguire l'applicazione
CMD ["sh", "-c", "mongod --fork --logpath /var/log/mongodb.log && node index.js"]