const sequelize = require('../instance/mysql');
const {Model} = require('sequelize');

class Sales extends Model{};

Sales.init({
    id:{autoIncrement:true,primaryKey:true,type:Number},
    seller_id:Number,
    product_id:Number,
    product_name:String,
    product_price:Number,
    sold_quantity:Number,
    sold_price:Number,
    total:Number
},{sequelize,timestamps:false, tableName:'sales'});


module.exports = Sales;