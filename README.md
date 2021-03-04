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

# Rest Api

Available resources:

## Create a customer

### Request

```
POST /customers
```

```bash
curl --request POST 'http://localhost:8080/customers' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "email@email.com",
  "name": "name lastnaame"
}'
```

200 Ok

### Response

```json
{
  "customerId": "6040d34e5d2ed12af06bcb96"
}
```

## Get a customer

### Request

```
GET /customers/{customerId}
```

```bash
curl --request GET 'http://localhost:8080/customers/{customerId}' \
--header 'Authorization: Bearer your-token'
```

### Response

200 Ok

```json
{
  "_id": "6040d34e5d2ed12af06bcb96",
  "email": "email@email.com",
  "name": "name lastnaame"
}
```

## Update a customer

### Request

```
PUT /customers/{customerId}
```

```bash
curl --location -g --request PUT 'http://localhost:8080/customers/{customerId}' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSJ9.g7Rm3Ju3bdyMf-GGwCBohaRSisEUSy2b9vmSFxxqZZc' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "email@email.com",
  "name": "name lastnaame"
}'
```

### Response

204 No content

## Delete a customer

### Request

```
DELETE /customers/{customerId}

```

```bash
curl --request DELETE 'http://localhost:8080/customers/{customerId}' \
--header 'Authorization: Bearer your-token'
```

### Response

204 No content

## X

### Request

```
PATH
```

```bash
COMMAND
```

### Response

```json
BODY
```

## X

### Request

```
PATH
```

```bash
COMMAND
```

### Response

```json
BODY
```

## X

### Request

```
PATH
```

```bash
COMMAND
```

### Response

```json
BODY
```

## X

### Request

```
PATH
```

```bash
COMMAND
```

### Response

```json
BODY
```

## X

### Request

```
PATH
```

```bash
COMMAND
```

### Response

```json
BODY
```
