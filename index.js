require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const app = express();
const userRouter = require("./src/routes/User");
const messageRouter = require("./src/routes/Message");

//database connection
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(messageRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
