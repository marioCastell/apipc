const mongoose = require('mongoose')
//Conexion a mongoose 


const URI = (process.env.MONGO_URI || 'mongodb://localhost/apipc')
//Creamos una variable para gaurdar la direccion de la URI


mongoose.connect(URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false
})

const connection = mongoose.connection

connection.once('open', ()=>{
    console.log('DB is connected')
})