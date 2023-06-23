<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

The objective is to create a voucher pool in NestJs. You can use whichever libraries you prefer. The service should expose a ​REST API​.

This project was written with NestJs using **TDD** with Jest lib.

---

### Tasks
* [x] Design a database schema
* [x] Write an application
* [x] API endpoint for verifying and redeeming vouchers
* [x] Implement API Rate Limiting: Protect the API from abuse by implementing rate limiting on the endpoints.
* [x] Use Database Transactions: Ensure data consistency by implementing use of transactions in your application.
* [x] Write unit tests
* [x] Using Typescript
* [x] A nice little Readme on how to run
* [x] ***PLUS POINT:*** Writing swagger for the API
* [x] ***PLUS POINT:*** Docker file to setup the whole application with all the dependencies (database, nodejs)
* 
---

## Installation
**Install Dependencies**
- Using Docker
```bash
$ docker build -t voucher_pool .
```

- Without Docker
```bash
$ yarn install --frozen-lockfile
$ mv .env.example .env
```
Modify .env file to the correct DB connection.
You can also run the db only from docker
```bash
$ docker-compose up voucher_db
```

---

**Initialize**

To initialize prisma you need to run
```bash
$ npx prisma generate
```

To Migrate migrations to DB on staging
```bash
$ npx prisma migrate dev
```
Or on production
```bash
$ npx prisma migrate deploy --preview-feature
```

## Running the app
- Using Docker
```bash
$ docker run -p 4000:4000 voucher_pool
```

- Or Using Docker Compose
```bash
$ docker-compose up 
```

- Or without docker

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Documentation
You can access swagger docs using this link
```
http://localhost:4000/api/
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

