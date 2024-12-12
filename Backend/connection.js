const mongoose = require('mongoose');

const url="mongodb+srv://ajaytyagi07:ajaytyagi8887@cluster0.7c6fh1x.mongodb.net/Sukiriti?retryWrites=true&w=majority"

mongoose.connect(url)
.then((result) => {
    console.log('Connected to mongoose')
    
}).catch((err) => {
    console.error(err)
    
});

module.exports=mongoose