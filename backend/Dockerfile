FROM node:20

RUN useradd -ms /bin/sh -u 1001 app
USER app

WORKDIR /app/backend

COPY --chown=app:app . /app/backend

RUN npm install

EXPOSE 5200

CMD ["npm", "run", "dev"]