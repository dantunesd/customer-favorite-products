# Customer Favorite Products

An API to manages customers and their favorite products

---

# Pre Requirements

- `Docker 19.03`

- `Docker Compose 1.25`

- `NPM + Nodejs 14.16`

Note: if you have nvm installed in your machine, just run `nvm install` command to get the correct `NodeJs` version.

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

Note: run `Installation` step before running integration tests.

---

# Rest Api

Available resources:

Note: For development purposes, [generate your token](https://jwt.io/) using the jwt secret, audience and issuer found at `.env`

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

### Response

```json
Status: 201 Created
application/json; charset=utf-8

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

```json
Status: 200 OK
application/json; charset=utf-8

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
curl --request PUT 'http://localhost:8080/customers/{customerId}' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "email@email.com",
  "name": "name lastnaame"
}'
```

### Response

```
Status: 204 No Content
application/json; charset=utf-8
```

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

```
Status: 204 No Content
application/json; charset=utf-8
```

## Add a product to a customer

### Request

```
POST customers/{customerId}/favorite-products
```

```bash
curl --request POST 'http://localhost:8080/customers/{customerId}/favorite-products' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "productId": "1bf0f365-fbdd-4e21-9786-da459d78dd1f"
}'
```

### Response

```
Status: 204 No Content
application/json; charset=utf-8
```

## Get the product list of a customer

### Request

```
GET /customers/{customerId}/favorite-products
```

```bash
curl --request GET 'http://localhost:8080/customers/{customerId}/favorite-products' \
--header 'Authorization: Bearer your-token'
```

### Response

```json
Status: 200 OK
application/json; charset=utf-8

{
  "favoriteProducts": [
    {
      "price": 1699,
      "image": "http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg",
      "id": "1bf0f365-fbdd-4e21-9786-da459d78dd1f",
      "title": "Cadeira para Auto Iseos Bébé Confort Earth Brown"
    }
  ]
}
```

## Delete a product of a customer

### Request

```
DELETE /customers/{customerId}/favorite-products/{productId}
```

```bash
curl --request DELETE 'http://localhost:8080/customers/{customerId}/favorite-products/{productId}' \
--header 'Authorization: Bearer your-token'
```

### Response

```
Status: 204 No Content
application/json; charset=utf-8
```
