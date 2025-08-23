// Load environment variables from a .env file into process.env
require('dotenv').config()

// Import Express framework for building the API
const express = require("express")

// Import Mongoose for MongoDB connection
const mongoose = require('mongoose')

// Import a custom error handling middleware
const errorHandler = require('./src/middleware/errorHandler');

// Import CORS to handle cross-origin requests
const cors = require("cors");

// Initialize Express app
const app = express()

// Set the port from environment variable or default to 4000
const PORT = process.env.PORT || 4000

// Configure CORS middleware
app.use(cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true // Allow cookies or credentials
}));

// Import route modules
const userRouter = require('./src/routes/userRoutes')
const propertyRouter = require("./src/routes/propertyRouter")

// Middleware to parse incoming JSON request bodies
app.use(express.json())

// Mount user routes at /api/v1/user
app.use('/api/v1/user', userRouter)

// Mount property routes at /api/v1/properties
app.use('/api/v1/properties', propertyRouter)

// Global error handling middleware
app.use(errorHandler);

// Get MongoDB connection string from environment variables
const dbconnect = process.env.MONGO_URI

// Function to connect to MongoDB and start the server
const dbconnection = async () => {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(dbconnect);
        console.log("MongoDB connected successfully")

        // Start the Express server after successful DB connection
        app.listen(PORT, () => {
            console.log(`Application started successfully and running on port ${PORT}...`);
        })
    } catch (error) {
        // Log any connection errors and exit the process
        console.error("mongoDB connection failed:", error.message)
        process.exit(1)
    }
}

// Call the function to establish DB connection and start the server
dbconnection()
