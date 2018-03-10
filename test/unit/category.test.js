'use strict';

const {app, expect} = require('../common');

const Category = app.models.Category;
const Product = app.models.Product;

describe('CATEGORY', function() {
  describe('Hooks', function() {
    it('should not allow deleting a category with products', function() {
      return Promise.resolve()
        .then(() => Category.create({ name: 'CategoryToBeDeleted'}))
        .then(cat => Product.create({ name: 'New Cat Product', price: 455, categoryId: cat.id }))
        .then(newCatProd => Category.destroyById(newCatProd.categoryId))
        .then(res => expect(res).to.equal(null))
        .catch(err => expect(err).to.equal('Error deleting category with products'));
    })
  });
});