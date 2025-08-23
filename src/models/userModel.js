const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const validator = require('validator'); // For email validation
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true, // First name is mandatory
    },
    lastname: {
        type: String,
        required: true, // Last name is mandatory
    },
    email: {
        type: String,
        required: true,
        unique: true, // No duplicate emails allowed
        lowercase: true, // Convert to lowercase before saving
        trim: true, // Remove surrounding whitespace
        validate: {
            validator: validator.isEmail, // Validate correct email format
            message: "Please provide a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [7, 'Password must be at least 7 characters long'] // Minimum length validation
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Only 'user' or 'admin' allowed
        default: "user" // Default role is 'user'
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Pre-save hook to hash password before saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is new/modified

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt (random data)
        this.password = await bcrypt.hash(this.password, salt); // Hash password with salt
        next(); // Continue with save
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
});

// Create User model from schema
const User = mongoose.model("User", userSchema);

// Export the model to use in controllers
module.exports = User;
