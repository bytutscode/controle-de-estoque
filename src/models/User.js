const sequelize = require('../instance/mysql');
const {Model} = require('sequelize');


class User extends Model{};

User.init({
    id:{primaryKey:true, type: Number, autoIncrement:true },
    name:String,
    position: String
},{
    sequelize, modelName:'User',timestamps:false
});


module.exports = User;