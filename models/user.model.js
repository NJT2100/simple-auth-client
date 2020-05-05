import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 10

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
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
        type: Date
    }
})

UserSchema.pre('save', function(next) {
    let user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(saltRounds, function(err, salt) {
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