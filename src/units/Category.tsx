import "./style.sass"

type props = {
    name: string,
    type: string,
    id: string,
    index: number
    handleClick: (category: string) => void
}

export default function Category(props: props) {
  const {name, type, id, index, handleClick} = props

  function handleClickSuperset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    handleClick(e.currentTarget.id)
  }

  return (
    <button className={`category ${type} ${index == 0 && "active"}`} id={"id"+id} onClick={handleClickSuperset}>
        <div className="name">{name}</div>
    </button>
  )
}