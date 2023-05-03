import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import "./style.sass"
import { MouseEventHandler } from "react"

type props = {
    name: string,
    link: string,
    icon: IconDefinition,
    active: string,
    updateActivePage: (e: React.MouseEvent<HTMLElement>) => void
}

export default function LinkTo(props: props) {
    const {name, link, icon, active, updateActivePage} = props

  return (<>
    <Link to={link} className={`link-to ${active == name && "active"}`} id={"linkTo"+name} onClick={updateActivePage}>
        <div className="icon"><FontAwesomeIcon icon={icon} /></div>
        <div className="link">{name}</div>
    </Link>
  </>)
}
