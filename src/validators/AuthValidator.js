const {checkSchema}= require('express-validator');

module.exports = {
    signUp:checkSchema({
        email:{
            isEmail:true,
            trim:true,
            normalizeEmail:true,
            isLength:{options:{max:50}},
            errorMessage:'E-mail inválido'
        },
        name:{
            isLength:{options:{min:2,max:50}},
            trim:true,
            errorMessage:'Nome de usuário invalido, o nome precisa ter pelo menos 2 caracteres!'
        },
        password:{
            isLength:{options:{min:4,max:50}},
            errorMessage:'O usuário precisa ter uma senha de no minimo 4 caracteres!'
        },
        position:{
            isLength:{options:{min:3}},
            default:'Vendedor',
            errorMessage:'Você deve ter um cargo válido!',
            trim:true
        }

    }),

    signIn:checkSchema({
        email:{
            isEmail:true,
            normalizeEmail:true,
            trim:true,
            errorMessage:'E-mail inválido!'
        },
        password:{
            isLength:{options:{min:4}},
            errorMessage:'Senha inválida, a senha precisa ter pelo menos 4 caracteres!'
        }
    })
}