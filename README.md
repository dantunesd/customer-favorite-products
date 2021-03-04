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

Start DB and MockServer:

```bash
docker-compose up -d
```

Optional:

set `PRODUCTS_API_URL='http://challenge-api.luizalabs.com/api/product/%/'` entry at `.env` to send requests to LuizaLabs's products API.

---

# Start API locally

Run the following command:

```bash
node src/index.js
```

A Postman collection can be [found here](https://github.com/dantunesd/customer-favorite-products/blob/main/docs/customer-favorite-products.postman_collection.json) to help you with the requests. See how to import [here](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman).

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
