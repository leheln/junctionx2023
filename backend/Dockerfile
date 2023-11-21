FROM node:20

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5600

CMD ["npm", "run", "dev"]