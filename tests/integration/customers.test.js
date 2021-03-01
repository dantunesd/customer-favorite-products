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
  missingName: '',
};

describe('POST /customers', () => {
  describe('given I try to create a new customer with a valid payload', () => {
    it('should return 201', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(validCustomer());

      expect(result.status).toEqual(201);
    });
  });

  describe('given I try to create a new customer with an email in use', () => {
    it('should return 422', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(existingCustomer);

      expect(result.status).toEqual(422);
    });
  });

  describe('given I try to create a new customer with an invalid payload', () => {
    it('should return 400', async () => {
      const result = await supertest(app)
        .post('/customers/')
        .send(invalidCustomer);

      expect(result.status).toEqual(400);
    });
  });
});

describe('GET /customers/:customerId', () => {
  describe('given I try to retrieve an existent customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .get('/customers/603ae34e540e915345f00f2e/')
        .send();

      expect(result.status).toEqual(200);
    });
  });

  describe('given I try to retrieve an inexisting customer', () => {
    it('should return 404', async () => {
      const result = await supertest(app)
        .get('/customers/inexistenttt/')
        .send();

      expect(result.status).toEqual(404);
    });
  });

  describe('given I try to retrieve a customer with an invalid id', () => {
    it('should return 400', async () => {
      const result = await supertest(app).get('/customers/invalid/').send();

      expect(result.status).toEqual(400);
    });
  });
});

describe('PUT /customers/:customerId', () => {
  describe('given I try to update an existent customer with a valid payload', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .put('/customers/603ae34e540e915345f00f2f')
        .send(validCustomer());

      expect(result.status).toEqual(200);
    });
  });

  describe('given I try to update an existent customer with an email in use', () => {
    it('should return 422', async () => {
      const result = await supertest(app)
        .put('/customers/603ae34e540e915345f00f2f')
        .send(existingCustomer);

      expect(result.status).toEqual(422);
    });
  });

  describe('given I try to update a customer with an invalid payload', () => {
    it('should return 400', async () => {
      const result = await supertest(app)
        .put('/customers/603ae34e540e915345f00f2f')
        .send(invalidCustomer);

      expect(result.status).toEqual(400);
    });
  });

  describe('given I try to update a customer with an invalid id', () => {
    it('should return 400', async () => {
      const result = await supertest(app)
        .put('/customers/invalid')
        .send(validCustomer());

      expect(result.status).toEqual(400);
    });
  });
});

describe('DELETE /customers/:customerId', () => {
  describe('given I try to delete an existing customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .delete('/customers/603ae34e540e915345f00f2c/')
        .send();

      expect(result.status).toEqual(200);
    });
  });

  describe('given I try to delete an inexisting customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .delete('/customers/inexistenttt/')
        .send();

      expect(result.status).toEqual(200);
    });
  });

  describe('given I try to delete a customer with invalid id', () => {
    it('should return 400', async () => {
      const result = await supertest(app).delete('/customers/invalid/').send();

      expect(result.status).toEqual(400);
    });
  });
});
