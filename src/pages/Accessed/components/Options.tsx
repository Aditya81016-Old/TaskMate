import $ from "jquery";
import { CategoryInterface, TaskInterface } from "../../../data/TSComponents";
import { renameCategory, deleteCategory } from "../../../modules/Categories";
import InputPopup from "./InputPopup";
import { toggleClass } from "../../../modules/Functions";
import { User } from "../../../data/Variables";

type props = {
  useActiveCategory: [
    activeCategory: CategoryInterface | undefined,
    setActiveCategory: React.Dispatch<
      React.SetStateAction<CategoryInterface | undefined>
    >
  ];

  setActiveCategorySuperset: (id: string) => void;

  setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>;

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

export default function Options(props: props) {
  const {
    useActiveCategory,
    setActiveCategorySuperset,
    setCategories,
    setFunctions,
  } = props;
  const [activeCategory] = useActiveCategory;
  const [, , setTodoList] = setFunctions;

  async function renameCategorySuperset() {
    if (String($("#Rename-Category-input").val()).length > 0) {
      await renameCategory(
        String(activeCategory?.urlName),
        String($("#Rename-Category-input").val())
      );
      setCategories(User.categories);
      $("#Rename-Category-input").val("");
      togglePopup();
      toggleOption();
    }
  }

  async function deleteCategorySuperset() {
    await deleteCategory(
      String(activeCategory?.urlName),
      setActiveCategorySuperset,
      setTodoList
    );
    toggleOption();
  }

  function toggleOption() {
    $(".options").toggleClass("hidden");
    $(".option-block").toggleClass("hidden");
  }

  function togglePopup() {
    toggleClass("#Rename-Category", "hidden", "flex");
  }

  return (
    <>
      <div className="options hidden">
        <button className="rename" onClick={togglePopup}>
          Rename
        </button>
        <button className="delete" onClick={deleteCategorySuperset}>
          Delete
        </button>
      </div>
      <div
        onClick={toggleOption}
        className="option-block fixed w-screen h-screen top-0 left-0 z-20 bg-black opacity-10 hidden"
      ></div>
      <InputPopup
        toggleFunction={togglePopup}
        submitFunction={renameCategorySuperset}
        id="Rename-Category"
        title="Rename your category"
        placeholder="new name of your category here..."
      />
    </>
  );
}
