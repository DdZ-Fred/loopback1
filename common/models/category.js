'use strict';

module.exports = function(Category) {
  // OPERATION HOOKS
  // See: https://loopback.io/doc/en/lb3/Operation-hooks.html
  Category.observe('before delete', function(ctx) {
    return Category.app.models.Product
      .count({ categoryId: ctx.where.id })
      .then(res => {
        if (res > 0) {
          return Promise.reject('Error deleting category with products');
        }
      });
  });
};
