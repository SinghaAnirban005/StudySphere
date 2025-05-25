FROM node:lts-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]