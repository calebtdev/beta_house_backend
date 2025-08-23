// Import Express framework
const express = require('express')

// Create a new router object to define routes
const router = express.Router()

// Import controller functions for user registration and login
const { register, login } = require('../controllers/userController')

// Import validation middleware for user registration
const { registerValidation } = require('../validators/registervalidator')

// Route to register a new user
// 1. First, the request body passes through registerValidation middleware
// 2. Then, the register controller handles creating the user
router.post('/register', registerValidation, register)

// Route to log in an existing user
// The login controller handles authentication
router.post('/login', login)

// Export the router to be used in index.js
module.exports = router
