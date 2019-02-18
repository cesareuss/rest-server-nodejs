const express = require('express');
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const { validationToken } = require('../middlewere/authentication');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//============================================
//          Configuracion Google
//============================================
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    return payload;
}
app.post('/authentication', async(req, res) => {

    let token = req.body.token;
    console.log('token::::' + token);
    if (!token) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario no encontrado.'
            }
        });
    }

    let user_google = await verify(token).catch((err) => {

        return res.status(403).json({
            ok: false,
            err
        });
    });

    UserModel.findOne({ email: user_google.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (userDB) {
            if (userDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    message: 'El usuario debe autenticarse normal'
                });
            } else {
                let token = jwt.sign({
                    usuario: userDB
                }, process.env.SEED_TOKEN, { expiresIn: process.env.VALIDES_TOKEN });

                res.json({
                    ok: true,
                    userDB,
                    token
                });
            }
        } else {
            // crear nuevo usuario con informacion de SignIn google
            let user = new UserModel();

            user.nombre = user_google.name;
            user.email = user_google.email;
            user.role = "USER_ROLE"
            user.status = 'true';
            user.password = bcrypt.hashSync('11111', 10);
            user.google = true;
            user.img = user_google.img;

            user.save((err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
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
            });
        }
    });
});

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