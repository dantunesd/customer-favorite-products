const supertest = require('supertest');

const app = require('../../src/presentation/express-app');

// eslint-disable-next-line prettier/prettier
const jtwToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1kZXZlbG9wbWVudC1pc3N1ZXIiLCJhdWQiOiJteS1kZXZlbG9wbWVudC1hdWRpZW5jZSJ9.g7Rm3Ju3bdyMf-GGwCBohaRSisEUSy2b9vmSFxxqZZc';

const validCustomer = () => ({
  email: `${new Date().getTime()}@email.com`,
  name: 'name lastname',
});

const customerToGet = '60414460d8e584861539454d';
const customerToUpdate = '603ae34e540e915345f00f2f';
const customerToDelete = '603ae34e540e915345f00f2c';

const existingCustomer = {
  email: 'existing@email.com',
  name: 'existing name',
};

const invalidCustomer = {
  missingEmail: '',
  name: 'name',
};

describe('Customers Test Suite', () => {
  describe('POST /customers', () => {
    describe('given I try to create a new customer with a valid payload', () => {
      it('should return 201 status code and an ID in body', async () => {
        const result = await supertest(app)
          .post('/customers/')
          .send(validCustomer())
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(201);
        expect(result.body).toHaveProperty('customerId');
      });
    });

    describe('given I try to create a new customer with an email already registered', () => {
      it('should return 422 status code and the error', async () => {
        const result = await supertest(app)
          .post('/customers/')
          .send(existingCustomer)
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(422);
        expect(result.body).toEqual({
          status: 422,
          title: 'This email is already registered',
          type: 'https://httpstatuses.com/422',
        });
      });
    });

    describe('given I try to create a new customer with an invalid payload', () => {
      it('should return 400 status code and the error', async () => {
        const result = await supertest(app)
          .post('/customers/')
          .send(invalidCustomer)
          .set('Authorization', jtwToken);

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
          .get(`/customers/${customerToGet}/`)
          .send()
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
          id: customerToGet,
          email: 'existing@email.com',
          name: 'existing name',
        });
      });
    });

    describe('given I try to retrieve an inexisting customer', () => {
      it('should return 404 status code and the error', async () => {
        const result = await supertest(app)
          .get('/customers/inexistenttt/')
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

    describe('given I try to retrieve a customer with an invalid id', () => {
      it('should return 400 status code and the error', async () => {
        const result = await supertest(app)
          .get('/customers/invalid/')
          .send()
          .set('Authorization', jtwToken);

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
      it('should return 204 status code', async () => {
        const result = await supertest(app)
          .put(`/customers/${customerToUpdate}`)
          .send(validCustomer())
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(204);
      });
    });

    describe('given I try to update an inexistent customer with a valid payload', () => {
      it('should return 404 status code and the error', async () => {
        const result = await supertest(app)
          .put('/customers/inexistenttt')
          .send(validCustomer())
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(404);
        expect(result.body).toEqual({
          status: 404,
          title: 'Customer Not Found',
          type: 'https://httpstatuses.com/404',
        });
      });
    });

    describe('given I try to update an existent customer with an email already registered', () => {
      it('should return 422 status code and the error', async () => {
        const result = await supertest(app)
          .put(`/customers/${customerToUpdate}`)
          .send(existingCustomer)
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(422);
        expect(result.body).toEqual({
          status: 422,
          title: 'This email is already registered',
          type: 'https://httpstatuses.com/422',
        });
      });
    });

    describe('given I try to update a customer with an invalid payload', () => {
      it('should return 400 status code and the error', async () => {
        const result = await supertest(app)
          .put(`/customers/${customerToUpdate}`)
          .send(invalidCustomer)
          .set('Authorization', jtwToken);

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
          .send(validCustomer())
          .set('Authorization', jtwToken);

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
      it('should return 204 status code', async () => {
        const result = await supertest(app)
          .delete(`/customers/${customerToDelete}/`)
          .send()
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(204);
      });
    });

    describe('given I try to delete an inexisting customer', () => {
      it('should return 404 status code and the error', async () => {
        const result = await supertest(app)
          .delete('/customers/inexistenttt/')
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

    describe('given I try to delete a customer with invalid id', () => {
      it('should return 400 status code and the error', async () => {
        const result = await supertest(app)
          .delete('/customers/invalid/')
          .send()
          .set('Authorization', jtwToken);

        expect(result.status).toEqual(400);
        expect(result.body).toEqual({
          status: 400,
          title: 'The customerId is invalid',
          type: 'https://httpstatuses.com/400',
        });
      });
    });
  });
});
