const express = require('express');
const AuthControllers = require('../controllers/AuthControllers');
const UserControllers = require('../controllers/UserControllers');
const User = require('../models/User');
const private = require('../middleware/Auth');
const AuthValidator = require('../validators/AuthValidator');

const router = express.Router();

router.get('/',private.private,UserControllers.getAll);
router.post('/cadastrar',AuthValidator.signUp,AuthControllers.signUp);
router.post('/login',AuthValidator.signIn,AuthControllers.signIn);





module.exports = router;