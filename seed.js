

const { db, Product, User, Order, Category,Review } = require('./db');

const OrderProducts = db.models.order_products; 
const UserOrders = db.models.user_orders; 
const ProductCategories = db.models.product_categories; 
const ProductReviews = db.models.product_reviews;



const products = [
	{title: 'Multiflavor Popsicle',description: 'A flavorful delightful popsicle',price: 2.00, imageName: '001-ice-cream-24.png',inventory: 50, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Soft-Serve Vanilla Cone',description: 'A tasty light cone for a summer day',price: 1.50, imageName: '002-ice-cream-23.png',inventory: 80, createdAt: Date.now(), updatedAt: Date.now()},
	{title: 'Redonkalous Rasperry Cone',description: 'Enjoy at your own risk',price: 2.50, imageName: '003-ice-cream-22.png',inventory: 30, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Vanilla Lime Popsicle',description: 'If you want to try new things!',price: 2.00, imageName: '004-ice-cream-21.png',inventory: 20, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Vanilla Bar',description: 'Feel the enthusiasm of the tropics',price: 2.00, imageName: '005-ice-cream-20.png',inventory: 20, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Chocolate Bar',description: 'Just a chocolate bar',price: 2.00, imageName: '006-ice-cream-19.png',inventory: 50, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Ocean Heart Popsicle',description: 'Blueberry taste',price: 1.50, imageName: '007-ice-cream-18.png',inventory: 80, createdAt: Date.now(), updatedAt: Date.now()},
	{title: 'Rasperry Cone',description: 'Everyone love it!',price: 2.00, imageName: '008-ice-cream-17.png',inventory: 20, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Frozen Honey Bar',description: 'It\'s really round',price: 3.00, imageName: '009-ice-cream-16.png',inventory: 42, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Double-flavor Bar',description: 'chocolate and vanilla',price: 1.50, imageName: '010-ice-cream-15.png',inventory: 20, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Double-flavor Cup',description: 'Lime and blueberry',price: 2.00, imageName: '011-ice-cream-14.png',inventory: 20, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Guava Bar',description: 'Great for sharing!',price: 2.50, imageName: '012-ice-cream-13.png',inventory: 1, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Rasperry Popsicle',description: 'A outlook delightful popsicle',price: 2.00, imageName: '013-ice-cream-12.png',inventory: 50, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Rasperry Bar',description: 'A sweet bar',price: 1.50, imageName: '014-ice-cream-11.png',inventory: 80, createdAt: Date.now(), updatedAt: Date.now()},
	{title: 'Triple-flavor Cup',description: 'chocolate, vanilla, Rasperry',price: 4.50, imageName: '015-ice-cream-10.png',inventory: 30, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Triple-flavor Cone',description: 'So high',price: 5.00, imageName: '017-ice-cream-8.png',inventory: 5, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Fork Bar',description: 'Vanilla covered by chocolate',price: 2.00, imageName: '018-ice-cream-7.png',inventory: 20, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Lime Cone',description: 'Has a strong lime flavor',price: 1.75, imageName: '020-ice-cream-5.png',inventory: 10, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Twist Popsicle',description: 'Blueberry loves vanilla',price: 2.00, imageName: '021-ice-cream-4.png',inventory: 50, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Water Popsicle',description: 'Go simple',price: 1.00, imageName: '022-ice-cream-3.png',inventory: 80, createdAt: Date.now(), updatedAt: Date.now()},
	{title: 'Festival Popsicle',description: 'Let us celebration',price: 2.00, imageName: '023-ice-cream-2.png',inventory: 90, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Triangle Popsicle',description: 'Just a slice',price: 3.00, imageName: '024-ice-cream-1.png',inventory: 42, createdAt: Date.now(),updatedAt: Date.now()},
	{title: 'Lime Cup',description: 'Has a strong lime flavor',price: 1.75, imageName: '025-ice-cream.png',inventory: 10, createdAt: Date.now(),updatedAt: Date.now()}
	
]

const users = [
	{email: 'pat@pat.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now(), isAdmin:true},
	{email: 'gary@snail.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()},
	{email: 'harry@potter.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()},
	{email: 'gracey@hopper.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()},
	{email: 'patrick@start.com', password:'f4b1eec6c6700777fb4eab793bb1f95b178932cc', salt:'JcyzW0tg+XDV4Xe0+a5UTg==', createdAt:Date.now(), updatedAt:Date.now()}
]

const orders = [
	{purchasedAt:Date.now(), status:'In Cart', createdAt:Date.now(), updatedAt:Date.now(), userId:1},
	{purchasedAt:Date.now(), status:'Created', createdAt:Date.now(), updatedAt:Date.now(), userId:1},
	{purchasedAt:Date.now(), status:'Processing', createdAt:Date.now(), updatedAt:Date.now(), userId:1},
	{purchasedAt:Date.now(), status:'Cancelled', createdAt:Date.now(), updatedAt:Date.now(), userId:1},
	{purchasedAt:Date.now(), status:'Completed', createdAt:Date.now(), updatedAt:Date.now(), userId:1},
	{purchasedAt:Date.now(), status:'In Cart', createdAt:Date.now(), updatedAt:Date.now(), userId:2},
	{purchasedAt:Date.now(), status:'Created', createdAt:Date.now(), updatedAt:Date.now(), userId:2},
	{purchasedAt:Date.now(), status:'Processing', createdAt:Date.now(), updatedAt:Date.now(), userId:2},
	{purchasedAt:Date.now(), status:'Cancelled', createdAt:Date.now(), updatedAt:Date.now(), userId:2},
	{purchasedAt:Date.now(), status:'Completed', createdAt:Date.now(), updatedAt:Date.now(), userId:2},
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

const categories = [
	{name:'Cone', createdAt:Date.now(), updatedAt:Date.now()}, 
	{name:'Cup', createdAt:Date.now(), updatedAt:Date.now()},
	{name:'Popsicle', createdAt:Date.now(), updatedAt:Date.now()},
	{name:'Bar', createdAt:Date.now(), updatedAt:Date.now()},
	{name:'Vanilla', createdAt:Date.now(), updatedAt:Date.now()},
	{name:'Rasperry', createdAt:Date.now(), updatedAt:Date.now()},
	{name:'Chocolate', createdAt:Date.now(), updatedAt:Date.now()},
	{name:'Blueberry', createdAt:Date.now(), updatedAt:Date.now()},
	{name:'Lime', createdAt:Date.now(), updatedAt:Date.now()}
]
const product_categories = [
	{categoryId:1, productId:2, createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:1, productId:3,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:1, productId:8,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:1, productId:16,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:1, productId:18,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:2, productId:11,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:2, productId:15,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:2, productId:23,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:3, productId:1,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:3, productId:4,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:3, productId:7,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:3, productId:13,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:3, productId:19,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:3, productId:20,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:3, productId:21,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:3, productId:22,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:4, productId:5,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:4, productId:6,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:4, productId:9,  createdAt:Date.now(), updatedAt:Date.now()}, 
	{categoryId:4, productId:10, createdAt:Date.now(), updatedAt:Date.now()}, 
	{categoryId:4, productId:12, createdAt:Date.now(), updatedAt:Date.now()}, 
	{categoryId:4, productId:14, createdAt:Date.now(), updatedAt:Date.now()}, 
	{categoryId:4, productId:17,  createdAt:Date.now(), updatedAt:Date.now()}, 
	{categoryId:5, productId:2,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:5, productId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:5, productId:5, createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:5, productId:10,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:5, productId:15,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:5, productId:17,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:5, productId:19,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:6, productId:3,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:6, productId:8,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:6, productId:13,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:6, productId:14,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:6, productId:15,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:7, productId:6,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:7, productId:10,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:7, productId:15,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:7, productId:17,  createdAt:Date.now(), updatedAt:Date.now()},   
	{categoryId:8, productId:7,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:8, productId:11,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:8, productId:19,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:9, productId:4,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:9, productId:11,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:9, productId:18,  createdAt:Date.now(), updatedAt:Date.now()},
	{categoryId:9, productId:23,  createdAt:Date.now(), updatedAt:Date.now()}
]

const reviews = [
	{content: 'Awsome!!!!! ', rating:5, productId:2, userId:2,  createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Amazing~~~~~', rating:4, productId:2, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it!!!', rating:5, productId:2, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Don\'t try', rating:0, productId:3, userId:2, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Fine.....', rating:2, productId:3, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'good good', rating:3, productId:3, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it!!!', rating:1,productId:1, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it!!!', rating:1,productId:4, userId:2, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it!!!!', rating:1,productId:5, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it!!!', rating:1,productId:6, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Awsome~~~~~', rating:5, productId:7, userId:2,  createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Amazing!!!!', rating:4, productId:7, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it!!!!', rating:5, productId:8, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Don\'t try! ', rating:0, productId:8, userId:2, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Fine.....', rating:2, productId:9, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'good', rating:3, productId:9, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it!!!!', rating:1,productId:9, userId:2, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Awsome!!!!!', rating:5, productId:10, userId:2,  createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Amazing!!!!', rating:4, productId:11, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it~~~~~', rating:5, productId:12, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Don\'t try', rating:0, productId:13, userId:2, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Fine, not bad', rating:2, productId:14, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'good, not bad', rating:3, productId:15, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Awsome!!!!!', rating:5, productId:16, userId:2,  createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Amazing!!!!', rating:4, productId:17, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Love it!!!!', rating:5, productId:18, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Don\'t try', rating:0, productId:19, userId:2, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Amazing!!!!', rating:2, productId:20, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Amazing!!!!', rating:3, productId:21, userId:3, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Don\'t try', rating:0, productId:22, userId:2, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Amazing!!!!', rating:2, productId:23, userId:4, createdAt:Date.now(), updatedAt:Date.now()},
	{content: 'Amazing!!!!', rating:3, productId:23, userId:3, createdAt:Date.now(), updatedAt:Date.now()}

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
					}).then(() => {
						return Category.bulkCreate(categories);
					}) .then(() => {
						return ProductCategories.bulkCreate(product_categories);
					}) .then(() => {
						return Review.bulkCreate(reviews);
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
