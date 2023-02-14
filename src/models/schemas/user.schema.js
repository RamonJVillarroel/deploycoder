const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envconfig = require('../../env.config')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    timestamp: {
        type: Date,
        default: new Date().toLocaleString()
    },
    fullName: {
        type: String,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'Email already exists'],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    phone: {
        type: String,
        required: [true, 'Please enter a phone number']
    }
})


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, envconfig.JWT_SECRET, {
        expiresIn: envConfig.JWT_EXPIRE
    })
}
module.exports = UserSchema;