import { TaskInterface } from "../../../data/TSComponents";
import { toggleClass } from "../../../modules/Functions";
import { createTask } from "../../../modules/Todos";
import Todo from "../../../units/Todo";
import AddTodo from "./AddTodo";
import InputPopup from "./InputPopup";
import $ from "jquery";
import { CategoryInterface } from "../../../data/TSComponents";

type props = {
  todoList: TaskInterface[] | undefined;
  useActiveCategory: [
    activeCategory: CategoryInterface | undefined,
    setActiveCategory: React.Dispatch<
      React.SetStateAction<CategoryInterface | undefined>
    >
  ];
};

export default function Todos(props: props) {
  const { todoList, useActiveCategory } = props;
  const [activeCategory] = useActiveCategory;

  async function AddTodoSuperset() {
    const data = await createTask(
      String(activeCategory?.urlName),
      String($("#AddTodoPopup-input").val())
    );

    console.log(data);

    AddTodoToggle();
  }

  function AddTodoToggle() {
    toggleClass("#AddTodoPopup", "hidden", "flex");
  }
  return (
    <>
      <div className="todos">
        {todoList?.map((todo) => (
          <Todo todo={todo} key={todo._id} id={todo._id} />
        ))}
        <AddTodo clickFucntion={AddTodoToggle} />
        <InputPopup
          toggleFunction={AddTodoToggle}
          submitFunction={AddTodoSuperset}
          id="AddTodoPopup"
          title="Create a new task"
          placeholder="name of your new task here..."
          warning=""
        />
      </div>
    </>
  );
}
