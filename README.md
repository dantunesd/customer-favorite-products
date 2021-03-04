# Customer Favorite Products

An API to manages customers and their favorite products

---

# Pre Requirements

- `Docker 19.03`

- `Docker Compose 1.25`

- `NPM + Nodejs 14.16`

P.S.: if you have nvm installed in your machine, just run `nvm install` command to get the correct `NodeJs` version.

---

# Installation

Install dependencies

```bash
npm install
```

Create a `.env` file and change to your needs:

```bash
cp .env.example .env
```

Optional:

set `PRODUCTS_API_URL='http://challenge-api.luizalabs.com/api/product/%/'` entry at `.env` to send requests to LuizaLabs's products API.

set `NODE_ENV=testing` entry at `.env` to silence the logs while running tests.

Start DB and MockServer:

```bash
docker-compose up -d
```

---

# Start API locally

Run the following command:

```bash
node src/index.js
```

A Postman collection can be [found here](https://github.com/dantunesd/customer-favorite-products/blob/main/docs/customer-favorite-products.postman_collection.json) to help you with the requests.

---

# Tests

Run unit tests:

```bash
npm test
```

Run integration tests:

```bash
npm run test:integration
```

P.S: run `Installation` step before running integration tests.

---
