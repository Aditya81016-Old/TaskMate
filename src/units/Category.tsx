import { useEffect } from "react";
import "./style.sass";
import { CategoryInterface } from "../data/TSComponents";
import { User } from "../data/Variables";

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
    setTodoList: React.Dispatch<React.SetStateAction<[] | undefined>>
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
		if (e.currentTarget.id != "idadd-key")
    updatePage(e.currentTarget.id);
  }

  function updatePage(id: string) {
    console.log("id: ", id);
    id = id == "first-element" ? User.categories[0]?._id : id.replace("id", "");

    const activeCategoryId = "id" + id;
    setActiveCategoryId(activeCategoryId);

    const activeCategory = User.categories.find(
      (obj) => obj._id == activeCategoryId.replace("id", "")
    );

    setActiveCategory(activeCategory);
    setTodoList(activeCategory?.todos);
  }

  useEffect(() => {
		function updatePageUseEffect(id: string) {
			console.log("id: ", id);
			id = id == "first-element" ? User.categories[0]?._id : id.replace("id", "");
	
			const activeCategoryId = "id" + id;
			setActiveCategoryId(activeCategoryId);
	
			const activeCategory = User.categories.find(
				(obj) => obj._id == activeCategoryId.replace("id", "")
			);
	
			setActiveCategory(activeCategory);
			setTodoList(activeCategory?.todos);
		}
    if (index == 0) {
			updatePageUseEffect("first-element")
    }
  }, [index, setActiveCategoryId, setActiveCategory, setTodoList]);


  return (
    <button
      className={`category ${type} ${index == 0 && "active"}`}
      id={"id" + id}
      onClick={handleClickSuperset}
    >
      <div className="name">{name}</div>
    </button>
  );
}
