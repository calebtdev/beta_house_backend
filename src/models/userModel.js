const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const validator = require('validator');
const { Schema } = mongoose;


const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    }, lastname: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email address"
        }
    }, password: {
        type: String,
        required: true,
        minlength: [7, 'Password must be at least 7 characters long']
    }, role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    }
},
    { timestamps: true })


// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()  // Only hash if password is new/modified

    try {
        const salt = await bcrypt.genSalt(10)       // Generate a "salt" (random data)
        this.password = await bcrypt.hash(this.password, salt)  // Hash password
        next()
    } catch (err) {
        next(err)
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User