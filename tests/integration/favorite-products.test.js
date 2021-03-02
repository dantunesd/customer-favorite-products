require('dotenv').config();

const supertest = require('supertest');
const app = require('../../src/api/express-app');

const validCustomerId = '603ae34e540e915345f00f2e';

const validProduct = {
  productId: 'bf0f365-fbdd-4e21-9786-da459d78dd1f',
};

const invalidProduct = {
  invalid: 'bf0f365-fbdd-4e21-9786-da459d78dd1f',
};

describe('POST /customers/:customerId:/favorite-products', () => {
  describe('given I try to add a new product to an existing customer with a valid payload', () => {
    it('should return 200 status code', async () => {
      const result = await supertest(app)
        .post(`/customers/${validCustomerId}/favorite-products`)
        .send(validProduct);

      expect(result.status).toEqual(200);
    });
  });

  describe('given I try to add a new product with a invalid payload', () => {
    it('should return 400 status code and the error', async () => {
      const result = await supertest(app)
        .post(`/customers/${validCustomerId}/favorite-products`)
        .send(invalidProduct);

      expect(result.status).toEqual(400);
      expect(result.body).toEqual({
        status: 400,
        title:
          "data should have required property 'productId', data should NOT have additional properties",
        type: 'https://httpstatuses.com/400',
      });
    });
  });

  describe('given I try to add a new product to an inexisting customer', () => {
    it('should return 404 status code and the error', async () => {
      const result = await supertest(app)
        .post('/customers/inexistenttt/favorite-products')
        .send(validProduct);

      expect(result.status).toEqual(404);
      expect(result.body).toEqual({
        status: 404,
        title: 'Customer Not Found',
        type: 'https://httpstatuses.com/404',
      });
    });
  });
});
