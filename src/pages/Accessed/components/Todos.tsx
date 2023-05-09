import { TaskInterface } from "../../../data/TSComponents";
import Todo from "../../../units/Todo";

type props = {
  todoList: TaskInterface[] | undefined
}

export default function Todos(props: props) {
  const {todoList} = props
  return (<>
    <div className="todos">
        {todoList?.map(todo => <Todo todo={todo} key={todo._id} />)}
    </div>
  </>);
}
