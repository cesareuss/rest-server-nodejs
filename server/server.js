require('./config/config');
//Express
const express = require('express');

//Mongoose
const mongoose = require('mongoose');
//BodyPaerser
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/user'));

//Coneccion a la DB mongo
mongoose.connect(process.env.URLDB, (error, res) => {

    if (error) throw error;

    console.log('Connection successful:: ' + process.env.URLDB);
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto:: ${process.env.PORT}`);
});