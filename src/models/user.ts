import { Schema, model, Document } from "mongoose";

export interface Todo {
  task: string;
  taskUrl: string;
  state: string;
}

export interface Category {
  name: string;
  urlName: string;
  todos: Todo[];
}

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  categories: Category[];
}

export interface UserDocument extends UserInterface, Document {}


const todoSchema = new Schema<Todo>({
  task: {type: String, required: true},
  taskUrl: {type: String, required: true},
  state: {type: String, required: true},
})

const categorySchema = new Schema<Category>({
  name: {type: String, required: true},
  urlName: {type: String, required: true},
  todos: {type: [todoSchema], required: true},
})


// Define the user schema
const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  categories: {
    type: [categorySchema],
    required: true,
  },
});

// Create the user model
const User = model<UserDocument>("User", userSchema);

export default User;
