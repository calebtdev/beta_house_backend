require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');



const register = async (req, res, next) => {
    console.log(req.body)
    const { firstname, lastname, email, password } = req.body

    try {
        const user = await User.create({ firstname, lastname, email, password })

        const token = generateToken(user)

        res.status(201).json({
            success: true, data: {
                id: user._id,
                firstname: user.firstname,
                email: user.email,
                token, // user is automatically "logged in"
            },
        })
    } catch (error) {
        // Pass error to centralized error handler
        if (error.code === 11000) {
            // Duplicate email
            return next({ statusCode: 409, message: "Email already exists" })
        }

        if (error.name === "ValidationError") {
            // Mongoose validation error
            const messages = Object.values(error.errors).map(val => val.message)
            return next({ statusCode: 400, message: messages.join(", ") })
        }

        // Any other error
        next(error) // will be handled by centralized error handler
    }

}


const login = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    if (!email || !password) {
        res.status(400).json({ msg: "Kindly provide valid email and password" })
    }

    try {
        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        //send response
        res.status(200).json({
            msg: "Login sccessful", token,
            user: { id: user._id, email: user.email }
        })
        console.log({ id: user._id, email: user.email })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Server error" })
    }
}

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,         // Include user's unique ID
            email: user.email,    // Include email if needed
            role: user.role       // Optional: store role
        },
        process.env.JWT_SECRET, // Secret key from .env
        { expiresIn: '1d' }    // Token validity (e.g., 1 day)
    );
}


module.exports = { register, login }