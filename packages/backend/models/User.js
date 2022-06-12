const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    name: { type: String, required: [true, "please add a name"] },
    email: {
        type: String,
        required: [true, "please add an email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email",
        ],
    },
    password: {
        type: String,
        select: false,
        minlength: [6, "password is too short"],
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "publisher"],
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: { type: Date, default: Date.now },
});
// Hash password using bcrypt
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// generate signed JWT
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in db
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// generate reset password token
UserSchema.methods.generatePasswordResetToken = function () {
    // generate token
    const token = crypto.randomBytes(32).toString("hex");
    // hash token and store in dB resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("SHA256")
        .update(token)
        .digest("hex");
    // set expire
    this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
    return token;
};

module.exports = model("User", UserSchema);
