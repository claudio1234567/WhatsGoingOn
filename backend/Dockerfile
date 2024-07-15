FROM node:20.5.0

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia il resto del codice sorgente nel container
COPY . .

# Espone la porta che il backend usa
EXPOSE 5000

# Specifica il comando per eseguire l'applicazione
CMD ["node", "index.js"]