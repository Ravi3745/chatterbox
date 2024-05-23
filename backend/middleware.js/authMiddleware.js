const jwt = require('jsonwebtoken');
const { User } = require('../models/userSchema');
const asyncHandler = require('express-async-handler');

const isUserAuthorized = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decrypt = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decrypt.id;
            console.log(decrypt, "hii here");

            // Here, you should directly use userId as the filter for findOne
            // Also, no need to wrap userId in an object since it's already a string
            req.user = await User.findOne({ _id: userId }).select('-password');
            next();

        } catch (error) {
            console.error("Error decoding token:", error);
            res.status(401);
            throw new Error("Not authorized: Token verification failed");
        }
    } else {
        console.log("Token not found in headers");
        res.status(401);
        throw new Error("Not authorized: No token provided");
    }
});

module.exports = { isUserAuthorized };
