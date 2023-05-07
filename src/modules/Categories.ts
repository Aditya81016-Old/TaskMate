import { SetStateAction } from "react";
import { User } from "../data/Variables";
import { URL } from "../data/Variables";

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

export async function getCategories(): Promise<SetStateAction<[]>>{
    await fetch(URL + `/user/${User._id}/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
            User.categories = data.data
            return data.data
        })
        .catch((error) => console.error("error: ", error));
      return []
}