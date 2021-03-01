require('dotenv').config();

const supertest = require('supertest');
const app = require('../../src/api/express-app');

const validCustomer = () => ({
  email: `${new Date().getTime()}@email.com`,
  name: 'name lastname',
});

const existingCustomer = {
  email: 'existing@email.com',
  name: 'existing name',
};

const invalidCustomer = {
  missingEmail: '',
  name: 'name',
};

describe('POST /customers', () => {
  describe('given I try to create a new customer with a valid payload', () => {
    it('should return 201 status code and an ID in body', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(validCustomer());

      expect(result.status).toEqual(201);
      expect(result.body).toHaveProperty('customerId');
    });
  });

  describe('given I try to create a new customer with an email in use', () => {
    it('should return 422 status code and the error', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(existingCustomer);

      expect(result.status).toEqual(422);
      expect(result.body).toEqual({
        status: 422,
        title: 'This email is already in use',
        type: 'https://httpstatuses.com/422',
      });
    });
  });

  describe('given I try to create a new customer with an invalid payload', () => {
    it('should return 400 status code and the error', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(invalidCustomer);

      expect(result.status).toEqual(400);
      expect(result.body).toEqual({
        status: 400,
        title:
          "data should have required property 'email', data should NOT have additional properties",
        type: 'https://httpstatuses.com/400',
      });
    });
  });
});

describe('GET /customers/:customerId', () => {
  describe('given I try to retrieve an existent customer', () => {
    it('should return 200 status code and the customer content', async () => {
      const result = await supertest(app)
        .get('/customers/603ae34e540e915345f00f2e/')
        .send();

      expect(result.status).toEqual(200);
      expect(result.body).toEqual({
        _id: '603ae34e540e915345f00f2e',
        email: 'existing@email.com',
        name: 'existing name',
      });
    });
  });

  describe('given I try to retrieve an inexisting customer', () => {
    it('should return 404 status code and the error', async () => {
      const result = await supertest(app)
        .get('/customers/inexistenttt/')
        .send();

      expect(result.status).toEqual(404);
      expect(result.body).toEqual({
        status: 404,
        title: 'Customer Not Found',
        type: 'https://httpstatuses.com/404',
      });
    });
  });

  describe('given I try to retrieve a customer with an invalid id', () => {
    it('should return 400 status code and the error', async () => {
      const result = await supertest(app).get('/customers/invalid/').send();

      expect(result.status).toEqual(400);
      expect(result.body).toEqual({
        status: 400,
        title: 'The customerId is invalid',
        type: 'https://httpstatuses.com/400',
      });
    });
  });
});

describe('PUT /customers/:customerId', () => {
  describe('given I try to update an existent customer with a valid payload', () => {
    it('should return 200 status code', async () => {
      const result = await supertest(app)
        .put('/customers/603ae34e540e915345f00f2f')
        .send(validCustomer());

      expect(result.status).toEqual(200);
    });
  });

  describe('given I try to update an inexistent customer with a valid payload', () => {
    it('should return 404 status code and the error', async () => {
      const result = await supertest(app)
        .put('/customers/inexistenttt')
        .send(validCustomer());

      expect(result.status).toEqual(404);
      expect(result.body).toEqual({
        status: 404,
        title: 'Customer Not Found',
        type: 'https://httpstatuses.com/404',
      });
    });
  });

  describe('given I try to update an existent customer with an email in use', () => {
    it('should return 422 status code and the error', async () => {
      const result = await supertest(app)
        .put('/customers/603ae34e540e915345f00f2f')
        .send(existingCustomer);

      expect(result.status).toEqual(422);
      expect(result.body).toEqual({
        status: 422,
        title: 'This email is already in use',
        type: 'https://httpstatuses.com/422',
      });
    });
  });

  describe('given I try to update a customer with an invalid payload', () => {
    it('should return 400 status code and the error', async () => {
      const result = await supertest(app)
        .put('/customers/603ae34e540e915345f00f2f')
        .send(invalidCustomer);

      expect(result.status).toEqual(400);
      expect(result.body).toEqual({
        status: 400,
        title:
          "data should have required property 'email', data should NOT have additional properties",
        type: 'https://httpstatuses.com/400',
      });
    });
  });

  describe('given I try to update a customer with an invalid id', () => {
    it('should return 400 status code and the error', async () => {
      const result = await supertest(app)
        .put('/customers/invalid')
        .send(validCustomer());

      expect(result.status).toEqual(400);
      expect(result.body).toEqual({
        status: 400,
        title: 'The customerId is invalid',
        type: 'https://httpstatuses.com/400',
      });
    });
  });
});

describe('DELETE /customers/:customerId', () => {
  describe('given I try to delete an existing customer', () => {
    it('should return 200 status code', async () => {
      const result = await supertest(app)
        .delete('/customers/603ae34e540e915345f00f2c/')
        .send();

      expect(result.status).toEqual(200);
    });
  });

  describe('given I try to delete an inexisting customer', () => {
    it('should return 404 status code and the error', async () => {
      const result = await supertest(app)
        .delete('/customers/inexistenttt/')
        .send();

      expect(result.status).toEqual(404);
      expect(result.body).toEqual({
        status: 404,
        title: 'Customer Not Found',
        type: 'https://httpstatuses.com/404',
      });
    });
  });

  describe('given I try to delete a customer with invalid id', () => {
    it('should return 400 status code and the error', async () => {
      const result = await supertest(app).delete('/customers/invalid/').send();

      expect(result.status).toEqual(400);
      expect(result.body).toEqual({
        status: 400,
        title: 'The customerId is invalid',
        type: 'https://httpstatuses.com/400',
      });
    });
  });
});
