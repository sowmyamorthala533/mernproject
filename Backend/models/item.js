
// models/item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  url:String,
  price:String,
  ItemType:String,
  Item:String,
  Date:String,
  Location:String,
  seller:String,
  Name:String,
  ph_no:String,
  description:String,
  dimensions:String,
  finish:String,
  material:String,
  seating_capacity:String,
  warranty:String

}, { timestamps: true });

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;

