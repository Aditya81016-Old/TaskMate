import { UserInterface } from "../data/TSComponents";
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
    .catch((error) => console.error(error));
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
