import Categories from "../components/Categories";
import Todos from "../components/Todos";
import { User } from "../../../data/Variables";
import { useState } from "react";

export default function Home() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    "id" + User.categories[0]?._id
  );

  const [activeCategory, setActiveCategory] = useState(
    User.categories.find(obj => obj._id == activeCategoryId)
  );

  const [todoList, setTodoList] = useState(activeCategory?.todos)

  console.log(activeCategoryId, activeCategory, todoList)

  return (
    <>
      <Categories useCategory={[activeCategoryId, setActiveCategoryId]} setFunctions={[setActiveCategoryId, setActiveCategory, setTodoList]} />
      <Todos todoList={JSON.stringify(todoList)} />
    </>
  );
}
