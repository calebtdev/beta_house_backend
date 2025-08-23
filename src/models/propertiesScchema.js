// Import necessary modules
const mongoose = require("mongoose")
const { Schema } = mongoose

// Define the Property schema
const propertySchema = new Schema(
    {
        // Property title, e.g., "Luxury Apartment"
        title: {
            type: String,
            required: true
        },
        // Property type, e.g., "Apartment", "Bungalow"
        type: {
            type: String,
            required: true
        },
        // Amount/price of the property
        amount: {
            type: Number,
            required: true
        },
        // Number of bedrooms
        rooms: {
            type: Number,
            required: true
        },
        // Number of bathrooms
        bathrooms: {
            type: Number,
            required: true
        },
        // Size in square feet
        height: {
            type: Number,
            required: true
        },
        // Location of the property
        location: {
            type: String,
            required: true
        },
        // URL for property image
        image_url: {
            type: String,
            required: true
        },
        // Boolean flag indicating if the property is featured
        featured: {
            type: Boolean,
            required: true
        }
    },
    {
        // Automatically add createdAt and updatedAt fields
        timestamps: true
    }
)

// Create the Property model based on the schema
const property = mongoose.model("property", propertySchema)

// Export the model to use in controllers/routes
module.exports = property
