// Custom error-handling middleware
// Express automatically passes any errors to this function if next(err) is called
const errorHandler = (err, req, res, next) => {
    // Set the HTTP status code, defaulting to 500 (Internal Server Error) if not provided
    let statusCode = err.statusCode || 500;

    // Set the error message, defaulting to "Internal Server Error" if not provided
    let message = err.message || "Internal Server Error";

    // Send the error response as JSON
    res.status(statusCode).json({ msg: message });
};

// Export the middleware to use in app.js or index.js
module.exports = errorHandler;
