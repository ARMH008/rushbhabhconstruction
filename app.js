const path = require("path");
const express = require("express");
const morgan = require("morgan");
const limiter = require("express-rate-limit");
const monogsantize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const cookieparser = require("cookie-parser");
const compression = require("compression");
const siteRouter = require("./Routes/siteReportRoutes");
const userRouter = require("./Routes/userRoutes");
const app = express();
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));

const ratelimiter = limiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this api please try again in an hour",
});

app.use(cookieparser());

//data sanitization against NoSQL query injection
app.use(monogsantize());
//Data sanitization--malicious html code
app.use(xss());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/sitereport", siteRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} url`));
});

module.exports = app;
