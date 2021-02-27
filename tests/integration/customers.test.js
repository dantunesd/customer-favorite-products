const supertest = require('supertest');
const app = require('../../src/express-app');

const newValidCustomer = {
  email: 'email@email.com',
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

describe('PUT /customers', () => {
  describe('given a new valid customer', () => {
    it('should return 201', async () => {
      const result = await supertest(app)
        .put('/customers/')
        .send(newValidCustomer);

      expect(201).toEqual(result.status);
    });
  });

  describe('given a existing valid customer', () => {
    it('should return 200', async () => {
      const result = await supertest(app)
        .put('/customers/1')
        .send(existingValidCustomer);

      expect(200).toEqual(result.status);
    });
  });

  describe('given a invalid CUSTOMER', () => {
    it('should return 400', async () => {
      const result = await supertest(app)
        .put('/customers/')
        .send(invalidCustomer);

      expect(400).toEqual(result.status);
    });
  });
});
