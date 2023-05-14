const express = require('express');
const userControllers = require('../controllers/userControllers');
const User = require('../models/User');

const router = express.Router();

router.get('/',userControllers.getAll);
router.post('/cadastrar',userControllers.signUp)





module.exports = router;