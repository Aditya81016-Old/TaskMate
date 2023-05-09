import { useEffect } from "react";
import "./style.sass";
import { CategoryInterface, TaskInterface } from "../data/TSComponents";
import { User } from "../data/Variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

type props = {
  name: string;
  type: string;
  id: string;
  index: number;
  handleClick: (category: string) => void;
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

export default function Category(props: props) {
  const { name, type, id, index, handleClick, setFunctions } = props;
  const [setActiveCategoryId, setActiveCategory, setTodoList] = setFunctions;

  function handleClickSuperset(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    handleClick(e.currentTarget.id);
    if (e.currentTarget.id != "idadd-key") updatePage(e.currentTarget.id);
  }

  function updatePage(id: string) {
    id = id == "first-element" ? User.categories[0]?._id : id.replace("id", "");

    const activeCategoryId = "id" + id;
    setActiveCategoryId(activeCategoryId);

    const activeCategory = User.categories.find(
      (obj) => obj._id == activeCategoryId.replace("id", "")
    );

    setActiveCategory(activeCategory);
    setTodoList(activeCategory?.todos);
  }

  function toogleOption(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    $(".options").toggleClass("hidden");
    $(".option-block").toggleClass("hidden");
    $(".options").css(`top`, `${e.clientY}px`);
    $(".options").css(`left`, `${e.clientX}px`);
  }

  useEffect(() => {
    function updatePageUseEffect(id: string) {
      id =
        id == "first-element" ? User.categories[0]?._id : id.replace("id", "");

      const activeCategoryId = "id" + id;
      setActiveCategoryId(activeCategoryId);

      const activeCategory = User.categories.find(
        (obj) => obj._id == activeCategoryId.replace("id", "")
      );

      setActiveCategory(activeCategory);
      setTodoList(activeCategory?.todos);
    }
    if (index == 0) {
      updatePageUseEffect("first-element");
    }
  }, [index, setActiveCategoryId, setActiveCategory, setTodoList]);

  return (
    <button
      className={`category ${type} ${index == 0 && "active"} flex gap-3`}
      id={"id" + id}
      onClick={handleClickSuperset}
    >
      <div className="name">
        {name}
      </div>
        {type == "user-defined" && (
          <div
            className="icon rounded-full relative z-30 opacity-60 hover:opacity-100 px-1"
            onClick={toogleOption}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        )}
    </button>
  );
}
