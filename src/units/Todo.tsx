import { useState } from "react";
import { TaskInterface } from "../data/TSComponents";
import "./style.sass";
import "./res.sass";

type props = {
  todo: TaskInterface;
  id: string;
  deleteFunction: (taskUrl: string) => Promise<void>;
};
const timeout = { id: 0 };

export default function Todo(props: props) {
  const { todo, id, deleteFunction } = props;
  const { task } = todo;

  const [checkboxValue, setCheckboxValue] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(timeout);
    if (!checkboxValue) {
      setCheckboxValue(!checkboxValue);
      console.log("setTimeout", checkboxValue, timeout);
      timeout.id = setTimeout(() => {
        console.log("deleted", checkboxValue, timeout);
        deleteFunction(e.target.id);
      }, 5000);
      console.log(timeout);
    } else {
      console.log("timeout cancelled", checkboxValue, timeout);
      setCheckboxValue(!checkboxValue);
      clearTimeout(timeout.id);
    }
  }

  return (
    <>
      <div className="task" id={id}>
        <input
          type="checkbox"
          checked={checkboxValue}
          onChange={handleChange}
          id={todo.taskUrl}
        />
        <h6>{task}</h6>
      </div>
    </>
  );
}
