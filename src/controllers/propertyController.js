const property = require("../models/propertiesScchema")

const propertyController = async (req, res) => {
    const { title, type, amount, rooms, bathrooms, height, location, image_url, featured } = req.body

    if (!title || !type || !amount || !rooms || !bathrooms || !height || !location || !image_url) {
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
        return res.status(500).json({ msg: "server error", err: error.message })
    }
}


const getpropertyController = async (req, res) => {
    try {
        const { featured } = req.query
        let query = {}

        if (featured) {
            query.featured = featured === 'true'
        }

        const properties = await property.find(query);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
}

module.exports = { propertyController, getpropertyController }