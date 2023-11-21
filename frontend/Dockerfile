FROM node:20

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev-docker"]