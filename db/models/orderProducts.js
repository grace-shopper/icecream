const Sequelize = require('sequelize');

const db = require('../_db');

const orderProducts = db.define('order_products', {
	originalPrice: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
}, {
	getterMethods: {
    originalPrice: function() {
      return parseFloat(this.getDataValue('originalPrice') / 100).toFixed(2)
    }
  },
  setterMethods: {
    originalPrice: function(value) {
      this.setDataValue('originalPrice', value * 100)
    }
  },
	// hooks: {
	// 	afterBulkCreate: function (inst) {
  //     const Order = db.model('order');
  //     Order.findById(inst.orderId)
  //     .then(order => {
  //       console.log('orderId', order.id)
  //       console.log('order', order)
  //       order.update({
  //         quantity: order.getNumProducts()
  //       })
  //     })
  //   },
  //   afterBulkUpdate: function (inst) {
	// 		const Order = db.model('order');
  //     Order.findById(inst.orderId)
  //     .then(order => {
  //       order.update({
  //         quantity: order.getNumProducts()
  //       })
  //     })
  //   },
	// }
});

module.exports = orderProducts;
