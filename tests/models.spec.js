'use strict';

const Promise = require('bluebird');
const expect = require('chai').expect;
const {db} = require('../db');
const Product = require('../db/models/products');

/**
 *
 * Start here!
 *
 * These tests describe the model that you'll be writing in models/article.js
 *
 */

describe('The `Product` model', function () {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */
  before(function () {
    return db.sync({force: true});
  });

  /**
   * Next, we create an (un-saved!) article instance before every spec
   */

  let product = {};
  beforeEach(function(){
    product = Product.build({
      title: 'Cookies and Cream',
      description: 'yummy',
      price: 10,
      inventory: 10
    });
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      Product.truncate({ cascade: true })
    ]);
  });

  describe('attributes definition', function(){

    /**
     * Your model should have two fields (both required): `title` and `content`.
     *
     * http://sequelize.readthedocs.io/en/v3/docs/models-definition/
     */
    it('includes `title`, `description`, `price`, `image`, `inventory` fields', function () {

      return product.save()
      .then(savedProduct => {
        expect(savedProduct.title).to.equal('Cookies and Cream');
        expect(savedProduct.description).to.equal('yummy');
        expect(savedProduct.price).to.equal('10.00');
        expect(savedProduct.inventory).to.equal(10);
        expect(savedProduct.imageName).to.equal('default_product_image.png')
      });

    });

    it('requires `title`', function () {

      product.title = null;

      return product.validate()
      .then(function () {
        throw new Error('validation should fail when title is null');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });

    });

  });

});
