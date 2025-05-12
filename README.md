# NiceCards
*...but they can be MEAN* 

NiceCards is a simple flashcard learning application, where registered users can view, create, edit and share their flashcard collections with others and create cards about different topics.  

---

#### Technologies used

The project was built using the MEAN software stack:

- The frontend was made using `Angular (19.1.0)` and was styled using `Tailwind CSS`.
- The backend is a `nodejs` server using `expressjs`
- The stack's choice of database is `MongoDB` which is accessed through a cluster deployed in `MongoDB Atlas`

#### Running the application

The project is dockerized so you can find a Dockerfile in both the `/backend` and `/frontend` folders. 

These are used in the `docker-compose.yaml` file in the root directory which can be built and ran using:

```
docker compose build
docker compose up
```

For added performance benefits docker compose is using [watch](https://docs.docker.com/compose/how-tos/file-watch/) mode instead of volumes (but that can be used as well, I just found it more difficult to work with).
 
If you want to develop the application, on first install run the `npm i` command in the `/backend` and `/frontend/nice-cards` folders.

For the environment variables in `/backend` you'll have to provide your own keys in the way they're defined in `/backend/.env.template`.