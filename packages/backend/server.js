const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
// const connectDB = require("./config/db");

// configure evironment variables
// require("dotenv").config({ path: "./config/config.env" });

// load routers
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const usersRouter = require("./routes/users");
const searchRouter = require("./routes/search");

// create instance of express
const app = express();

// request body parser
app.use(express.json());

// request cookie parser
app.use(cookieParser());

// sanitize data
// app.use(mongoSanitize());

// set security headers
app.use(helmet());

// prevent xss attack
app.use(xss());

// rate limiting
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 150, //Limit each IP to 100 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// prevent http parameter pollution attack
app.use(hpp());

// enable CORS
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// load routers as middlewares
app.use("/api/v1/auth", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/search", searchRouter);
// error handler middleware
app.use(errorHandler);

app.set("trust proxy", 1);

// establish database connection
// connectDB(process.env.MONGODB_URI);

// listen on port
const server = app.listen(
    process.env.PORT,
    console.log(
        `sever running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
);

// take care of unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // close server and exit process
    server.close(() => {
        process.exit(1);
    });
});
