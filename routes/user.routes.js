import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/:userId')
    .get(authCtrl.authenticateJWT, userCtrl.read)
    .put(authCtrl.authenticateJWT, userCtrl.update)
    .delete(authCtrl.authenticateJWT, userCtrl.remove)
    
router.param('userId', userCtrl.userById)

export default router