const jwt = require('jsonwebtoken');
//==========================================
//==========================================
//            Validation Token
//==========================================
//==========================================


let validationToken = (req, res, next) => {

    let token = req.get('token');
    console.log('Validando token ::: ' + token);

    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
    });

    next();
}

let validaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    console.log('El valor de usuario::' + usuario.role);
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            message: 'El usuario no es administrador.'
        });
    }
}

module.exports = {
    validationToken,
    validaAdminRole

};