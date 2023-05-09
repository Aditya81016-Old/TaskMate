import { TaskInterface } from "../data/TSComponents"

type props = {
    todo: TaskInterface
}

export default function Todo(props: props) {

    const {todo} = props;
    const {task, state} = todo

    return (<>
        <div className="task">
            <h6>{task}</h6>
            <div>{state}</div>
        </div>
    </>)
}