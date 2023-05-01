import { Link } from "react-router-dom"; // Link component for routing
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome component for icons
import { faFire } from "@fortawesome/free-solid-svg-icons"; // fire icon

export default function Navbar() {
    return (
      <>
        {/* The Navbar */}
        <div className="navbar w-screen p-12 px-24 bg-orange-600 flex justify-between items-center">
  
          {/* Branding - logo + name */}
          <div className="brand flex gap-2">
            <div className="text-xl text-amber-300 logo">
              <FontAwesomeIcon icon={faFire} style={{ fontSize: "1.875rem", lineHeight: "2.25rem" }} />
            </div>
            <div className="name font-extrabold text-white text-3xl">
              TaskMate
            </div>
          </div>
  
          {/* Links */}
          <div className="links flex gap-x-14">
            <div className="about"><Link to="/about">About</Link></div>
            <div className="login"><Link to="/auth?method=login">Login</Link></div>
            <div className="register"><Link to="/auth?method=register">Register</Link></div>
          </div>
  
        </div>
      </>
    );
  }