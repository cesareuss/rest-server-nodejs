const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let roleValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} este valor no es valido.'
}

let user = new Schema({

    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido']
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roleValid
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'El status es requerido']
    },
    google: {
        type: Boolean,
        default: false
    }
})

user.plugin(uniqueValidator, { message: '{PATH} debe ser un valor unico.' })
module.exports = mongoose.model('userModel', user);