const { asyncHandler } = require("./async");
const { ErrorResponse } = require("../utils/ErrorResponse");
const { decryptToken } = require("../utils/cryptograph");
const { request } = require("express");

//extract access token from cookie
exports.extractToken = asyncHandler(async (req, res, next) => {
    let token = req.cookies.session_id;
    if (!token) {
        return next(
            new ErrorResponse("Not Authorized to access this route", 401)
        );
    }
    // decrypt token
    try {
        token = decryptToken(token, process.env.SECRETE_KEY);
    } catch (error) {
        res.cookie("session_id", "", {
            maxAge: 10,
            httpOnly: true,
        })
            .status(401)
            .send();
    }

    // append token to request object
    req.token = token;
    next();
});
