const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const notesController = require('../controllers/notesController.js')
const midware = require('../middleware/middleware')


// user routes
router.post('/api/auth/register', userController.createUser)
router.post('/api/auth/login', userController.loginUser)
router.get('/api/auth/getUser/:userId', midware.midware, userController.getUser)


// Notes routes
router.post('/api/notes/addNote', midware.midware, notesController.addNote)
router.get('/api/notes/fetchNotes', midware.midware, notesController.fetchNotes)


module.exports = router