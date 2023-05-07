import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../data/Variables";
import {
  faBars,
  faCog,
  faFire,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./stylesheet/style.sass";
import "./stylesheet/res.sass";
import LinkTo from "../units/LinkTo";
import { useState } from "react";
import $ from "jquery";

type props = {
  active: string;
};

export default function Navbar(props: props) {
  const { active } = props;
  const { name } = User;

  // to inform user the page he is in currently --lets call it page identifier
  const [activePage, setActivePage] = useState(active);

  // update the page identifier when page changes
  function updateActivePage(e: React.MouseEvent<HTMLElement>) {
    const id = e.currentTarget.id.replaceAll("linkTo", "");
    setActivePage(id);
    toggleNavLinks();
  }

  // this is for small screen display which lets user to toggle in and out the nav links
  function toggleNavLinks() {
    $(".nav-links").toggleClass("active");
    $(".nav-block").toggleClass("hidden"); // this is empty block which toggles out nav links when user tries click some where else
  }

  return (
    <>
      <div id="Navbar" className="z-20">
        <div className="user-details z-20">
          <button className="icon text-amber-300">
            <FontAwesomeIcon icon={faUser} />
          </button>
          <div className="user-name">{name}</div>
        </div>

        <div className="nav-link-toggle sm z-20" onClick={toggleNavLinks}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="nav-links z-10">
          <LinkTo
            name="Home"
            link="/accessed?page=home"
            icon={faHome}
            active={activePage}
            updateActivePage={updateActivePage}
          />
          <LinkTo
            name="Settings"
            link="/accessed?page=settings"
            icon={faCog}
            active={activePage}
            updateActivePage={updateActivePage}
          />
          <LinkTo
            name="About"
            link="/accessed?page=about"
            icon={faFire}
            active={activePage}
            updateActivePage={updateActivePage}
          />
        </div>
      </div>
      <div className="nav-block w-full h-full hidden bg-black opacity-5 fixed left-0 sm z-0" onClick={toggleNavLinks}></div>
    </>
  );
}
