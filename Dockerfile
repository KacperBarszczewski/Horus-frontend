FROM node:16.14.2

WORKDIR /app

RUN npm install -g npm@8.6.0
RUN npm install -g @angular/cli@16.0.1

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "bash" ]
