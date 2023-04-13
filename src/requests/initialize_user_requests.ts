import User, { UserInterface, UserDocument } from "../models/user";
const _ = require("lodash");

export default function initialize_user_requests(app, bcrypt, saltRounds, URL) {
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
            log: `Error encrypting user password`,
            success: false,
          });
        } else if (hashedPassword) {
          const newUser: UserInterface = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            categories: [
              {
                name: "Home",
                urlName: _.kebabCase("Home"),
                todos: [
                  {
                    task: `Create a new task in "Home"`,
                    state: "Pending",
                  },
                ],
              },
            ],
          };

          const user = new User(newUser);

          user
            .save()
            .then((user) => {
              res.json({
                log: `New user created`,
                data: user,
                success: true,
              });
            })
            .catch((error) => {
              res.json({
                log: `Email already exists`,
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
          log: `Details of the user sent`,
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
            return res.json({
              log: `Something Went Wrong: ${err}`,
              success: false,
            });
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
                  try {
                    await user.validate();
                    await user.save();
                    return res.json({
                      data: user,
                      log: `User updated`,
                      success: true,
                    });
                  } catch (err) {
                    return res.json({
                      log: `Email already exists`,
                      success: false,
                    });
                    return;
                  }   
                }
              }
            );
          } else {
            return res.json({ log: "Wrong Password", success: false });
          }
        });
      } catch (error) {
        console.error(error);
        return res.json({ log: "Server Error", success: false });
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
                return res.json({
                  log: `Something Went Wrong`,
                  success: false,
                });
              } else if (result) {
                try {
                  const result = await User.deleteOne({
                    name: req.body.name,
                    email: req.body.email,
                    _id: id,
                  });
                  if (result.deletedCount === 1) {
                    return res.json({
                      log: `Successfully deleted user`,
                      success: true,
                    });
                  } else {
                    return res.json({
                      log: `Wrong email or username`,
                      success: false,
                    });
                  }
                } catch (err) {
                  return res.json({
                    log: `There was an error`,
                    success: false,
                  });
                }
              } else {
                return res.json({ log: `Wrong Password`, success: false });
              }
            }
          );
        })
        .catch((error) => {
          // handle error
          return res.json({
            log: `There was an error while deleting your account: ${error}`,
            success: false,
          });
        });
    });
  // ! -------------------------------} CRUD ON USER END
}
