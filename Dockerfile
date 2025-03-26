FROM node:23-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3000