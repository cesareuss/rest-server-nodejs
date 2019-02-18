const express = require('express');
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const { validationToken } = require('../middlewere/authentication');


app.post('/login', validationToken, (req, res) => {

    let body = req.body;

    UserModel.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado.'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Contraseña invalida.'
                }
            });
        }

        let token = jwt.sign({
            usuario: userDB
        }, process.env.SEED_TOKEN, { expiresIn: process.env.VALIDES_TOKEN });

        res.json({
            ok: true,
            userDB,
            token
        });
    })
});

module.exports = app;