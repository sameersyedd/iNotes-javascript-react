const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const midware = require('../middleware/middleware')

router.post('/api/auth/register', userController.createUser)
router.post('/api/auth/login', userController.loginUser)
router.get('/api/auth/getUser/:userId', midware.midware, userController.getUser)


module.exports = router