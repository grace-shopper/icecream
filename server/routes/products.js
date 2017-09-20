const router = require('express').Router();
const Product = require('../../db/models/products');
const db = require('../../db').db;
const ProductCategories = db.models.product_categories;
const OrderProducts = db.models.order_products;
const Category = db.models.category;

router.get('/available', (req, res, next) => {
	Product.findAll({
		where: {
			inventory: {
				$gt: 0
			}
		}
	})
	.then( products => res.json(products) )
	.catch(next)
})

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
		.then(product => res.json(product))
		.catch(next)
});

/*
* Admin Functionality
*/
//creates product
router.post('/', (req, res, next) => {
	Product.create(req.body)
	.then(product => res.json(product))
	.catch(next)
});

//updates product
router.put('/:productId', (req, res, next) => {
	Product.update(
		req.body,
		{ where: { id: req.params.productId}}
	).then(succ => { res.json(succ) })
	.catch(next)
});

//creates category
router.post('/category', (req, res, next) => {
	Category.create(req.body)
	.then(category => res.json(category))
	.catch(next)
})

//creates a new association in product_categories given a category name
router.post('/add-category/:productId', (req, res, next) => {
	Category.find({
		where: {
			name : req.body.name
		}
	}).then(category => {
		ProductCategories.create({
			productId : req.params.productId,
			categoryId : category.id
		}).then(prodCat => res.json(prodCat))
	})
	.catch(next)
});

//deletes an association in product_categories given a category name
router.post('/remove-category/:productId', (req, res, next) => {
	Category.find({
		where: {
			name : req.body.name
		}
	}).then(category => {
		ProductCategories.destroy({
			where: {
				categoryId : category.id
			}
		}).then(succ => res.json(succ))
	})
	.catch(next)
});

module.exports = router;
