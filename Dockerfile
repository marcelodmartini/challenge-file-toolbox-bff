# Utiliza la imagen base de Node.js 14
FROM node:14

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
COPY src ./src

# Instala las dependencias de la aplicación
RUN npm install

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "start"]

