FROM node:14

ENV HOME=/home/app
WORKDIR $HOME/node_docker

COPY package.json package-lock.json $HOME/node_docker/

RUN npm install --only=production

COPY . $HOME/node_docker

EXPOSE 3000

CMD ["npm", "start"]