const sequelize = require('../instance/mysql');
const { Model } = require('sequelize');

class Product extends Model{};


Product.init({
    id:{primaryKey: true, type:Number, autoIncrement: true},
    name:{type:String},
    category: {type: String},
    description:String,
    supplier_id: Number,
    price:Number,
    quantity:Number,
    min_quantity:Number,
    max_quantity:Number,
    reorder_quantity:Number,
    note:String,
    media:String
},{sequelize,tableName:'products',timestamps:false});


module.exports = Product;