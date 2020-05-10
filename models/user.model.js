import mongoose from 'mongoose'
import config from '../config/config'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'E-mail required']
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'Username required'],
    },
    password: {
        type: String,
        required: [true, 'Password required'],
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: null
    }
})

UserSchema.pre('save', function(next) {
    let user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(config.saltRounds, function(err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

UserSchema.methods = {
    comparePassword: function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return callback(err)
            callback(null, isMatch)
        })
    },
}

export default mongoose.model('User', UserSchema)