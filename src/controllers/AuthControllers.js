const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult , matchedData} = require('express-validator')


module.exports = {

    signUp: async (req, res)=>{
        let validation = validationResult(req);
        if(!validation.isEmpty()){
            res.json(validation);
            return;
        }

        const {email,name,position='seller',password} = matchedData(req);

        // verifying if already has the email in the database
        let verifyEmail = await User.findOne({where:{email}});
        if(verifyEmail){
            res.json({error:`O email ${email} já está ligado a uma conta no nosso banco de dados!`});
            return;
        }

        //creating a new user
        let newUser = User.build();

        // making the user token
        let payload = (Date.now() + email).toString();
        let token =  jwt.sign(payload,process.env.SECRET);
        // transforming the text password into a hash to save in our database
        let hash = bcrypt.hashSync(password,10);

            //filling the user's information
            newUser.email = email
            newUser.name = name;
            newUser.position = position;
            newUser.hash_password = hash;
            newUser.token = token;

            //sending our new user to our database
            await newUser.save();

            //returning the success code and returning the new user id;
            res.statusCode = 200;
            res.json({token});
    },

    signIn: async (req,res)=>{

        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            res.json(validationErrors.mapped());
            return;
        }
        const {email, password} = matchedData(req);


        // Looking for a user who has the same email sent
        let user =await User.findOne({where:{email}});

        // if the email does not match with a user's email from the database, the system will send an error msg and stop the login process
        if(!user){
            res.statusCode = 403;
            res.json({error:'Email e /ou senha incorretos!'});
            return;
        }
        
        // comparing if the password matches
        let verifyPassword = await bcrypt.compare(password,user.hash_password);

        // if the password does not match with the hash password saved in the database, the login process will stop and send an error message
        if(!verifyPassword){
            res.statusCode = 400;
            res.json({error:'Email e /ou senha incorretos!'});
            return;
        }

        // if it arrives here everything is ok and the process login was a success
        res.statusCode = 200;
        res.json({token:user.token});
    }
}