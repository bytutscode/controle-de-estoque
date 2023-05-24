const sequelize = require('../instance/mysql');
const { Model } = require('sequelize');

class Historic extends Model{};


Historic.init({
    id:{primaryKey:true, autoIncrement:true, type:Number},
    user_id:Number,
    user_name:String,
    action:String
},{sequelize, tableName:'historic',timestamps:false});


module.exports = Historic;