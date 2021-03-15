const supertest = require('supertest');

const app = require('../../src/presentation/express-app');

// eslint-disable-next-line prettier/prettier
const jtwToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSJ9.g7Rm3Ju3bdyMf-GGwCBohaRSisEUSy2b9vmSFxxqZZc';

const customerToAdd = '603eaa775d7e15717d65430d';
const customerToGet = '603ead3f711f9ad8a8686b8b';
const customerToDelete = '603eafafb9935c2e72b98ce8';

const validProduct = {
  productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
};

const otherValidProduct = {
  productId: '958ec015-cfcf-258d-c6df-1721de0ab6ea',
};

const invalidProduct = {
  invalid: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
};

const inexistentProduct = {
  productId: '1bf0f365-fbdd-4e21-1234-da459d78dd1f',
};

describe('Favorite Products Test Suite', () => {
  describe('POST /customers/:customerId:/favorite-products', () => {
    describe('given I try to add a product to an existing customer', () => {
      it('should return 204 status code', async () => {
        const result = await supertest(app)
          .post(`/customers/${customerToAdd}/favorite-products`)
          .send(validProduct)
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(204);
      });
    });

    describe('given I try to add a diferent product to customer', () => {
      it('should return 204 status code', async () => {
        const result = await supertest(app)
          .post(`/customers/${customerToAdd}/favorite-products`)
          .send(otherValidProduct)
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(204);
      });
    });

    describe('given I try to add the same product to customer', () => {
      it('should return 422 status code and the error', async () => {
        const result = await supertest(app)
          .post(`/customers/${customerToAdd}/favorite-products`)
          .send(validProduct)
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(422);
        expect(result.body).toEqual({
          status: 422,
          title: 'This product is already registered',
          type: 'https://httpstatuses.com/422',
        });
      });
    });

    describe('given I try to add a product with a invalid payload', () => {
      it('should return 400 status code and the error', async () => {
        const result = await supertest(app)
          .post(`/customers/${customerToAdd}/favorite-products`)
          .send(invalidProduct)
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(400);
        expect(result.body).toEqual({
          status: 400,
          title:
            "data should have required property 'productId', data should NOT have additional properties",
          type: 'https://httpstatuses.com/400',
        });
      });
    });

    describe('given I try to add an inexistent product to customer', () => {
      it('should return 422 status code and the error', async () => {
        const result = await supertest(app)
          .post(`/customers/${customerToAdd}/favorite-products`)
          .send(inexistentProduct)
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(422);
        expect(result.body).toEqual({
          type: 'https://httpstatuses.com/422',
          title: 'This product not exists',
          status: 422,
        });
      });
    });

    describe('given I try to add a product to an inexisting customer', () => {
      it('should return 404 status code and the error', async () => {
        const result = await supertest(app)
          .post('/customers/inexistenttt/favorite-products')
          .send(validProduct)
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(404);
        expect(result.body).toEqual({
          status: 404,
          title: 'Customer Not Found',
          type: 'https://httpstatuses.com/404',
        });
      });
    });
  });

  describe('GET /customers/:customerId:/favorite-products', () => {
    describe('given I try to retrieve the favorite products of an existing customer', () => {
      it('should return 200 status code and the content', async () => {
        const result = await supertest(app)
          .get(`/customers/${customerToGet}/favorite-products`)
          .send()
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
          favoriteProducts: [
            {
              price: 1.0,
              image: 'image',
              brand: 'brand',
              id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
              title: 'title',
            },
            {
              price: 1.0,
              image: 'image',
              brand: 'brand',
              id: '958ec015-cfcf-258d-c6df-1721de0ab6ea',
              title: 'title',
            },
          ],
        });
      });
    });

    describe('given I try to retrieve the favorite products of an inexisting customer', () => {
      it('should return 404 status code and the error', async () => {
        const result = await supertest(app)
          .get('/customers/inexistenttt/favorite-products')
          .send()
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(404);
        expect(result.body).toEqual({
          status: 404,
          title: 'Customer Not Found',
          type: 'https://httpstatuses.com/404',
        });
      });
    });
  });

  describe('DELETE /customers/:customerId:/favorite-products', () => {
    describe('given I try to delete a favorite product of an existing customer', () => {
      it('should return 204 status code', async () => {
        const result = await supertest(app)
          .delete(
            `/customers/${customerToDelete}/favorite-products/${validProduct.productId}`,
          )
          .send()
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(204);
      });
    });

    describe('given I try to delete a favorite product of an inexisting customer', () => {
      it('should return 404 status code and the error', async () => {
        const result = await supertest(app)
          .delete(
            `/customers/inexistenttt/favorite-products/${validProduct.productId}`,
          )
          .send()
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(404);
        expect(result.body).toEqual({
          status: 404,
          title: 'Customer Not Found',
          type: 'https://httpstatuses.com/404',
        });
      });
    });

    describe('given I try to delete a inexistent favorite product of an customer', () => {
      it('should return 404 status code and the error', async () => {
        const result = await supertest(app)
          .delete(
            `/customers/${customerToDelete}/favorite-products/inexistent-product`,
          )
          .send()
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(404);
        expect(result.body).toEqual({
          status: 404,
          title: 'ProductId Not Found',
          type: 'https://httpstatuses.com/404',
        });
      });
    });
  });
});
