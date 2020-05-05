import User from '../models/user.model'
import _ from 'lodash'

const create = (req, res, next) => {
    const user = new User(req.body)
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'failed to create user'
            })
        }
        res.status(200).json({
            message: 'successfully signed up'
        })
    })
}

const list = (req, res) => {
    User.find((err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'Could not find users'
            })
        }
        res.json(user)
    }).select('username email password created modified')
}

const update = (req, res) => {
    let user = req.profile
    user = _.extend(user, req.body)
    user.modified = Date.now()
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to update user'
            })
        }
        res.status(200).json({
            message: 'Successfully updated user'
        })
    })
}

const remove = (req, res) => {
    let user = req.profile
    user.remove((err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to remove user'
            })
        }
        res.status(200).json({
            message: 'Successfully removed user'
        })
    })
}


const read = (req, res) => {
    return res.status(200).json(req.profile)
}

const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user
        next()
    })
}

export default { create, list, update, remove, read, userById }