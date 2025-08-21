const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/userController')
const { registerValidation } = require('../validators/registervalidator')

router.post('/register', registerValidation, register)
router.post('/login', login)

module.exports = router