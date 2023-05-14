const express = require('express');
const router = require('./routers/index')
require('dotenv').config();
const cors = require('cors');

const server = express();

server.use(express.urlencoded({extended:true}));
server.use(cors());

server.use(router);

const port = process.env.PORT;

server.listen(port,()=>{console.log(`the server is running on ${process.env.BASE}:${port}`)});

server.use(()=>{
    console.log('rota de erro');
})