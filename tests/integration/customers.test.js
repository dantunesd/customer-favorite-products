require('dotenv').config();

const supertest = require('supertest');
const app = require('../../src/api/express-app');

const validCustomer = {
  email: `${new Date().getTime()}@email.com`,
  name: 'name lastname',
};

const existingCustomer = {
  email: 'existing@email.com',
  name: 'existing name',
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
        .send(validCustomer);

      expect(result.status).toEqual(201);
    });
  });

  describe('given an existing customer', () => {
    it('should return 422', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(existingCustomer);

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
        .get('/customers/603ae34e540e915345f00f2e/')
        .send();

      expect(result.status).toEqual(200);
    });
  });

  describe('given an inexisting customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .get('/customers/inexistenttt/')
        .send();

      expect(result.status).toEqual(404);
    });
  });

  describe('given an invalid customer', () => {
    it('should return 400', async () => {
      const result = await supertest(app).get('/customers/invalid/').send();

      expect(result.status).toEqual(400);
    });
  });
});

describe('PUT /customers/:customerId', () => {
  describe('given a valid existing customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .put('/customers/603ae34e540e915345f00f2f')
        .send(validCustomer);

      expect(result.status).toEqual(200);
    });
  });

  describe('given a invalid customer', () => {
    it('should return 400', async () => {
      const result = await supertest(app)
        .put('/customers/invalid/')
        .send(invalidCustomer);

      expect(result.status).toEqual(400);
    });
  });
});
