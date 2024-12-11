# Cloud URL Shortener API

## Configuring & Running

- Set up envvars by copying `.env.example` to a new `.env` file, and modify `PORT` (optional) and `DATABASE_URL` (used by Prisma) if needed.
- Do the chain of commands below:

```sh
# Install deps
$ npm install

# Run prisma migrations to the database defined by DATABASE_URL envvar
$ npx prisma migrate dev

# Generate @prisma/client
$ npx prisma generate

# Run the application
$ npm run start
```

## Endpoints

| Endpoint   | Method | Description                                                                                 |
| ---------- | ------ | ------------------------------------------------------------------------------------------- |
| /url/:code | GET    | Given a `code`, return the original, unshortened URL                                        |
| /url       | GET    | Return an array of all the shortened URLs in the database                                   |
| /url       | POST   | Given `url` in the request body, return a JSON containing the new `code` and `original` URL |
