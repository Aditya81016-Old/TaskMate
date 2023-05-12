import { TaskInterface } from "../data/TSComponents";

type props = {
  todo: TaskInterface;
  id: string;
};

export default function Todo(props: props) {
  const { todo, id } = props;
  const { task } = todo;

  return (
    <>
      <div className="task" id={id}>
        <input type="checkbox" id={`${id}-checkbox`} />
        <h6>{task}</h6>
      </div>
    </>
  );
}
