'use strict';

const {app, expect} = require('../common');

const Product = app.models.Product;

describe('PRODUCT', function() {
  describe('It should resolve', function() {
    it('a Product.find', function() {
      return Product
        .find()
        .then(res => console.log(res));
    });
  });


  // CUSTOM METHODS
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

  // VALIDATION
  describe('Validation', function() {
    it('should reject a name < 3 characters', function() {
      return Product.create({name: 'po', price: 299})
        .then(res => Promise.reject('Product should not be created'))
        .catch(err => {
           expect(err.message).to.contain('Name should be at least 3 characters');
          expect(err.statusCode).to.be.equal(422);
        });
    });

    it('should reject a duplicate name', function() {
      return Promise.resolve()
        .then(() => Product.create({ name: 'el gato', price: 255 }))
        .then(() => Product.create({ name: 'el gato', price: 464 }))
        .then(res => Promise.reject('Product should not be created'))
        .catch(err => {
          expect(err.message).to.contain('Details: `name` is not unique');
          expect(err.statusCode).to.be.equal(422);
        });
    });

    it('should reject a price < 0', function() {
      return Product.create({ name: 'blabla', price: -4})
        .then(res => Promise.reject('Product should not be created'))
        .catch(err => {
          expect(err.message).to.contain('Price should be a positive number.');
          expect(err.statusCode).to.be.equal(422);
        });
    });

    it('should reject a price below the minimum 99', function() {
      return Product.create({ name: 'Bapo', price: 67 })
        .then(res => Promise.reject('Product should not be created'))
        .catch(err => {
          expect(err.message).to.contain('Price should be higher than the minimal price in the DB');
          expect(err.statusCode).to.be.equal(422);
        });
    });


    it('should store a correct product', function() {
      return Product.create({ name: 'Correct product', price: 200 })
        .then(res => {
          expect(res.name).to.be.equal('Correct product');
          expect(res.price).to.be.equal(200);
        });
    });
  });


  // OPERATION HOOKS
  describe('Hooks', function() {
    it('should not allow adding a product to non-existing category', function() {
      return Product.create({ name: 'New Category product', price: 345, categoryId: 999})
        .then(res => expect(res).to.equal(null))
        .catch(err => expect(err).to.equal('Error adding product to non-existing category'));
    });
  });
});
