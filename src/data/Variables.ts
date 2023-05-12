import { UserInterface } from "./TSComponents";

export class Store {
  value: any = undefined;
  constructor(value: any) {
    this.value = value;
  }

  set(value: any) {
    this.value = value;
  }
}

export const PORT = 3000;
export const URL = `http://localhost:${PORT}`;

export const User: UserInterface = {
  _id: "",
  name: "",
  email: "",
  password: "",
  categories: [],
};
