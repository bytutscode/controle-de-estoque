const express = require('express');
const AuthControllers = require('../controllers/AuthControllers');
const UserControllers = require('../controllers/UserControllers');
const private = require('../middleware/Auth');
const AuthValidator = require('../validators/AuthValidator');
const UserValidator = require('../validators/UserValidator');
const ProductValidator = require('../validators/ProductValidator');
const ProductControllers = require('../controllers/ProductControllers');
const HistoricControllers = require('../controllers/HistoricControllers');
const multer = require('multer');
multer({dest:__dirname+'../../../public/media'})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory where you want to save the uploaded images

      cb(null, __dirname+'../../../public/media');
    },
    filename: function (req, file, cb) {
      // Use a unique filename for the uploaded image
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    }
  });

  const upload = multer({storage});

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
router.get('/produtos',private.private,ProductControllers.getAllProducts);
router.get('/produtos/:pag',private.private,ProductControllers.getAllProducts);
router.post('/produtos/cadastrar',upload.single('media'), private.privateAdm,ProductValidator.registerProduct,ProductControllers.registerProduct);
router.put('/produtos/editar/:id',upload.single('media'), private.privateAdm,ProductValidator.editProduct,ProductControllers.editProduct);
router.delete('/produtos/deletar/:id', private.privateAdm,ProductControllers.deleteProduct);

//historic
router.post('/historico',private.privateAdm, HistoricControllers.showHistoric);
router.delete('/historico/deletar/:id',private.privateAdm, HistoricControllers.deleteOneHistoric);


//sellers

// router.post('/venda',private.private,)



//error 404 not found!
router.use((req, res)=>{
  res.json({error:'Página não encontrada!'});
})





module.exports = router;