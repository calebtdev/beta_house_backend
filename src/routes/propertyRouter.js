const express = require("express")
const router = express.Router()
const { propertyController } = require("../controllers/propertyController")

router.get("/properties", propertyController)

module.exports = router