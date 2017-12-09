var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
  items: [{
    name: String,
    price: Number,
    category: String,
    sku: Number,
    quantity: Number
  }],
  stripeToken: String,
  revenue: Number,
  state: String,
  email: String,
  fname: String,
  lname: String,
  city: String,
  street: String
}, {
  timestamps: true
});

// Create the model with a defined schema
var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;