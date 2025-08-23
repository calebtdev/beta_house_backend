// Import Express framework
const express = require("express")

// Create a new router object to define routes
const router = express.Router()

// Import controller functions for property creation and retrieval
const { propertyController, getpropertyController } = require("../controllers/propertyController")

// Import authentication middleware to protect routes
const auth = require("../middleware/authMiddleware")

// Route to create a new property
// The request passes through 'auth' middleware to verify the user first
// Then 'propertyController' handles creating the property
router.post("/", auth, propertyController)

// Route to get all properties
// The request passes through 'auth' middleware to verify the user first
// Then 'getpropertyController' handles fetching the properties
router.get("/", getpropertyController)

// Export the router to be used in index.js
module.exports = router
