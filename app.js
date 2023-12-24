const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const booksRouter = require("./routes/bookRoutes");
const borrowersRouter = require("./routes/borrowerRoutes");
const borrowingRouter = require("./routes/borrowingRoutes");
const reportsRouter = require("./routes/reportsRoutes");

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/borrowing/checkout", limiter);
app.use("/borrowing/return", limiter);

app.use(cors());
app.use(express.json());

app.use("/books", booksRouter);
app.use("/borrowers", borrowersRouter);
app.use("/borrowing", borrowingRouter);
app.use("/reports", reportsRouter);

module.exports = app;
