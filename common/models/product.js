'use strict';

module.exports = function(Product) {

  // REMOTE METHODS ARE PROTOTYPE METHODS

  /**
   * Buy this product
   * @param {number} quantity Number of products to buy
   * @param {Function(Error, object)} callback
   */
  Product.prototype.buy = function(quantity, callback) {
    if (quantity <= 0) {
      return callback(`Invalid quantity ${quantity}`);
    }

    const result = {
      status: `You bought ${quantity} product(s)`,
      code: 200,
      quantity,
    };

    callback(null, result);
  };

  // VALIDATORS ARE STATIC METHODS
  // 1. Built-in methods
  Product.validatesLengthOf('name', {
    min: 3,
    // Allows to override the default message
    message: {
      min: 'Name should be at least 3 characters',
    },
  });
  Product.validatesUniquenessOf('name');

  const positiveInteger = /^[0-9]*$/;

  const validatePositiveInteger = function(err) {
    if (!positiveInteger.test(this.price)) {
      // Represents the validation error code.
      // If passed, the whole message below isn't sent!
      // Useful when localization is needed
      // err('int.positive');
      err();
    }
  };

  // 2. Custom-Sync validator
  Product.validate('price', validatePositiveInteger, {
    message: 'Price should be a positive number.',
  });

  function validateMinimalPrice(err, done) {
    const price = this.price;
    setTimeout(() => {
      const minimalPriceFromDB = 99;
      if (price < minimalPriceFromDB) {
        err();
      }
      done();
    }, 1000);
  }

  Product.validateAsync('price', validateMinimalPrice, {
    message: 'Price should be higher than the minimal price in the DB',
  });
};
