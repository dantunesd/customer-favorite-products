class Customers {
  constructor(client) {
    this.client = client;
  }

  async create(customerData) {
    await this.client.connect();

    const collection = this.client
      .db('customerFavoriteProductsDB')
      .collection('customersFavoriteProducts');

    const res = await collection.insertOne(customerData);

    // eslint-disable-next-line no-console
    console.log(res);
  }
}

module.exports = Customers;
