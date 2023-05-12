import { UserInterface } from "../data/TSComponents";
import { User } from "../data/Variables";
import { URL } from "../data/Variables";

export async function createUser(User: UserInterface) {
  let fetchedData;

  await fetch(URL + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(User),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data != undefined) {
        User._id = data.data._id;
        User.categories = data.data.categories;
      }
      fetchedData = data;
    })
    .catch((error) => console.log(error));
  return fetchedData;
}

export async function authenticateUser(User: UserInterface) {
  let fetchedData;
  await fetch(URL + `/user?email=${User.email}&password=${User.password}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        User.name = data.data.name;
        User._id = data.data._id;
        User.categories = data.data.categories;
      }
      fetchedData = data;
    })
    .catch((error) => console.error(error));

  return fetchedData;
}

type data = {
  success: boolean;
  log: string;
};

export async function updateUser(
  password: string,
  name: string,
  email: string
): Promise<data> {
  const userString = JSON.stringify(User);
  const user = JSON.parse(userString);

  user.name = name;
  user.email = email;

  let fetchedData: data = {
    success: false,
    log: "",
  };

  await fetch(URL + `/user/${User._id}?password=${password}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success == true) {
        console.log("first");

        User.name = name;
        User.email = email;

        if (localStorage.getItem("User") != null) {
          localStorage.setItem("User", JSON.stringify(User));
        }
      }

      fetchedData = data;
    })
    .catch((error) => console.error(error));
  return fetchedData;
}

export async function deleteUser(pass: string) {
  let fetchedData = { success: false, log: "bruh" };
  const userString = JSON.stringify(User);
  const user = JSON.parse(userString);
  user.password = pass;
  await fetch(URL + `/user/${User._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data;
    })
    .catch((error) => console.error(error));

  return fetchedData;
}
