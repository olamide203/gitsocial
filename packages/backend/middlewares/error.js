const { ErrorResponse } = require("../utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
    let error = {
        ...err,
        name: err.name,
        message: err.message,
    };
    // Log to console for the dev
    console.log(err);

    switch (error.name) {
        case "CastError": // Mongoose bad objectId
            error.message = "Resource not found";
            error = new ErrorResponse(error.message, 404);
            break;
        case "ValidationError": //Mongoose validation error
            error.message = Object.values(error.errors).map(
                (val) => val.message
            );
            error = new ErrorResponse(error.message, 400);
            break;
        default:
            break;
    }
    switch (error.code) {
        case 11000: //Mongoose duplicate key error
            error.message = `Duplicate key error: Resource exists with ${Object.keys(
                error.keyValue
            )}: ${Object.values(error.keyValue)}`;
            error = new ErrorResponse(error.message, 400);
            break;
        case "LIMIT_FILE_SIZE":
            error = new ErrorResponse(error.message, 400);
        default:
            break;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server error",
    });
};

module.exports = errorHandler;
