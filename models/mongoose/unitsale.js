var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UnitSaleSchema = new Schema({
  name: String,
  sku: Number,
  price: Number,
  category: String

}, {
  timestamps: true
});

// Create the model with a defined schema
var UnitSale = mongoose.model('UnitSale', UnitSaleSchema);

module.exports = UnitSale;