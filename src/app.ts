// ! BOILERPLATE START {----------------------------------
require("dotenv").config();
import express, { json, urlencoded } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import User, { UserInterface, UserDocument, Category, Todo } from "./models/user";
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;
const URL = `http://localhost:${PORT}`
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
app.get("/", (req, res) => {
  res.send("LesGo");
});

// ! CRUD ON USER START {-------------------------------
// * /user --route
app
  .route("/user")
  .post((req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        res.json({
          log: `Error encrypting user password: ${err.message}`,
          status: false,
        });
      } else if (hashedPassword) {
        const newUser: UserInterface = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          categories: req.body.categories
        };

        const user = new User(newUser);

        user
          .save()
          .then((user) => {
            res.json({
              log: `New user ${user.name} has been added with id ${user._id}`,
              status: true,
            });
          })
          .catch((error) => {
            res.json({
              log: `email already used`,
              status: false,
            });
          });
      }
    });
  })
  .get(async (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    let user: UserDocument | null = null;

    if (id != undefined && mongoose.isValidObjectId(id)) {
      user = await User.findOne({ _id: id });
    } else if (email != undefined) {
      user = await User.findOne({ email: email });
    }

    if (!user) {
      res.json({ log: "User not found", status: false });
    } else {
      res.json({
        data: user,
        log: `User with id: ${user?._id} and email: ${user?.email} found!`,
        status: true,
      });
    }
  });

// * /user/:id --route
app
  .route("/user/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    let user: UserDocument | null = await User.findOne({ _id: id });

    if (!user) {
      res.json({ log: "User not found", status: false });
    } else {
      res.json({
        data: user,
        log: `User with id: ${user?._id} and email: ${user?.email} found!`,
        status: true,
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const id: string = req.params.id;
      const pass = req.query.password;
      const user: UserDocument | null = await User.findOne({ _id: id });
      if (!user) {
        return res.json({ log: "User not found", status: false });
      }

      bcrypt.compare(pass, user.password, async (err, result) => {
        if (err) {
          return res.json({ log: `Something Went Wrong`, status: false });
        } else if (result) {
          bcrypt.hash(
            req.body.password,
            saltRounds,
            async (err, hashedPassword) => {
              if (err) {
                res.json({
                  log: `Error encrypting user password: ${err.message}`,
                  status: false,
                });
              } else if (hashedPassword) {
                req.body.password = hashedPassword;
                user.set(req.body);
                await user.save();
                return res.json({
                  data: user,
                  log: `User with id: ${id} found and updated`,
                  status: true,
                });
              }
            }
          );
        } else {
          return res.json({ message: "Wrong Password", status: false });
        }
      });
    } catch (error) {
      console.error(error);
      return res.json({ message: "Server Error", status: false });
    }
  })
  .delete(async (req, res) => {
    const id: string = req.params.id;
    console.log("runs");
    fetch(`${URL}/user?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        bcrypt.compare(
          req.body.password,
          data.data.password,
          async (err, result) => {
            console.log(err, req.body.password, data.data.password);
            if (err) {
              return res.json({ log: `Something Went Wrong`, status: false });
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
                    status: true,
                  });
                } else {
                  return res.json({
                    log: `Please check your email or username`,
                    status: false,
                  });
                }
              } catch (err) {
                console.log(err);
                return res.json({ log: `There was an error`, status: false });
              }
            } else {
              return res.json({ log: `Wrong Password`, status: false });
            }
          }
        );
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  });
// ! -------------------------------} CRUD ON USER END

// ! CRUD ON TODO LIST {------------------------------
app.route('/:id')
.post(async (req, res) => {
  const id = req.params.id;
  const categoryName = req.body.categoryName != undefined ? req.body.categoryName : null;
  const newCategory: Category = {
    name: categoryName,
    todos: [
      {
        task: `Create a new task in ${categoryName}`,
        state: 'Pending',
      }
    ]
  }
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
// ! --------------------------} CRUD ON TODO LIST END

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
