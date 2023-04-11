// ! BOILERPLATE START {----------------------------------
require("dotenv").config();
import express, { json, urlencoded } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import User, {
  UserInterface,
  UserDocument,
  Category,
  Todo,
} from "./models/user";
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
// * /user --route
app
  .route("/user")

  // * this route will create new user
  // * this route needs -- name | email | password -- in body
  .post((req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        res.json({
          log: `Error encrypting user password: ${err.message}`,
          success: false,
        });
      } else if (hashedPassword) {
        const newUser: UserInterface = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          categories: [{
            name: "Home",
            urlName: _.kebabCase("Home"),
            todos: [
              {
                task: `Create a new task in "Home"`,
                state: "Pending",
              },
            ],
          }]
        };

        const user = new User(newUser);

        user
          .save()
          .then((user) => {
            res.json({
              log: `New user ${user.name} has been added with id ${user._id}`,
              success: true,
            });
          })
          .catch((error) => {
            res.json({
              log: `email already used: ${error}`,
              success: false,
            });
          });
      }
    });
  })

// * this route will repond with an array with all the users in it
// * this request dosen't require any parameters
  .get(async (req, res) => {
    const email = req.query.email;
    let user = await User.find();

    if (!user) {
      res.json({ log: "failed to fetch users", success: false });
    } else {
      res.json({
        data: user,
        log: `Fetched all the users`,
        success: true,
      });
    }
  });

// * /user/:id --route
app
  .route("/user/:id")

  // * this route responds with all the details of a user
  // * the user depends on the id parameter in req
  .get(async (req, res) => {
    const id = req.params.id;
    let user: UserDocument | null = await User.findOne({ _id: id });

    if (!user) {
      res.json({ log: "User not found", success: false });
    } else {
      res.json({
        data: user,
        log: `User with id: ${user?._id} and email: ${user?.email} found!`,
        success: true,
      });
    }
  })

  // * this request updates the detailes of the user
  // * it requires -- name | email | password -- depending on what to update in -- body
  // * aswell as -- current password -- for verification through -- query
  .patch(async (req, res) => {
    try {
      const id: string = req.params.id;
      const pass = req.query.password;
      const user: UserDocument | null = await User.findOne({ _id: id });
      if (!user) {
        return res.json({ log: "User not found", success: false });
      }

      bcrypt.compare(pass, user.password, async (err, result) => {
        if (err) {
          return res.json({ log: `Something Went Wrong`, success: false });
        } else if (result) {
          bcrypt.hash(
            req.body.password,
            saltRounds,
            async (err, hashedPassword) => {
              if (err) {
                res.json({
                  log: `Error encrypting user password: ${err.message}`,
                  success: false,
                });
              } else if (hashedPassword) {
                req.body.password = hashedPassword;
                user.set(req.body);
                await user.save();
                return res.json({
                  data: user,
                  log: `User with id: ${id} found and updated`,
                  success: true,
                });
              }
            }
          );
        } else {
          return res.json({ message: "Wrong Password", success: false });
        }
      });
    } catch (error) {
      console.error(error);
      return res.json({ message: "Server Error", success: false });
    }
  })

  // * this request deletes user
  // * it requires -- name | email | password -- from -- body
  // * also -- id -- from -- params
  .delete(async (req, res) => {
    const id: string = req.params.id;
    fetch(`${URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        bcrypt.compare(
          req.body.password,
          data.data.password,
          async (err, result) => {
            if (err) {
              return res.json({ log: `Something Went Wrong`, success: false });
            } else if (result) {
              try {
                const result = await User.deleteOne({
                  name: req.body.name,
                  email: req.body.email,
                  _id: id,
                });
                if (result.deletedCount === 1) {
                  return res.json({
                    log: `User with ID ${id} deleted successfully.`,
                    success: true,
                  });
                } else {
                  return res.json({
                    log: `Please check your email or username`,
                    success: false,
                  });
                }
              } catch (err) {
                return res.json({ log: `There was an error`, success: false });
              }
            } else {
              return res.json({ log: `Wrong Password`, success: false });
            }
          }
        );
      })
      .catch((error) => {
        // handle error
        return res.json({ log: `There was an error while deleting your account: ${error}`, success: false });
      });
  });
// ! -------------------------------} CRUD ON USER END

// ! CRUD ON TODO LIST {------------------------------
app
  .route("/user/:id/category")

  // * this request adds new catagory to user
  // * it requires -- categoryName -- from -- body
  // * also -- id -- from -- params
  .post(async (req, res) => {
    const id = req.params.id;
    const categoryName =
      req.body.categoryName != undefined ? req.body.categoryName : null;
    const newCategory: Category = {
      name: categoryName,
      urlName: _.kebabCase(categoryName),
      todos: [
        {
          task: `Create a new task in ${categoryName}`,
          state: "Pending",
        },
      ],
    };
    try {
      const user: UserDocument = await User.findByIdAndUpdate(
        id,
        { $addToSet: { categories: newCategory } },
        { new: true }
      );
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Could not add favorite" });
    }
  })

  // * this request responds with all the categories in user 
  // * it requires -- id -- from -- params
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user)
      res.json({ log: "Something went wrong: user not found", success: false });
    else {
      res.json({
        log: "Successfully fetched all the user's categories",
        data: user.categories,
        success: true,
      });
    }
  });

app
  .route("/user/:id/category/:category")

  // * this request responds with all the details of a category of a user
  // * it requires -- id | category -- from -- params
  .get(async (req, res) => {
    const user = await User.findOne({
      _id: req.params.id,
      "categories.urlName": req.params.category,
    });
    if (!user)
      res.json({ log: "Something went wrong: category not found", success: false });
    else {
      const category = user.categories.find(
        (category) => category.urlName === req.params.category
      );
      res.json({
        log: "Successfully fetched all the data of the category",
        data: category,
        success: true,
      });
    }
  })

  // * this request renames specified category of specified user
  // * it requires -- id | category -- from -- params
  // * also -- categoryName -- from body
  .patch(async (req, res) => {
    const categoryName = req.body.categoryName
    const user = await User.findOne({
      _id: req.params.id,
      "categories.urlName": req.params.category,
    });
    if (!user)
      res.json({ log: "Something went wrong: user not found", success: false });
    else {
      const category = user.categories.find(
        (category) => category.urlName === req.params.category
      );
      const filter = { "categories.urlName": req.params.category };
      const update = {
        $set: {
          "categories.$.name": categoryName,
          "categories.$.urlName": _.kebabCase(categoryName),
        },
      };
      await User.updateOne(filter, update);
      category.name = categoryName;
      category.urlName = _.kebabCase(categoryName);
      res.json({
        log: "Successfully updated the data of the category",
        data: category,
        success: true,
      });
    }
  })

  // * deletes the specified category of a specified user
  // * it requires -- id | category -- from -- params
  .delete(async (req, res) => {
    const user = await User.findOne({
      _id: req.params.id,
      "categories.urlName": req.params.category,
    });
    if (!user)
      res.json({ log: "Something went wrong: user not found", success: false });
    else {
      const category = user.categories.find(
        (category) => category.urlName === req.params.category
      );
      const filter = { "categories.urlName": req.params.category };
      const update = {
        $pull:  { categories: { urlName: req.params.category } }
      };
      await User.updateOne(filter, update);
      res.json({
        log: "Successfully deleted the category",
        success: true,
      });
    }
  })
// ! --------------------------} CRUD ON TODO LIST END

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
