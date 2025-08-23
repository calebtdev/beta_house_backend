// authMiddleware.js
module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: 'No token, access denied' });

    try {
        // verify token logic here (e.g., JWT)
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
