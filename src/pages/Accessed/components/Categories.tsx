import { CategoryInterface } from "../../../data/TSComponents";
import { User } from "../../../data/Variables";
import { createCategory } from "../../../modules/Categories";
import Category from "../../../units/Category";
import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import $ from "jquery";
import { toggleClass } from "../../../modules/Functions";

export default function Categories() {
  // const {categories} = User
  const [categories, setCategories] = useState(User.categories);
  const [activeCategory, setActiveCategory] = useState(
    "id" + User.categories[0]?._id
  );

  function getCategoriesSuperset() {
    const res = User.categories;
    setCategories(res);
  }

  async function createCategorySuperset() {
    if (String($("#category-name-input").val()).length > 0) {
      await createCategory(String($("#category-name-input").val()));
      setCategories(User.categories);
      toggleAddCategory()
      $("#category-name-input").val("")
    }
  }

  function setActiveCategorySuperset(id: string) {
    setActiveCategory(id);

    const prevElement = document.querySelectorAll(".category.active");
    prevElement[0]?.classList.remove("active");

    const presElement = document.querySelectorAll(`.category#${id}`);
    presElement[0]?.classList.add("active");

    console.log("prev: \n", prevElement[0]?.classList);
    console.log("pres: \n", presElement[0]?.classList);
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
          />
        ))}

        <Category
          name="Add +"
          key="add-key"
          id="add-key"
          type="pre-defined"
          index={-1}
          handleClick={toggleAddCategory}
        />
        <AddCategory toggleFunction={toggleAddCategory} addFunction={createCategorySuperset} />
      </div>
    </>
  );
}
