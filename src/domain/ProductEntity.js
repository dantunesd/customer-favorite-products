class ProductEntity {
  constructor(id, price, title, image, reviewScore) {
    this.id = id;
    this.price = price;
    this.title = title;
    this.image = image;
    this.reviewScore = reviewScore;
  }

  getId() {
    return this.id;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.title;
  }

  getImage() {
    return this.image;
  }

  getReviewScore() {
    return this.reviewScore;
  }
}

module.exports = ProductEntity;
