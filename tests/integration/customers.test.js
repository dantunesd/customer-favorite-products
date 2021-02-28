require('dotenv').config();

const supertest = require('supertest');
const app = require('../../src/api/express-app');

const newValidCustomer = {
  email: `${new Date().getTime()}@email.com`,
  name: 'name lastname',
};

const existingValidCustomer = {
  email: 'email@email.com',
  name: 'name lastname',
};

const invalidCustomer = {
  missingEmail: '',
  missingName: '',
};

describe('POST /customers', () => {
  describe('given a new valid customer', () => {
    it('should return 201', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(newValidCustomer);

      expect(result.status).toEqual(201);
    });
  });

  describe('given an existing customer', () => {
    it('should return 422', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(existingValidCustomer);

      expect(result.status).toEqual(422);
    });
  });

  describe('given an invalid customer', () => {
    it('should return 400', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(invalidCustomer);

      expect(result.status).toEqual(400);
    });
  });
});

describe('GET /customers/:customerId', () => {
  describe('given an existing customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .get('/customers/603ad62f213698dc5c23dda9/')
        .send();

      expect(result.status).toEqual(200);
    });
  });

  describe('given an inexisting customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .get('/customers/603ad62f213698dc5c23ddd9/')
        .send();

      expect(result.status).toEqual(404);
    });
  });
});

describe('PUT /customers/:customerId', () => {
  describe('given a valid existing customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .put('/customers/1/')
        .send(existingValidCustomer);

      expect(result.status).toEqual(200);
    });
  });

  describe('given a invalid customer', () => {
    it('should return 400', async () => {
      const result = await supertest(app)
        .put('/customers/1/')
        .send(invalidCustomer);

      expect(result.status).toEqual(400);
    });
  });
});
