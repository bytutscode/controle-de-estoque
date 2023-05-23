const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    private: async (req, res, next)=>{
        //Getting the received token
        const token = req.query.token;

        // if there's no token, the server will send an error message and stop the process 
        if(!token){
            res.statusCode = 403;
            res.json({error:'acesso negado!'});
            return;
        }

        // verifying if there is a user that his token matches with the received token
        let verifyToken =  await User.findOne({where:{token}});

        //if there's no user's token that matches, the server will send an error message and stop the process
        if(!verifyToken){
            res.statusCode = 403;
            res.json({error:'acesso negado!'});
            return;
        }

        // everything is ok and the user token matches so the user is logged in
        res.statusCode = 200;
        next();
    },

    privateAdm: async(req, res, next)=>{

        const token = req.body.token;
        console.log(req.body)

        if(!token){
            res.statusCode= 403;
            res.json({error:'token não fornecido!'});
            return;
        }

        let user = await User.findOne({where:{token,position:'adm'}});

        if(!user){
            res.statusCode = 403;
            res.json({error:'acesso negado! Você precisa ter sua position como "ADM" para usar essa rota!'});
            return
        }

       res.statusCode = 200;
        next();
    }
}