
// models/item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  url: String,
  price: String,
  ItemType: String,
  Item: String,
  Date: String,
  Location: String,
  seller: String,
  Name: String,
  ph_no: Number,
  description: {
    material: String,
    dimensions: String,
    seating_capacity: String,
    finish: String,
    warranty: String
  }
}, { timestamps: true });

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;

