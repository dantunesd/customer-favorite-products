# Customer Favorite Products

An API to manages customers and their favorite products

---

# Prerequisites

- `Docker 19.03`

- `Docker Compose 1.25`

- `Nodejs 14.16`

Note: if you have nvm installed in your machine, just run `nvm install` command to get the correct `NodeJs` version.

---

# Installation

Install dependencies

```bash
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Start db and mockserver and wait them to be ready:

```bash
docker-compose up
```

Optional:

Set `PRODUCTS_API_URL=http://host.com/api/product/%/` entry at `.env` to send requests to Host's products API.

You can access a visual interface for mongodb at `http://localhost:8081/`

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

# Start API locally

Run the following command:

```bash
npm start
```

---

# Rest API

Available resources:

Note 1: A Postman collection can be [found here](https://github.com/dantunesd/customer-favorite-products/blob/main/docs/customer-favorite-products.postman_collection.json) to help you with the requests. See how to import [here](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman).

Note 2: The token in the requests examples is for development purposes. Any changes in `JWT_SECRET`, `JWT_ISSUER` `JWT_AUDIENCE` entries at `.env` will require generate a new token.

## Create a customer

### Request

`POST /customers`

```bash
curl --request POST 'http://localhost:8080/customers' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSIsImlhdCI6MTUxNjIzOTAyMn0.slBod5laps6nvgI3O9gymaEJ8K3wButN9cFef_28idg' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "email@email.com",
  "name": "name lastnaame"
}'
```

### Response

```json
Status: 201 Created

{
  "customerId": "6040d34e5d2ed12af06bcb96"
}
```

## Get a customer

### Request

`GET /customers/{customerId}`

```bash
curl --request GET 'http://localhost:8080/customers/{customerId}' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSIsImlhdCI6MTUxNjIzOTAyMn0.slBod5laps6nvgI3O9gymaEJ8K3wButN9cFef_28idg'
```

### Response

```json
Status: 200 OK

{
  "_id": "6040d34e5d2ed12af06bcb96",
  "email": "email@email.com",
  "name": "name lastnaame"
}
```

## Update a customer

### Request

`PUT /customers/{customerId}`

```bash
curl --request PUT 'http://localhost:8080/customers/{customerId}' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSIsImlhdCI6MTUxNjIzOTAyMn0.slBod5laps6nvgI3O9gymaEJ8K3wButN9cFef_28idg' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "email@email.com",
  "name": "name lastnaame"
}'
```

### Response

```
Status: 204 No Content
```

## Delete a customer

### Request

`DELETE /customers/{customerId}`

```bash
curl --request DELETE 'http://localhost:8080/customers/{customerId}' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSIsImlhdCI6MTUxNjIzOTAyMn0.slBod5laps6nvgI3O9gymaEJ8K3wButN9cFef_28idg'
```

### Response

```
Status: 204 No Content
```

## Add a product to a customer

### Request

`POST customers/{customerId}/favorite-products`

```bash
curl --request POST 'http://localhost:8080/customers/{customerId}/favorite-products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSIsImlhdCI6MTUxNjIzOTAyMn0.slBod5laps6nvgI3O9gymaEJ8K3wButN9cFef_28idg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "productId": "1bf0f365-fbdd-4e21-9786-da459d78dd1f"
}'
```

### Response

```
Status: 204 No Content
```

## Get the product list of a customer

### Request

`GET /customers/{customerId}/favorite-products`

```bash
curl --request GET 'http://localhost:8080/customers/{customerId}/favorite-products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSIsImlhdCI6MTUxNjIzOTAyMn0.slBod5laps6nvgI3O9gymaEJ8K3wButN9cFef_28idg'
```

### Response

```json
Status: 200 OK

{
  "favoriteProducts": [
    {
      "price": 1699,
      "image": "http://host.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg",
      "id": "1bf0f365-fbdd-4e21-9786-da459d78dd1f",
      "title": "Cadeira para Auto Iseos Bébé Confort Earth Brown"
    }
  ]
}
```

## Delete a product of a customer

### Request

`DELETE /customers/{customerId}/favorite-products/{productId}`

```bash
curl --request DELETE 'http://localhost:8080/customers/{customerId}/favorite-products/{productId}' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSIsImlhdCI6MTUxNjIzOTAyMn0.slBod5laps6nvgI3O9gymaEJ8K3wButN9cFef_28idg'
```

### Response

```
Status: 204 No Content
```
