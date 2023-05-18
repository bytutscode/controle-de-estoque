const User = require('../models/User');
const jwt = require('jsonwebtoken');
const next = require('express');

module.exports = {
    private: async (req, res)=>{
        //Getting the received token
        const token = req.body.token;

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
        res.json({success:true});
        next();
    }
}