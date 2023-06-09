const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config')

const app = express();

dbConection();


app.use( express.static('public') );



app.use( express.json() );



app.use( '/api/auth', require('./routes/auth') )
app.use( '/api/products', require('./routes/products') )




app.listen( process.env.PORT, ()=> {
    console.log( process.env.PORT )
} )