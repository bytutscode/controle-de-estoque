const User = require('../models/User');
const Supplier = require('../models/Supplier');
const { validationResult, matchedData } = require('express-validator');
const { findByPk } = require('../models/User');

module.exports = {
    getAll: async (req, res) => {

        //Getting all users and returning them
        let response = await User.findAll();
        res.json(response);
    },

    getAllSuppliers: async () => {
        let suppliers = await Supplier.findAll();
        if (!suppliers) {
            res.statusCode = 404;
            res.json({ error: 'Não achamos nenhum fornecedor no banco de dados' });
            return
        }
        res.statusCode = 200;
        res.json(suppliers);
    },

    registerSupplier: async (req, res) => {

        let validation = validationResult(req)
        if (!validation.isEmpty()) {
            res.json(validation.mapped());
            return;
        }
        let { name, email, phone, unique, total, delivery, note } = matchedData(req);

        if (email) {
            let verifyEmail = await Supplier.findOne({ where: { email } });

            if (verifyEmail) {
                res.json({ error: `E-mail ${email} Já cadastrado no nosso banco de dados! Você está tentando adicionar um fornecedor que já existe!` });
                return;
            }
        }


        let newSupplier = Supplier.build();
        newSupplier.name = name;
        newSupplier.email = email;
        newSupplier.phone = phone;
        newSupplier.unique_products = unique;
        newSupplier.total_products = total;
        newSupplier.delivery_time = delivery;
        newSupplier.note = note;

        await newSupplier.save();

        res.statusCode = 200;
        res.json({ success: `${newSupplier.name} foi adicionado a tabela de fornecedores!` })

    },

    editSupplier: async (req, res) => {
        let { id } = req.params;

        let validation = validationResult(req);
        if (!validation.isEmpty()) {
            res.json(validation.mapped());
            return;
        }

        let supplier = await Supplier.findByPk(id);

        if (!supplier) {
            res.json({ error: 'O fornecedor não foi encontrado no banco de dados!' });
            return;
        }
        // getting data
        let data = matchedData(req);
        let keys = Object.keys(data);

        // response about changes
        let info = '';
        for (let i = 0; i < keys.length; i++) {
            //filling info about the changes
            info += `${supplier[keys[i]]} alterado para ${data[keys[i]]}, `;

            //setting the changes
            supplier[keys[i]] = data[keys[i]];

        }

        await supplier.save();

        res.json(info);
    },

    deleteSupplier: async (req, res)=>{
        let id= req.params.id;


        if(!id){
            res.statusCode = 400;
            res.json({error:'Id do fonecedor não foi fornecido!'});
            return;
        }

        let supplier = await Supplier.findByPk(id);

        if(!supplier){
            res.statusCode= 404;
            res.json({error:'Fornecedor não encontrado no banco de dados!'});
            return;
        }

        let supplierName = supplier.name;

        await supplier.destroy();

        res.statusCode = 200;
        res.json({success:`${supplierName} deletado com sucesso!`});

    }
}