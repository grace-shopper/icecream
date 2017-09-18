const { db, Product, User, Order } = require('./db');
const OrderProducts = db.models.order_products; 
const UserOrders = db.models.user_orders; 

const products = [
	{title: 'Multiflavor Popsicle',description: 'A flavorful delightful popsicle',price: 2.00, imageName: '001-ice-cream-24.png',inventory: 50, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Soft-Serve Vanilla Cone',description: 'A tasty light cone for a summer day',price: 1.50, imageName: '002-ice-cream-23.png',inventory: 80, createdAt: Date.now(), updatedAt: Date.now()},
	{title: 'Redonkalous Rasperry Cone',description: 'Enjoy at your own risk',price: 2.50,inventory: 30, createdAt: Date.now(),updatedAt: Date.now()}
]

const users = [
	{email: 'pat@pat.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()}, 
	{email: 'gary@snail.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()}, 
	{email: 'harry@potter.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()}, 
	{email: 'gracey@hopper.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()}, 
	{email: 'patrick@start.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()}
]

const orders = [
	{purchasedAt:Date.now(), status:'In Cart', createdAt:Date.now(), updatedAt:Date.now(), userId:1}, 
	{purchasedAt:Date.now(), status:'Pending', createdAt:Date.now(), updatedAt:Date.now(), userId:1}, 
	{purchasedAt:Date.now(), status:'In Cart', createdAt:Date.now(), updatedAt:Date.now(), userId:2}, 
	{purchasedAt:Date.now(), status:'Pending', createdAt:Date.now(), updatedAt:Date.now(), userId:2}, 
	{purchasedAt:Date.now(), status:'In Cart', createdAt:Date.now(), updatedAt:Date.now(), userId:3}, 
	{purchasedAt:Date.now(), status:'Pending', createdAt:Date.now(), updatedAt:Date.now(), userId:3}, 
	{purchasedAt:Date.now(), status:'In Cart', createdAt:Date.now(), updatedAt:Date.now(), userId:4}, 
	{purchasedAt:Date.now(), status:'Pending', createdAt:Date.now(), updatedAt:Date.now(), userId:4}, 
	{purchasedAt:Date.now(), status:'In Cart', createdAt:Date.now(), updatedAt:Date.now(), userId:5}, 
	{purchasedAt:Date.now(), status:'Pending', createdAt:Date.now(), updatedAt:Date.now(), userId:5}, 
]; 

const order_products = [
	{orderId:1, productId:1, originalPrice:2, quantity:2, createdAt:Date.now(), updatedAt:Date.now()},
	{orderId:1, productId:2, originalPrice:1.00, quantity:1, createdAt:Date.now(), updatedAt:Date.now()},
	{orderId:1, productId:3, originalPrice:2.00, quantity:2, createdAt:Date.now(), updatedAt:Date.now()}, 
	{orderId:2, productId:2, originalPrice:2.00, quantity:3, createdAt:Date.now(), updatedAt:Date.now()},
	{orderId:2, productId:1, originalPrice:2.00, quantity:1, createdAt:Date.now(), updatedAt:Date.now()},
	{orderId:2, productId:3, originalPrice:2.00, quantity:1, createdAt:Date.now(), updatedAt:Date.now()}
]

const user_orders = [
	{userId:1, orderId:1, createdAt:Date.now(), updatedAt:Date.now()}, 
	{userId:1, orderId:2, createdAt:Date.now(), updatedAt:Date.now()}
]

const seed = () => {
	var allProducts = products.map(product => { Product.create(product) });
	var allUsers = users.map(user => { User.create(user)});
	return Promise.all(allProducts.concat(allUsers))
					.then(() => {
						return Order.bulkCreate(orders); 
					}).then(() => {
						return OrderProducts.bulkCreate(order_products); 
					}).then(() => {
						return UserOrders.bulkCreate(user_orders); 
					})
						

}

const main = () => {
	console.log('Syncing db...');
	db.sync({ force: true })
		.then(() => {
			console.log('Seeding database...');
			return seed();
		}).catch(err => {
			console.log('Error while seeding');
			console.log(err.stack);
		}).then(() => {
			console.log("Done seeding"); 
			db.close(); 
			return null;
		});
}

main();
