const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envConfig = require('../../env.config')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    timestamp: {
        type: Date,
        default: new Date()
    },
    fullName: {
        type: String,
        required: [true, 'nombre completo']
    },
    email: {
        type: String,
        required: [true, 'ingrese un mail'],
        unique: [true, 'email ya existe'],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            'ingrese un email valido'
        ]
    },
    password: {
        type: String,
        required: [true, 'ingrese una contraseña'],
        minlength: [6, 'al menos 6 caracteres']
    },
    phone: {
        type: String,
        required: [true, 'ingrese un telefono']
    },
    cartId: { type: String },
    admin: { type: Boolean, default: false }
})


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword 
    next()
})

UserSchema.methods.matchPasswords = async function(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  };

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, email: this.email, admin: this.admin }, envConfig.JWT_SECRET, {
        expiresIn: envConfig.JWT_EXPIRE
    })

}
module.exports = UserSchema;