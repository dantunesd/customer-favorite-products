# Customer Favorite Products
An API to manages customers and their favorite products

---

# Pre Requirements

* Docker ^19.03 

* Docker Compose ^1.25

* Nodejs ^14.16 (optional)

P.S.: if you have nvm installed in your machine, just run `nvm install` command to get the correct NodeJs version.

---

# Dependencies

Run the following command to install npm dependencies:

```bash
docker-compose -f docker-compose-npm-install.yaml up
```
Or if you have Nodejs installed: 

```bash
npm install
```

Start the api's service dependencies

```bash
docker-compose -f docker-compose-services.yaml up
```

---

# Start API locally

Run the following command:

```bash
docker-compose -f docker-compose-start-api.yaml up
```

Or:

```bash
node src/index.js
```

---
