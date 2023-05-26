const Product = require('../models/Product');
const User = require('../models/User');
const Historic = require('../models/Historic');
const Sale = require('../models/Sales');

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

        product.quantity = product.quantity - quantity;
        await product.save();

        let sale = `Vendeu ${quantity}x ${product.name} ao preço de ${price} por unidade; total da venda:${price * quantity}`;

        let user = await User.findOne({where:{token}});

        // setting the historic to our database
        let historic = Historic.build();
        historic.user_id = user.id;
        historic.user_name = user.name;
        historic.action = sale;
        await historic.save();


        // setting the sale to our database

        let saleSave = Sale.build();
        saleSave.seller_id = user.id;
        saleSave.product_id = product.id;
        saleSave.product_price = product.price;
        saleSave.sold_quantity = quantity;
        saleSave.sold_price = price;
        saleSave.total = quantity * price;

        await saleSave.save();

        res.json({success:'Ordem realizada com sucesso!'});
        
        
    }

}