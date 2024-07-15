# Crea una nuova cartella per il backend
mkdir backend
cd backend

# Inizializza un nuovo progetto Node.js
npm init -y

# Installa Express e altre dipendenze necessarie
npm install express mongoose cors body-parser

# Torna alla directory principale
cd ..

# Installazione di create-react-app per iniziare con React
npx create-react-app my-messaging-app
cd my-messaging-app

# Avvio del progetto
node index.js   Backend
npm start Frontend

# Dockerizzazione del backend
cd ../backend
docker build -t my_backend .

# Dockerizzazione del frontend
cd ../my-messaging-app
docker build -t my_frontend .

# Esegui container Docker per MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:4.4-bionic

# Esegui container Docker per il backend
docker run -p 5000:5000 --name my_backend --link mongodb:mongodb my_backend

# Esegui container Docker per il frontend
docker run -p 3000:3000 --name my_frontend my_frontend

# Rimuovi i container
docker rm -f mongodb
docker rm -f my_backend
docker rm -f my_frontend

# stop container

docker stop mongodb
docker stop my_backend
docker my_frontend

# Accedi al container MongoDB
docker exec -it mongodb mongo

use messaging-app

# Avvia i container
docker start my_backend
docker start mongodb
docker start my_frontend