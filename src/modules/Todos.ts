import { User } from "../data/Variables";
import { URL } from "../data/Variables";

export async function createTask(categoryUrl: string, taskName: string) {
  let fetchedData = { success: false, log: "" };
  await fetch(URL + `/user/${User._id}/category/${categoryUrl}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: taskName,
      state: "Pending",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      User.categories = data.data.categories;
      fetchedData = data;
    });
  return fetchedData;
}
