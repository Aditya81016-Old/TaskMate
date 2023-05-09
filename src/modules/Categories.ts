import { SetStateAction } from "react";
import { User } from "../data/Variables";
import { URL } from "../data/Variables";
import { CategoryInterface, TaskInterface } from "../data/TSComponents";

export async function createCategory(categoryName: string) {
  await fetch(URL + `/user/${User._id}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryName: categoryName }),
  })
    .then((res) => res.json())
    .then((data) => {
      User.categories = data.data.categories;
    })
    .catch((error) => console.error(error));
}

export async function getCategories(): Promise<SetStateAction<[]>> {
  await fetch(URL + `/user/${User._id}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      User.categories = data.data;
      return data.data;
    })
    .catch((error) => console.error("error: ", error));
  return [];
}

export async function renameCategory(categoryUrl: string, categoryName: string) {
  await fetch(
    URL + `/user/${User._id}/category/${categoryUrl}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: categoryName }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      User.categories = data.data;
    });
}

export async function deleteCategory(
  categoryUrl: string,
  setActiveCategorySuperset: (id: string) => void,
  setTodoList: React.Dispatch<React.SetStateAction<TaskInterface[] | undefined>>
) {
  await fetch(URL + `/user/${User._id}/category/${categoryUrl}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);

      await getCategories();
      // setActiveCategory(User.categories[0]);
      setActiveCategorySuperset("id" + User.categories[0]._id);
      console.log("id" + User.categories[0]._id);
      setTodoList(User.categories[0].todos);
    });
}
