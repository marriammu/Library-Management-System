const express = require("express");
const cors = require("cors");


const booksRouter = require("./routes/bookRoutes");
const borrowersRouter = require("./routes/borrowerRoutes");
const borrowingRouter = require("./routes/borrowingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", booksRouter);
app.use("/borrowers", borrowersRouter);
app.use("/borrowing", borrowingRouter);

module.exports = app;
