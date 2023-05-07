import { CategoryInterface } from "../../../data/TSComponents";
import { User } from "../../../data/Variables";
import { createCategory } from "../../../modules/Categories";
import Category from "../../../units/Category";
import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import $ from "jquery";
import { toggleClass } from "../../../modules/Functions";

type props = {
  useCategory: [
    activeCategoryId: string,
    setActiveCategoryId: React.Dispatch<React.SetStateAction<string>>
  ];

  setFunctions: [
    setActiveCategoryId: React.Dispatch<React.SetStateAction<string>>,
    setActiveCategory: React.Dispatch<React.SetStateAction<CategoryInterface | undefined>>,
    setTodoList: React.Dispatch<React.SetStateAction<[] | undefined>>
  ]
};

export default function Categories(porps: props) {
  // const {categories} = User
  const { useCategory, setFunctions } = porps;
  const [, setActiveCategoryId] = useCategory;
  const [categories, setCategories] = useState(User.categories);

  function getCategoriesSuperset() {
    const res = User.categories;
    setCategories(res);
  }

  async function createCategorySuperset() {
    if (String($("#category-name-input").val()).length > 0) {
      await createCategory(String($("#category-name-input").val()));
      setCategories(User.categories);
      toggleAddCategory();
      $("#category-name-input").val("");
    }
  }

  function setActiveCategorySuperset(id: string) {
    setActiveCategoryId(id);

    const prevElement = document.querySelectorAll(".category.active");
    prevElement[0]?.classList.remove("active");

    const presElement = document.querySelectorAll(`.category#${id}`);
    presElement[0]?.classList.add("active");
  }

  function toggleAddCategory() {
    toggleClass("#Add-Category", "hidden", "flex");
  }

  useEffect(() => {
    getCategoriesSuperset();
  });

  return (
    <>
      <div id="Categories">
        {categories.map((category: CategoryInterface, index: number) => (
          <Category
            name={category.name}
            key={category._id}
            id={category._id}
            index={index}
            type="user-defined"
            handleClick={setActiveCategorySuperset}
            setFunctions={setFunctions}
          />
        ))}

        <Category
          name="Add +"
          key="add-key"
          id="add-key"
          type="pre-defined"
          index={-1}
          handleClick={toggleAddCategory}
          setFunctions={setFunctions}
        />
        <AddCategory
          toggleFunction={toggleAddCategory}
          addFunction={createCategorySuperset}
        />
      </div>
    </>
  );
}
