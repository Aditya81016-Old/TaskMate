import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
      <>
        <div className="navbar w-screen p-5 px-24 bg-orange-600 flex justify-between items-center">
  
          <div className="brand flex gap-2">
            <div className="text-xl text-amber-300 logo">
              <FontAwesomeIcon icon={faFire} style={{ fontSize: "1.875rem", lineHeight: "2.25rem" }} />
            </div>
            <div className="name font-extrabold text-white text-3xl">
              TaskMate
            </div>
          </div>
  
          <div className="links flex gap-x-14">
            <div className="about"><Link to="/about">About</Link></div>
            <div className="login"><Link to="/login">Login</Link></div>
            <div className="register"><Link to="/register">Register</Link></div>
          </div>
  
        </div>
      </>
    );
  }