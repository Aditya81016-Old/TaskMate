import { UserInterface } from "./TSComponents";

export const PORT = 3000;
export const URL = `http://localhost:${PORT}`;

export const User: UserInterface = {
    _id: "",
    name: "",
    email: "",
    password: "",
    categories: []
}