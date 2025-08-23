// Import the Property model
const property = require("../models/propertiesScchema")

// Controller to create a new property
const propertyController = async (req, res) => {
    // Destructure required fields from request body
    const { title, type, amount, rooms, bathrooms, height, location, image_url, featured } = req.body

    // Validate that all required fields are provided
    if (!title || !type || !amount || !rooms || !bathrooms || !height || !location || !image_url) {
        // Return 400 Bad Request if any field is missing
        return res.status(400).json({ msg: "Kindly fill in all details" })
    }

    try {
        // Create a new property document in MongoDB
        const newProperty = await property.create({
            title,
            type,
            amount,
            rooms,
            bathrooms,
            height,
            location,
            image_url,
            featured
        })

        // Return success response with the created property
        return res.status(201).json({
            msg: "Property created successfully",
            property: newProperty
        })
    } catch (error) {
        // Log any error and return server error response
        console.log(error)
        return res.status(500).json({ msg: "Server error", err: error.message })
    }
}

// Controller to fetch properties
const getpropertyController = async (req, res) => {
    try {
        // Check if a 'featured' query parameter is provided
        const { featured } = req.query
        let query = {}

        // If 'featured' is provided, filter properties by featured status
        if (featured) {
            query.featured = featured === 'true'
        }

        // Fetch properties from MongoDB based on query
        const properties = await property.find(query)

        // Return properties with 200 OK
        res.status(200).json(properties)
    } catch (error) {
        // Return 500 Server Error if fetching fails
        res.status(500).json({ msg: "Server error", error })
    }
}

// Export both controllers to use in routes
module.exports = { propertyController, getpropertyController }
