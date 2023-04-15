import User, { UserDocument, Category } from "../models/user";

import _ from "lodash";

export default function initialize_todo_requests(app): void {
  app
    .route("/user/:id/category/:category/todo")

    // * this request creates a new task in todo list of a category
    // * it requires -- id | category's urlName -- from -- params
    // * also -- task | state -- from -- body
    .post(async (req, res) => {
      const id = req.params.id;
      const categoryUrlName = req.params.category;

      const task = req.body.task;
      const state = req.body.state;

      const user = await User.findOne({ _id: id });

      // find the index of the category to update
      const categoryIndex = user.categories.findIndex(
        (category) => category.urlName == categoryUrlName
      );

      // add the new task to the tasks array of the category
      user.categories[categoryIndex].todos.push({
        task: task,
        taskUrl: _.kebabCase(task),
        state: state,
      });

      // update the user document with the new task added to the category
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { categories: user.categories },
        { new: true }
      );

      if (updatedUser) {
        return res.json({
          data: updatedUser,
          log: `Task added`,
          success: true,
        });
      } else {
        return res.json({
          log: "Failed to update user document",
          success: false,
        });
      }
    })

    // * this request responds with all the tasks in a category
    // * it requires -- id | category's urlName  -- from -- params
    .get(async (req, res) => {
      const id = req.params.id;
      const categoryUrlName = req.params.category;

      const user = await User.findOne({ _id: id });

      // find the index of the category to update
      const categoryIndex = user.categories.findIndex(
        (category) => category.urlName == categoryUrlName
      );

      if (user.categories[categoryIndex].todos) {
        return res.json({
          data: user.categories[categoryIndex].todos,
          log: `All tasks fetched`,
          success: true,
        });
      } else {
        return res.status(500).json({
          log: "Failed to fetch the tasks",
          success: false,
        });
      }
    });

  app
    .route("/user/:id/category/:category/todo/:todo")

    // * this request responds with all the details of a task
    // * it requires -- id | category's urlName | todo's taskUrl -- from -- params
    .get(async (req, res) => {
      const id = req.params.id;
      const categoryUrlName = req.params.category;
      const taskUrl = req.params.todo;

      const user = await User.findOne({ _id: id });

      // find the index of the category to update
      const categoryIndex = user.categories.findIndex(
        (category) => category.urlName == categoryUrlName
      );

      const taskIndex = user.categories[categoryIndex].todos.findIndex(
        (todo) => todo.taskUrl == taskUrl
      );

      if (user.categories[categoryIndex].todos[taskIndex]) {
        return res.json({
          data: user.categories[categoryIndex].todos[taskIndex],
          log: `Data of the tasks fetched`,
          success: true,
        });
      } else {
        return res.json({
          log: "Failed to fetch the task's data",
          success: false,
        });
      }
    })

    // * this request updates the details of a task
    // * it requires -- id | category's urlName | todo's taskUrl -- from -- params
    // * also -- task | state -- from -- body
    .patch(async (req, res) => {
      const id = req.params.id;
      const categoryUrlName = req.params.category;
      const taskUrl = req.params.todo;

      const task = req.body.task;
      const state = req.body.state;

      const user = await User.findOne({ _id: id });

      // find the index of the category to update
      const categoryIndex = user.categories.findIndex(
        (category) => category.urlName == categoryUrlName
      );

      const taskIndex = user.categories[categoryIndex].todos.findIndex(
        (todo) => todo.taskUrl == taskUrl
      );

      const todo = {
        task: task,
        taskUrl: _.kebabCase(task),
        state: state,
      };

      user.categories[categoryIndex].todos[taskIndex] = todo;

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { categories: user.categories },
        { new: true }
      );

      if (user.categories[categoryIndex].todos[taskIndex]) {
        return res.json({
          data: user,
          log: `Data of the tasks updated`,
          success: true,
        });
      } else {
        return res.status(500).json({
          log: "Failed to update the task's data",
          success: false,
        });
      }
    })

    // * this request deletes a task
    // * it requires -- id | category's urlName | todo's taskUrl -- from -- params
    .delete(async (req, res) => {
      const id = req.params.id;
      const categoryUrlName = req.params.category;
      const taskUrl = req.params.todo;

      const task = req.body.task;
      const state = req.body.state;

      const user = await User.findOne({ _id: id });

      // find the index of the category to update
      const categoryIndex = user.categories.findIndex(
        (category) => category.urlName == categoryUrlName
      );

      const taskIndex = user.categories[categoryIndex].todos.findIndex(
        (todo) => todo.taskUrl == taskUrl
      );

      user.categories[categoryIndex].todos.splice(taskIndex, 1);

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { categories: user.categories },
        { new: true }
      );

      if (updatedUser) {
        return res.json({
          data: user,
          log: `Task deleted`,
          success: true,
        });
      } else {
        return res.status(500).json({
          log: "Failed to delete the task",
          success: false,
        });
      }
    });
}
