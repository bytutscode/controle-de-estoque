const User = require('../models/User');

module.exports = {
    getAll :async (req,res)=>{

        //Getting all users and returning them
        let response = await User.findAll();
        res.json(response);
    }
}