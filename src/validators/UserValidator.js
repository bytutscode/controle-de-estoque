const {checkSchema}= require('express-validator');

module.exports = {
   registerSupplier: checkSchema({
        name:{
            optional:false,
            isLength:{options:{min:2,max:100}},
            trim:true,
            errorMessage:'O nome do fornecedor é necessário!'
        },
        email:{
            isEmail:true,
            isLength:{options:{max:100}},
            optional:true,
            errorMessage:'Email inválido!'
        },
        phone:{
            optional:true,
            isLength:{options:{max:20}},
            trim: true,
            errorMessage:'esse campo não pode ter mais que 20 caracteres!'
        },
        unique:{
            optional:true,
        },
        total:{
            optional:true
        },
        delivery:{
            optional:true,
            isLength:{options:{max:20}},
            errorMessage:'esse campo não pode ter mais que 20 caracteres!'
        },
        note:{
            optional: true,
            trim: true,
            isLength:{options:{max:150}},
            errorMessage:'esse campo não pode ter mais que 150 caracteres!'
        }
   }),

   editSupplier: checkSchema({
    name:{
        optional:true,
        isLength:{options:{min:2,max:100}},
        trim:true,
        errorMessage:'O nome do fornecedor é necessário!'
    },
    email:{
        isEmail:true,
        isLength:{options:{max:100}},
        optional:true,
        errorMessage:'Email inválido!'
    },
    phone:{
        optional:true,
        isLength:{options:{max:20}},
        trim: true,
        errorMessage:'esse campo não pode ter mais que 20 caracteres!'
    },
    unique:{
        optional:true,
    },
    total:{
        optional:true
    },
    delivery:{
        optional:true,
        isLength:{options:{max:20}},
        errorMessage:'esse campo não pode ter mais que 20 caracteres!'
    },
    note:{
        optional: true,
        trim: true,
        isLength:{options:{max:150}},
        errorMessage:'esse campo não pode ter mais que 150 caracteres!'
    }
   })
}