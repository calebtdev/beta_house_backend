const property = require("../models/propertiesScchema")

const propertyController = async (req, res) => {
    const { title, type, amount, rooms, bathrooms, height, location, image_url, featured } = req.body

    if (!title || !type || !amount || !rooms || !bathrooms || !height || !location || !image_url || !featured) {
        return res.status(400).json({ msg: "Kindly fill in all details", err: error.message })
    }

    try {
        const newProperty = await property.create({ title, type, amount, rooms, bathrooms, height, location, image_url, featured })

        return res.status(201).json({
            msg: "Property created successfully",
            property: newProperty
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" })
    }
}


const getpropertyController = async (req, res) => {
    try {
        // Fetch only featured properties
        const featuredProperties = await property.find({ featured: true });
        res.status(200).json(featuredProperties);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
}

module.exports = { propertyController, getpropertyController }