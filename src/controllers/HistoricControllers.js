const Historic = require('../models/Historic');

module.exports = {
    showHistoric: async (req, res)=>{
        console.log('opa')
        let historic = await Historic.findAll();

        if(!historic){
            res.json({msg:'O historico se encontra vazio!'});
            return;
        }

        res.statusCode =200;
        res.json(historic);
    },

    deleteOneHistoric: async (req, res)=>{

        let id = req.params.id;

        if(!id){
            res.statusCode = 403;
            res.json({error:'id não fornecido!'});
            return;
        }

        let historic = await Historic.findByPk(id);

        if(!historic){
            res.statusCode =404;
            res.json({error:'404 não encontrado!'});
            return;
        }


        await historic.destroy();
        res.statusCode =200;
        res.json({success:'Deletado com sucesso!'})
    }
}