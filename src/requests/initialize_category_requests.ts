import User, { UserDocument, Category } from "../models/user";
const _ = require("lodash");

export default function initialize_category_requests(app) {
  // ! CRUD ON CATEGORIES {------------------------------
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
        res.json({ data: user, log: "New category created", success: true });
      } catch (error) {
        res.json({ log: "failed to add category", success: false });
      }
    })

    // * this request responds with all the categories in user
    // * it requires -- id -- from -- params
    .get(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (!user)
        res.json({
          log: "Something went wrong: user not found",
          success: false,
        });
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
    // * it requires -- id | category's urlName -- from -- params
    .get(async (req, res) => {
      const user = await User.findOne({
        _id: req.params.id,
        "categories.urlName": req.params.category,
      });
      if (!user)
        res.json({
          log: "Something went wrong: category not found",
          success: false,
        });
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
      const categoryName = req.body.categoryName;
      const user = await User.findOne({
        _id: req.params.id,
        "categories.urlName": req.params.category,
      });
      if (!user)
        res.json({
          log: "Something went wrong: user not found",
          success: false,
        });
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
          log: "Successfully renamed",
          data: user.categories,
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
        res.json({
          log: "Something went wrong: user not found",
          success: false,
        });
      else {
        const category = user.categories.find(
          (category) => category.urlName === req.params.category
        );
        const filter = { "categories.urlName": req.params.category };
        const update = {
          $pull: { categories: { urlName: req.params.category } },
        };
        await User.updateOne(filter, update);
        res.json({
          log: "Successfully deleted the category",
          success: true,
        });
      }
    });
  // ! --------------------------} CRUD ON TODO LIST END
}
