import express from "express";
import path, { dirname } from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import { errorHandler } from "./middlewares/error.js";

// Configure environment variables
import "dotenv/config";
// load routers
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import usersRouter from "./routes/users.js";
import searchRouter from "./routes/search.js";
import { fileURLToPath } from "url";

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
const server = app.listen(process.env.PORT, () => {
  console.log(
    `sever running in ${process.env.NODE_ENV} mode on ${process.env.SERVER_URL}`,
  );
});

// take care of unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
