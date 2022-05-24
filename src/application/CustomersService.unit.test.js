const CustomerEntity = require('../domain/CustomerEntity');
const CustomersService = require('./CustomersService');

const customersRepositoryMock = {
  create: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
  updateById: jest.fn(),
};

const customerToSave = new CustomerEntity(null, 'name', 'email');
const customerToUpdate = new CustomerEntity('toUpdate', 'name', 'email');
const customerFromDb = new CustomerEntity('objectId', 'name', 'email');

const customersService = new CustomersService(customersRepositoryMock);

describe('createCustomer test case', () => {
  describe('given I receive a valid customer data', () => {
    customersRepositoryMock.create.mockResolvedValueOnce({
      _id: 'objectId',
    });

    it('should save customer with success', async () => {
      await expect(
        customersService.createCustomer(customerToSave),
      ).resolves.toEqual({
        _id: 'objectId',
      });
    });

    it('should call create with params', async () => {
      expect(customersRepositoryMock.create).toHaveBeenLastCalledWith(
        customerToSave,
      );
    });
  });
});

describe('getCustomer test case', () => {
  describe('given I receive a valid customer', () => {
    customersRepositoryMock.getById.mockResolvedValueOnce(customerFromDb);

    it('should return the customer with success', async () => {
      await expect(customersService.getCustomer(1)).resolves.toEqual(
        customerFromDb,
      );
    });

    it('should call gerById with params', async () => {
      expect(customersRepositoryMock.getById).toHaveBeenLastCalledWith(1);
    });
  });
});

describe('deleteCustomer test case', () => {
  describe('given I receive a valid customer', () => {
    customersRepositoryMock.deleteById.mockResolvedValueOnce();

    it('should delete the customer with success', async () => {
      await expect(customersService.deleteCustomer(1)).resolves.toBeUndefined();
    });

    it('should call deleteById with params', async () => {
      expect(customersRepositoryMock.deleteById).toHaveBeenLastCalledWith(1);
    });
  });
});

describe('updateCustomer test case', () => {
  describe('given I receive a valid customerId and data', () => {
    customersRepositoryMock.updateById.mockResolvedValueOnce();

    it('should update customer with success', async () => {
      await expect(
        customersService.updateCustomer(customerToUpdate),
      ).resolves.toBeUndefined();
    });

    it('should call updateById with params', async () => {
      expect(customersRepositoryMock.updateById).toHaveBeenLastCalledWith(
        customerToUpdate,
      );
    });
  });
});
