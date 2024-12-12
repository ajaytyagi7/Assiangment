const {Schema,model, Types} = require('../connection');

const mySchema=new Schema({
    name:String,
    price:String,
    image: String,
    description:String,
    });

module.exports=model('product',mySchema)