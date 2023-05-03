import "./style.sass"

type props = {
    name: string
}

export default function Category(props: props) {
  return (
    <div className="category">
        <div className="name">{props.name}</div>
    </div>
  )
}
