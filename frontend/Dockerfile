FROM node:20.5.0

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia il resto del codice sorgente nel container
COPY . .

# Costruisce l'applicazione per la produzione
RUN npm run build

# Installa un server statico per servire l'applicazione
RUN npm install -g serve

# Espone la porta che il frontend usa
EXPOSE 3000

# Specifica il comando per eseguire l'applicazione
CMD ["serve", "-s", "build"]