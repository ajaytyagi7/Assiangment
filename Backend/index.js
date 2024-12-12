const express = require('express');

const ProductRouter = require('./Router/productRouter');
const utilRouter = require('./Router/util');




const cors = require('cors');


const app=express();
const port= 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    orgin: 'http://localhost:5173'

}));

app.use('/product',ProductRouter);
app.use('/util', utilRouter);
app.use(express.static('./uploads'));










app.listen(port,() =>{console.log('Server Started !!')});