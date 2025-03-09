FROM node:20

WORKDIR /app/frontend

COPY . /app/frontend

RUN npm install -g @angular/cli

WORKDIR /app/frontend/nice-cards

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
