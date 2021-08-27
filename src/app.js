const express = require('express')

const app = express();

const cors = require('cors')



//settings
app.set('port', process.env.PORT || 3500)

//middlewares
app.use(cors())
app.use(express.json())


//routes
app.use('/api/users', require('./routes/usersRoutes.js'));
module.exports = app