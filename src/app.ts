// ! BOILERPLATE START {----------------------------------
require("dotenv").config();
import express, { json, urlencoded } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import initialize_user_requests from './requests/initialize_user_requests'
import initialize_category_requests from './requests/initialize_category_requests'
const bcrypt = require("bcrypt");
const _ = require("lodash");

const app = express();
const PORT = 3000;
const URL = `http://localhost:${PORT}`;
const saltRounds = 10;

app.use(json());
app.use(urlencoded({ extended: true }));

interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

mongoose
  .connect("mongodb://0.0.0.0:27017/TodoMate")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// ! --------------------------------} BOILERPLATE END

// * / --route
// * this route will send the home page
app.get("/", (req, res) => {
  res.send("LesGo");
});

// ! CRUD ON USER START {-------------------------------
initialize_user_requests(app, bcrypt, saltRounds, URL)
// ! -------------------------------} CRUD ON USER END


// ! CRUD ON CATEGORIES {------------------------------
initialize_category_requests(app)
// ! --------------------------} CRUD ON TODO LIST END

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export { app, bcrypt, saltRounds, URL }