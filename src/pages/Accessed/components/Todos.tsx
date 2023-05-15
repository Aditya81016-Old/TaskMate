import { TaskInterface } from "../../../data/TSComponents";
import { toggleClass } from "../../../modules/Functions";
import { createTask, deleteTask } from "../../../modules/Todos";
import Todo from "../../../units/Todo";
import AddTodo from "./AddTodo";
import InputPopup from "./InputPopup";
import $ from "jquery";
import { CategoryInterface } from "../../../data/TSComponents";
import { User } from "../../../data/Variables";
import { useState } from "react";

type props = {
  todoList: TaskInterface[] | undefined;
  setTodoList: React.Dispatch<
    React.SetStateAction<TaskInterface[] | undefined>
  >;
  useActiveCategory: [
    activeCategory: CategoryInterface | undefined,
    setActiveCategory: React.Dispatch<
      React.SetStateAction<CategoryInterface | undefined>
    >
  ];
};

export default function Todos(props: props) {
  const { todoList, setTodoList, useActiveCategory } = props;
  const [activeCategory] = useActiveCategory;
  const [AddTaskWarning, setAddTaskWarning] = useState("");

  async function AddTodoSuperset() {
    if (String($("#AddTodoPopup-input").val()).length > 0) {
      const data = await createTask(
        String(activeCategory?.urlName),
        String($("#AddTodoPopup-input").val())
      );

      if (data.success) {
        AddTodoToggle();
        const ac = User.categories.find(
          (cat) => activeCategory?._id === cat?._id
        );
        setTodoList(ac?.todos);
        $("#AddTodoPopup-input").val("");
        setAddTaskWarning("");
      } else {
        if (data.log == "Task in the category already exists") {
          setAddTaskWarning(data.log);
        }
      }
    }
  }

  async function DeleteTodoSuperset(taskUrl: string) {
    await deleteTask(String(activeCategory?.urlName), taskUrl);
    const ac = User.categories.find((cat) => activeCategory?._id === cat?._id);
    setTodoList(ac?.todos);
  }

  function AddTodoToggle() {
    toggleClass("#AddTodoPopup", "hidden", "flex");
  }
  return (
    <>
      <div className="todos">
        {todoList?.map((todo) => (
          <Todo
            todo={todo}
            key={todo._id}
            id={todo._id}
            deleteFunction={DeleteTodoSuperset}
          />
        ))}
        <AddTodo clickFucntion={AddTodoToggle} />
        <InputPopup
          toggleFunction={AddTodoToggle}
          submitFunction={AddTodoSuperset}
          id="AddTodoPopup"
          title="Create a new task"
          placeholder="name of your new task here..."
          warning={AddTaskWarning}
        />
      </div>
    </>
  );
}
