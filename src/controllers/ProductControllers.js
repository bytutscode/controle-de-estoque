const Product = require('../models/Product');
const { matchedData, validationResult } = require('express-validator');
require('dotenv').config();
const request = require('request');
const fs = require('fs');
const Historic = require('../models/Historic');
const User = require('../models/User');
const {Op, Sequelize} = require('sequelize');



module.exports = {

    getAllProducts: async (req, res) => {

        let { limit = 20, offset = 0 } = req.query;
        let pag = req.params.pag;
        let products;

        if (pag && !isNaN(pag)) {

            +pag > 0 ? offset = 10 : offset;
            // getting all products and establishing limit and the offset
            products = await Product.findAll({ limit, offset: offset * (+pag) });
        } else {
            products = await Product.findAll({ limit });
        }




        // case there's no products send an error msg
        if (!products) {
            res.statusCode = 404;
            res.json({ error: 'Produtos não encontrados no banco de dados!' });
            return;
        }

        res.statusCode = 200;
        res.json({ products });


    },

    registerProduct: async (req, res) => {

        let validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.json(validation.mapped());
            return;
        }

        let newProduct = Product.build();

        let data = matchedData(req);
        let keys = Object.keys(data);
        let img;

        for (let i = 0; i < keys.length; i++) {
            newProduct[keys[i]] = data[keys[i]];
        }

        if (req.file) {

            img = req.file.path;

            newProduct.media = img;

        } else {
            newProduct.media = 'file:///C://Users//Bytuts//Documents//dev//personal-projects//Armazenamento-de-estoque//controle-de-estoque//public/media/media-1684786144705-640952349.png';
        }

        await newProduct.save();

        let userToken = req.body.token;
        let user = await User.findOne({where:{token:userToken}});

        let infoUser = Historic.build();
        infoUser.user_id = user.id;
        infoUser.user_name = user.name;
        infoUser.action = `${user.name} cadastrou ${newProduct.name} no estoque;`;
        await infoUser.save();

        res.json({ newProduct })

    },

    editProduct: async (req, res) => {

        let validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.json(validation.mapped());
            return;
        }

        let productId = req.params.id;

        if (!productId) {
            res.json({ error: 'id do produto não fornecido!' });
            return;
        }

        let product = await Product.findByPk(productId);

        if (!product) {
            res.statusCode = 404;
            res.json({ error: '404 não encontrado!' });
            return;
        }

        let data = matchedData(req);
        let keys = Object.keys(data);
        let img;
        let infoUser = Historic.build();
        infoUser.action = '';
        for (let i = 0; i < keys.length; i++) {
            product[keys[i]] = data[keys[i]];
            infoUser.action += ` Editou ${keys[i]} para ${data[keys[i]]}; `;
        }

        if (req.file) {
            img = req.file.path;
            product.media = img;
        }

        await product.save();
        let token = req.body.token;
        let user = await User.findOne({ where: { token } });


        infoUser.user_id = user.id;
        infoUser.user_name = user.name;
        infoUser.action += `Do produto ${product.name}`;
        await infoUser.save();

        res.statusCode = 200;
        res.json({ success: 'Alteração feita com sucesso!' });
    },

    deleteProduct: async (req, res) => {

        let id = req.params.id;

        if (!id) {
            res.json({ error: 'Id do produto não fornecido!!!' });
            return;
        }

        let product = await Product.findByPk(id);

        if (!product) {
            res.statusCode = 404;
            res.json({ error: 'O produto não foi encontrado no banco de dados!' });
            return;
        }

        let info = product;

        product.destroy();

        let token = req.body.token;
        let user = await User.findOne({ where: { token } });

        let infoUser = Historic.build();
        infoUser.user_id = user.id;
        infoUser.user_name = user.name;
        infoUser.action = `Deletou ${info.name} do estoque!`;
        await infoUser.save();

        res.json({ success: `${info.name} do ID ${info.id}, foi apagado do banco de dados!` });
    },


    ending: async (req, res) =>{

        let endingProducts = await Product.findAll({where:{quantity:{[Op.lte]:Sequelize.col('min_quantity')}}});

        if(endingProducts.length < 1){
            res.json({msg:'Não temos produtos abaixo ou igual do minimo requerido!'});
            return;
        }
        res.json(endingProducts);
    }


}