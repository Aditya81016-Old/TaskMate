import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { User } from "../data/Variables"
import { faCog, faFire, faHome, faInfo, faUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import "./style.sass"
import LinkTo from "../units/LinkTo"
import { MouseEventHandler, useState } from "react"

type props = {
  active: string
}

export default function Navbar(props: props) {
  const {active} = props  
  const {name} = User

  const [activePage, setActivePage] = useState(active)

  function updateActivePage(e: React.MouseEvent<HTMLElement>) {
    const id = e.currentTarget.id.replaceAll("linkTo", "")
    setActivePage(id)
  }

  return (<>
    <div id="Navbar">
        <div className="user-details">
            <button className="icon text-amber-300"><FontAwesomeIcon icon={faUser} /></button>
            <div className="user-name">{name}</div>
        </div>

        <div className="nav-links">
          <LinkTo name="Home" link="/accessed?page=home" icon={faHome} active={activePage} updateActivePage={updateActivePage}/>
          <LinkTo name="Settings" link="/accessed?page=settings" icon={faCog} active={activePage} updateActivePage={updateActivePage}/>
          <LinkTo name="About" link="/accessed?page=about" icon={faFire} active={activePage} updateActivePage={updateActivePage}/>
        </div>
    </div>
  </>)
}
