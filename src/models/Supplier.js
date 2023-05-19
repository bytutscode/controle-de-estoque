const sequelize = require('../instance/mysql');
const { Model } = require('sequelize');

class Supplier extends Model {};


Supplier.init({
    id:{primaryKey:true,type:Number,autoIncrement:true},
    name:String,
    email:{defaultValue:'email não definido!', type:String},
    phone:{defaultValue:'telefone não definido!',type: String},
    unique_products:{defaultValue:0, type:Number},
    total_products:{defaultValue:0, type:Number},
    delivery_time:{defaultValue:'Não definido', type:String},
    note:{type:String, defaultValue:'Sem notas definidas!'}
},{
    sequelize,modelName:'suppliers',timestamps:false
});

module.exports = Supplier;