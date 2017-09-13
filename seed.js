const { db, Product } = require('./db');

const products = [
	{ title: 'Multiflavor Popsicle', description: 'A flavorful delightful popsicle', price: 2.00, imageName: '001-ice-cream-24.png', inventory: 50, createdAt: Date.now(), updatedAt: Date.now() },
	{ title: 'Soft-Serve Vanilla Cone', description: 'A tasty light cone for a summer day', price: 1.50, imageName: '001-ice-cream-23.png', inventory: 80, createdAt: Date.now(), updatedAt: Date.now() },
	{ title: 'Redonkalous Rasperry Cone', description: 'Enjoy at your own risk', price: 2.50, imageName: '001-ice-cream-22.png', inventory: 30, createdAt: Date.now(), updatedAt: Date.now() }
]

const seed = () => {
	// OB/CJP: problems "curly braces", "array of arrays", "return something"
	var promise1 = products.map(product => { Product.create(product) });
	Promise.all([promise1]);
}

const main = () => {
	console.log('Syncing db...');
	db.sync({force: true})
		.then(() => {
			console.log('Seeding database...');
			return seed();
		}).catch(err => {
			console.log('Error while seeding');
			console.log(err.stack);
		}).then(() => {
			return null;
		});
}

main();
