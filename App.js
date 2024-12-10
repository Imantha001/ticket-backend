const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");



app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 2001;

const userRouter = require("./src/routers/userRouter");
const ticketRouter = require("./src/routers/ticketRouter");

app.use("/u1/user", userRouter);
app.use("/u1/ticket", ticketRouter);




const handleError = require("./src/Utills/errorHandling");
app.use((req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});



app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});