//Express
const express = require('express');
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const { validationToken, validaAdminRole } = require('../middlewere/authentication');
const app = express();

app.get('/usuarios', validationToken, function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    UserModel.find({}, 'nombre email')
        .skip(desde)
        .limit(2)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            UserModel.count({}, (err, count) => {
                res.json({
                    ok: true,
                    usuarios,
                    count
                });
            })
        });
});
app.post('/', [validationToken, validaAdminRole], function(req, res) {

    let body = req.body;

    let user = new UserModel({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
            //   role: body.role,
            // status: body.status
    });

    user.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });
    });
});


app.put('/', function(req, res) {

    let body = req.body;
    let id = body.id;

    UserModel.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });
    });
});


app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    console.log('el id es::' + req.params.id);
    UserModel.findByIdAndDelete(id, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado.'
                }
            });
        }
        res.json({
            ok: true,
            remove: usuarioDB
        });
    });
});

module.exports = app;