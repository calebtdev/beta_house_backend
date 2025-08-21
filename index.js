require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const errorHandler = require('../betahouse_backend/src/middleware/errorHandler');

const cors = require("cors");

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
    origin: "*", // or "*" to allow all
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const userRouter = require('./src/routes/userRoutes')
const propertyRouter = require("./src/routes/propertyRouter")

app.use(express.json())

app.use('/api/v1/user', userRouter)

app.use('/api/v1/properties', propertyRouter)

app.use(errorHandler);

const dbconnect = process.env.MONGO_URI

const dbconnection = async () => {
    try {
        await mongoose.connect(dbconnect);
        console.log("MongoDB connected successfully")

        app.listen(PORT, () => {
            console.log(`Application started successfully and running on port ${PORT}...`);
        })
    } catch (error) {
        console.error("mongoDB connection failed:", error.message)
        process.exit(1)
    }
}

dbconnection()

