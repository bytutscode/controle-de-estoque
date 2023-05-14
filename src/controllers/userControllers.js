const User = require('../models/User');


module.exports = {
    getAll :async (req,res)=>{
        let response = await User.findAll();
        res.json(response);
    },

    signUp: async (req, res)=>{
        const {name,position='seller'} = req.body;

        if(!name){
            res.json({ERROR:'O usuário precisa ter um nome'});
            return
        }

        let newUser = User.build();
        newUser.name = name;
        newUser.position = position;
        await newUser.save();

        res.json({status:200,newUser});
    }
}