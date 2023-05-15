import { CategoryInterface, TaskInterface } from "../../../data/TSComponents";
import { User } from "../../../data/Variables";
import { createCategory } from "../../../modules/Categories";
import Category from "../../../units/Category";
import { useEffect, useState } from "react";
import InputPopup from "./InputPopup";
import $ from "jquery";
import { toggleClass } from "../../../modules/Functions";
import Options from "./Options";

type props = {
  useCategoryId: [
    activeCategoryId: string,
    setActiveCategoryId: React.Dispatch<React.SetStateAction<string>>
  ];

  useActiveCategory: [
    activeCategory: CategoryInterface | undefined,
    setActiveCategory: React.Dispatch<
      React.SetStateAction<CategoryInterface | undefined>
    >
  ];

  useCategories: [
    categories: CategoryInterface[],
    setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>
  ];

  setFunctions: [
    setActiveCategoryId: React.Dispatch<React.SetStateAction<string>>,
    setActiveCategory: React.Dispatch<
      React.SetStateAction<CategoryInterface | undefined>
    >,
    setTodoList: React.Dispatch<
      React.SetStateAction<TaskInterface[] | undefined>
    >
  ];
};

export default function Categories(porps: props) {
  // const {categories} = User
  const { useCategoryId, useActiveCategory, useCategories, setFunctions } =
    porps;
  const [, setActiveCategoryId] = useCategoryId;
  // const [activeCategory, setActiveCategory] = useCategory;
  const [categories, setCategories] = useCategories;
  const [AddCategoryWarning, setAddCategoryWarning] = useState("");

  function getCategoriesSuperset() {
    const res = User.categories;
    setCategories(res);
  }

  async function createCategorySuperset() {
    if (String($("#Add-Category-input").val()).length > 0) {
      const data = await createCategory(String($("#Add-Category-input").val()));
      if (data.success) {
        setCategories(User.categories);
        toggleAddCategory();
        setAddCategoryWarning("");
        $("#Add-Category-input").val("");
      } else {
        if (data.log == "Category already exists")
          setAddCategoryWarning("Category already exists");
      }
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

  // function handleOptionClick() {

  // }

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
        <InputPopup
          toggleFunction={toggleAddCategory}
          submitFunction={createCategorySuperset}
          id="Add-Category"
          title="Create a new category"
          placeholder="name of your new category here..."
          warning={AddCategoryWarning}
        />

        <Options
          setFunctions={setFunctions}
          setActiveCategorySuperset={setActiveCategorySuperset}
          useActiveCategory={useActiveCategory}
          setCategories={setCategories}
        />
      </div>
    </>
  );
}
