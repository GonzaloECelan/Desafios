const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs');
const {Server} = require('socket.io');

const productView = require('./route/products.routes');


const port = 8080;

const app = express();



app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));


// route
app.use('/api/products',productView);


const httpServer = app.listen(port, ()=>{
    console.log('se levanto correctamente')
});
const socketServer = new Server(httpServer);



socketServer.on('connection', (socket)=>{

    const products = fs.readFileSync('./src/products.json','utf-8');
    const productsP = JSON.parse(products);

socket.emit('message', productsP)
})
    