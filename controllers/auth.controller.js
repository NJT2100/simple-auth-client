import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../config/config'

const signin = (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User not found'
            })
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) {
                return res.status(400).json({
                    error: 'Could not authenticate user'
                })
            }
            if (isMatch) {
                const token = jwt.sign(
                    { user },
                    config.jwtSecret,
                    { expiresIn: '24h'}
                )
                res.cookie("token", token, {
                    expire: new Date() + 9999
                })
                return res.status(200).json({
                    email: user.email,
                    token,
                    message: 'Authenticated'
                })
            } else {
                res.status(401).json({
                    message: 'Unauthenticated'
                })
            }
        })
    })
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "signed out"
    })
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json({
                    error: 'Could not verify token'
                })
            }
            next()
        })
    } else {
        res.status(401).json({
            error: 'Unauthorized'
        })
    }
}

export default { signin, signout, authenticateJWT }