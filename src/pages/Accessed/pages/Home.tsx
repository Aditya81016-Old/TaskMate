import Categories from "../components/Categories";
import Todos from "../components/Todos";
import { User } from "../../../data/Variables";
import { useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState(User.categories);

  const [activeCategoryId, setActiveCategoryId] = useState(
    "id" + User.categories[0]?._id
  );

  const [activeCategory, setActiveCategory] = useState(
    User.categories.find((obj) => obj._id == activeCategoryId)
  );

  const [todoList, setTodoList] = useState(activeCategory?.todos);

  return (
    <>
      <Categories
        useCategoryId={[activeCategoryId, setActiveCategoryId]}
        useActiveCategory={[activeCategory, setActiveCategory]}
        useCategories={[categories, setCategories]}
        setFunctions={[setActiveCategoryId, setActiveCategory, setTodoList]}
      />
      <Todos
        todoList={todoList}
        useActiveCategory={[activeCategory, setActiveCategory]}
        setTodoList={setTodoList}
      />
    </>
  );
}
