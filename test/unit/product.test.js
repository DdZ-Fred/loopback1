'use strict';

const {app, expect} = require('../common');

const Product = app.models.Product;

describe('It should resolve', function() {
  it('a Product.find', function() {
    return Product
      .find()
      .then(res => console.log(res));
  });
});

describe('Custom methods', function() {
  it('should allow buying a product', function() {
    const product = new Product({name: 'My New Prod', price: 299});
    return product.buy(10, function(err, res) {
      expect(res.status).to.contain('You bought 10 product(s)');
    });
  });

  it('should not allow buying a negative product quantity', function() {
    const product = new Product({name: 'My new Prod', price: 299});
    return product.buy(-3, function(err, res) {
      expect(err).to.contain('Invalid quantity -3');
    });
  });
});

describe('Validation', function() {
  it('should reject a name < 3 characters', function() {
    return Product.create({name: 'po', price: 299})
      .then(res => Promise.reject('Product should not be created'))
      .catch(err => {
        expect(err.message).to.contain('Name should be at least 3 characters');
      });
  });
});
