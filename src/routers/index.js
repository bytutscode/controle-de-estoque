const express = require('express');
const AuthControllers = require('../controllers/AuthControllers');
const UserControllers = require('../controllers/UserControllers');
const private = require('../middleware/Auth');
const AuthValidator = require('../validators/AuthValidator');
const UserValidator = require('../validators/UserValidator');

const router = express.Router();

router.get('/',private.private,UserControllers.getAll);
router.post('/cadastrar',AuthValidator.signUp,AuthControllers.signUp);
router.post('/login',AuthValidator.signIn,AuthControllers.signIn);

// ADM ROUTERS

//suppliers
router.post('/fornecedor/usuarios',private.privateAdm,UserControllers.getAll);
router.post('/fornecedor/fornecedores',private.privateAdm,UserControllers.getAllSuppliers);
router.post('/fornecedor/cadastrar', private.privateAdm,UserValidator.registerSupplier,UserControllers.registerSupplier);
router.put('/fornecedor/editar/:id', private.privateAdm,UserValidator.editSupplier,UserControllers.editSupplier);
router.delete('/fornecedor/deletar/:id', private.privateAdm,UserControllers.deleteSupplier);

//products
router.get('/produtos/:pag',private.private,UserControllers.getAllProducts);
router.post('/produtos/cadastrar', private.privateAdm,UserValidator.registerProduct,UserControllers.registerProduct);
router.put('/produtos/editar/:id', private.privateAdm,UserValidator.editProduct,UserControllers.editProduct);
router.delete('/produtos/deletar/:id', private.privateAdm,UserControllers.deleteProduct);





module.exports = router;