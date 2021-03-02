# Customer Favorite Products

An API to manages customers and their favorite products

---

# Pre Requirements

- `Docker ^19.03`

- `Docker Compose ^1.25`

- `NPM + Nodejs ^14.16 (optional)`

P.S.: if you have nvm installed in your machine, just run `nvm install` command to get the correct `NodeJs` version.

---

# Installation

Run the following command to install npm dependencies:

```bash
docker-compose -f docker-compose-npm-install.yaml up
```

Or if you have `npm` installed:

```bash
npm install
```

Start the api's service dependencies:

```bash
docker-compose -f docker-compose-services.yaml up
```

Create a `.env` file and change to your needs:

```bash
cp .env.example .env
```

---

# Start API locally

Run the following command:

```bash
docker-compose -f docker-compose-start-api.yaml up
```

Or if you have `NodeJS` installed:

```bash
node src/index.js
```

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
