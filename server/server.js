require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.json('Hola mundo');
});
app.post('/', function(req, res) {

    let body = req.body;
    res.json({
        persona: body
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto:: ${process.env.PORT}`);
});