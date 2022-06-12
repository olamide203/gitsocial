const mongoose = require("mongoose");

const connectDB = async (mongodb_uri) => {
    try {
        const conn = await mongoose.connect(mongodb_uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        throw error;
    }
};

module.exports = connectDB;
