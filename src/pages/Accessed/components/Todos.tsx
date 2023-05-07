type props = {
  todoList: string
}

export default function Todos(props: props) {
  const {todoList} = props
  console.log("todoList: ", todoList)
  return (<>
    <div className="todos">
        {todoList}
    </div>
  </>);
}
