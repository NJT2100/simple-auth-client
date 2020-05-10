import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../config/config'

const signin = (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'E-mail or Password incorrect'
            })
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) {
                return res.status(401).json({
                    error: 'Password did not match'
                })
            }
            if (isMatch) {
                user.lastLogin = Date.now()
                user.save((err, result) => {
                    if (err) {
                        res.status(400).json({
                            error: 'Failed to update user'
                        })
                    }
                })
                const token = jwt.sign(
                    { id: user._id },
                    config.jwtSecret,
                    { expiresIn: '24h'}
                )
                return res.status(200).json({
                    token,
                    message: 'Authenticated'
                })
            } else {
                res.status(401).json({
                    error: 'E-mail or Password incorrect'
                })
            }
        })
    })
}

const signout = (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({
        message: "signed out"
    })
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, config.jwtSecret, (err, authorizedData) => {
            if (err) {
                return res.status(403).json({
                    error: 'Could not verify token'
                })
            }
            req.data = authorizedData
            next()
        })
    } else {
        res.status(401).json({
            error: 'Unauthorized'
        })
    }
}

const userIdByToken = (req, res) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, config.jwtSecret, (err, authData) => {
            if (err) {
                return res.status(403).json({
                    error: 'Could not verify token'
                })
            }
            User.findById(authData.id, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'User not found'
                    })
                }
                res.status(200).json({
                    id: authData.id,
                    username: user.username
                })
            })
        })
    } else {
        res.staus(400).json({
            message: 'Unauthorized'
        })
    }
}

export default { signin, signout, userIdByToken, authenticateJWT }