const express = require("express")
const router = express.Router()
const { propertyController, getpropertyController } = require("../controllers/propertyController")

router.post("/", propertyController)

router.get("/", getpropertyController)

module.exports = router