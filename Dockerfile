FROM node:current-slim

WORKDIR /usr/src/app
COPY package.json .
RUN npm install

EXPOSE 8080

CMD [ "cd", "client" ]
CMD [ "npm", "start" ]
CMD [ "cd", ".." ]
CMD [ "cd", "server" ]
CMD [ "npm", "start" ]

COPY . .