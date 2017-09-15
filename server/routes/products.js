const router = require('express').Router();
const Product = require('../../db/models/products');
const db = require('../../db').db; 
const ProductCategories = db.models.product_categories; 
const Category = db.models.category;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then( products => res.json(products) )
    .catch(next);
}); 

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
}); 

/*
* Admin Functionality 
*/
//creates product
router.post('/', (req, res, next) => { 
	Product.create(req.body)
	.then(product => res.json(product)); 
}); 

//updates product
router.put('/:productId', (req, res, next) => {
	console.log("in update product back end", req.body); 
	Product.update(
		req.body, 
		{ where: { id: req.params.productId}}
	).then(succ => { res.json(succ) }); 
}); 

//creates category
router.post('/category', (req, res, next) => {
	Category.create(req.body)
	.then(category => res.json(category))
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
}); 




module.exports = router;
