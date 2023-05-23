const {checkSchema} = require('express-validator');

module.exports = {

    registerProduct:checkSchema({
        name:{
            isString:true,
            isLength:{options:{min:2 ,max:50}},
            trim:true,
            optional:false,
            errorMessage:'O produto PRECISA ter pelo menos o nome'
        },
        description:{
            optional:true,
            isLength:{options:{max:200}},
            trim:true,
            errorMessage:'A descrição deve conter menos de 200 caracteres'
        },
        category:{
            optional:true,
            trim:true,
            errorMessage:'categoria inválida'
        },
        supplier_id:{
            optional:true,
            trim:true,
            errorMessage:'Fornecedor inválido'
        },
        price:{
            optional:true,
            isNumeric:true,
            errorMessage:'preço inválido!'
        },
        quantity:{
            optional:true,
            isNumeric:true,
            errorMessage:'quantidade inválida!'
        },
        min_quantity:{
            optional:true,
            isNumeric:true,
            errorMessage:'quantidade inválida!'
        },
        max_quantity:{
            optional:true,
            isNumeric:true,
            errorMessage:'quantidade inválida!'
        },
        reorder_quantity:{
            optional:true,
            isNumeric:true,
            errorMessage:'quantidade inválida!'
        },
        note:{
            optional:true,
            isString:true,
            trim:true,
            default:'sem notas.'
        }

    }),


    editProduct:checkSchema({
        name:{
            isString:true,
            isLength:{options:{min:2 ,max:50}},
            trim:true,
            optional:true,
            errorMessage:'O produto PRECISA ter pelo menos o nome'
        },
        description:{
            optional:true,
            isLength:{options:{max:200}},
            trim:true,
            errorMessage:'A descrição deve conter menos de 200 caracteres'
        },
        category:{
            optional:true,
            trim:true,
            errorMessage:'categoria inválida'
        },
        supplier_id:{
            optional:true,
            trim:true,
            errorMessage:'Fornecedor inválido'
        },
        price:{
            optional:true,
            isNumeric:true,
            errorMessage:'preço inválido!'
        },
        quantity:{
            optional:true,
            isNumeric:true,
            errorMessage:'quantidade inválida!'
        },
        min_quantity:{
            optional:true,
            isNumeric:true,
            errorMessage:'quantidade inválida!'
        },
        max_quantity:{
            optional:true,
            isNumeric:true,
            errorMessage:'quantidade inválida!'
        },
        reorder_quantity:{
            optional:true,
            isNumeric:true,
            errorMessage:'quantidade inválida!'
        },
        note:{
            optional:true,
            isString:true,
            trim:true,
            default:'sem notas.'
        }

    })
}