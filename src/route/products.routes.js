const {Router} = require('express');
const fs = require('fs');

const router = Router();

let idCount = 0;

const readFile = fs.readFileSync('./src/products.json','utf-8');
const productsP = JSON.parse(readFile);

const write = ()=>{
    const productString = JSON.stringify(productsP,null,2);
    const writeFile = fs.writeFileSync('./src/products.json',productString);
    
    }

router.get('/',(req,res)=>{
    
    const data = {
        Producto: productsP,
        Categoria: 'Electrónica'
    }
        res.render('home', data);
    })
    
router.get('/realtimeproducts',(req,res)=>{

    res.render('realTimeProducts',{});
})

router.post('/realtimeproducts',(req,res)=>{
    let product = req.body;

    if(!product.tittle){
    
        return res.status(400).send({status:'error',error:'Incomplete value'})

    }else{
        const productCreated = {
            id: idCount = productsP[productsP.length - 1].id + 1,
            ...product
        }
    
        productsP.push(productCreated);
        write();
        console.log(productsP);
        return res.send({status:'success',product:productCreated})
        


    }
   
       

        })

        router.delete('/realtimeproducts/:pid', (req,res)=>{
            const idParams = req.params.pid;
            if(!idParams){
            
                return res.status(400).send({status:'error',error:'Incomplete value'})
        
            }
            
            const productIndex = productsP.findIndex(u=>u.id === parseInt(idParams))
           
        
            if(productIndex < 0){
                return res.status(404).send({status:'error',error:'Product not found'})
            }else{
                
                productsP.splice(productIndex);
                write();
                console.log(productsP);
                
               
                return res.send({status:'success',mesagge:'Removed product'})  
            }
        })



module.exports = router;