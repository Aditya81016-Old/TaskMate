import { Schema, model, Document } from "mongoose";

export interface Todo {
  task: string;
  state: string;
  dueDate?: string;
}

export interface Category {
  name: string;
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
  state: {type: String, required: true},
  dueDate: {type: String},
})

const categorySchema = new Schema<Category>({
  name: {type: String, required: true, unique: true},
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
