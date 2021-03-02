require('dotenv').config();

const supertest = require('supertest');
const app = require('../../src/api/express-app');

const validCustomerId = '603ae34e540e915345f00f2e';

const validProduct = {
  productId: 'bf0f365-fbdd-4e21-9786-da459d78dd1f',
};

describe('POST /customers/:customerId:/favorite-products', () => {
  describe('given I try to add a new favorite product to the customer with a valid payload', () => {
    it('should return 201 status code and an ID in body', async () => {
      const result = await supertest(app)
        .post(`/customers/${validCustomerId}/favorite-products`)
        .send(validProduct);

      expect(result.status).toEqual(200);
    });
  });
});
