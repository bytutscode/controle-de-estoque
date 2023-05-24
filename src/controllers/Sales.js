const Product = require('../models/Product');
const User = require('../models/User');
const Historic = require('../models/Historic');

module.exports = {

    sell: async (req, res)=>{

        let id = req.params.id;

        let product = await Product.findByPk(id);

        if(!product){
            res.statusCode= 404;
            res.json({error:'error 404 produto não encontrado!'});
            return;
        }

        // getting the values to sell in our data-base and update.

        let {quantity=1, price=product.price, token}= req.body;

        if(product.quantity < quantity){
            res.json({error:`A quantidade para vender é maior do que temos no estoque (${product.quantity})`});
            return;
        }

        

        
    }

}