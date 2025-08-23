require('dotenv').config(); // Load environment variables from .env
const User = require('../models/userModel'); // Import User model
const jwt = require('jsonwebtoken'); // JWT for token generation
const bcrypt = require('bcryptjs'); // bcryptjs to compare hashed passwords

// Register a new user
const register = async (req, res, next) => {
    console.log(req.body); // Log request body for debugging
    const { firstname, lastname, email, password } = req.body; // Extract fields

    try {
        // Create user in DB; pre-save hook will hash password automatically
        const user = await User.create({ firstname, lastname, email, password });

        // Generate JWT token for the new user
        const token = generateToken(user);

        // Send response including token
        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                firstname: user.firstname,
                email: user.email,
                token, // user is automatically "logged in"
            },
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            return next({ statusCode: 409, message: "Email already exists" });
        }

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(val => val.message);
            return next({ statusCode: 400, message: messages.join(", ") });
        }

        // Pass other errors to centralized error handler
        next(error);
    }
};

// Login existing user
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password); // Debug input

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ msg: "Kindly provide valid email and password" });
    }

    try {
        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // 2. Compare plaintext password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // 3. Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret from .env
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        // 4. Send response with token and user info
        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email, // Fixed typo: was eemail
                firstname: user.firstname,
                lastname: user.lastname
            }
        });

        console.log({ id: user._id, email: user.email }); // Debug log
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,      // Include user's unique ID
            email: user.email, // Include email if needed
            role: user.role    // Optional: store role for authorization
        },
        process.env.JWT_SECRET, // Secret key from .env
        { expiresIn: '1d' }    // Token validity (e.g., 1 day)
    );
};

// Export controller functions
module.exports = { register, login };
