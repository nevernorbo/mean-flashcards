FROM node:20

WORKDIR /app/backend

COPY . /app/backend

RUN npm install

EXPOSE 5200

CMD ["npx", "ts-node", "src/server.ts"]