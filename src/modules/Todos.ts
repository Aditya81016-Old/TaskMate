import { User } from "../data/Variables";
import { URL } from "../data/Variables";

export async function createTask(categoryUrl: string, taskName: string) {
  const category = User.categories.find((c) => c.urlName == categoryUrl);
  const existingTask = category?.todos.find((t) => t.task == taskName);
  let fetchedData = { success: false, log: "" };

  if (existingTask == undefined) {
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
  } else {
    fetchedData = {
      success: false,
      log: "Task in the category already exists",
    };
  }
  return fetchedData;
}

export async function deleteTask(categoryUrl: string, taskUrl: string) {
  let fetchedData = { success: false, log: "" };

  await fetch(
    URL + `/user/${User._id}/category/${categoryUrl}/todo/${taskUrl}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data;
      User.categories = data.data.categories;
    });

  return fetchedData;
}
