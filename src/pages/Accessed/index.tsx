import { User } from "../../data/Variables";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { authenticateUser } from "../../modules/User";

import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";

import "./stylesheet/style.sass";

export default function Accessed() {
  const navigate = useNavigate();
  const { email } = User;

  const user = JSON.parse(String(localStorage.getItem("User")));
 
  useEffect(() => {
    async function authorizeUser() {
      User.email = user.email;
      User.password = user.password;
      await authenticateUser(User);
      navigate("/accessed");
    }

    if (user == null && email == "") navigate("/auth?method=login");
    else if (user != null && email == "") {
      authorizeUser()
    }
  });

  const page = new URLSearchParams(useLocation().search).get("page") || "home";

  return (
    <>
      <div id="Accessed">
        <Navbar active="Home" />
        {page == "home" && <Home />}
        {page == "settings" && <Settings />}
        {page == "about" && <About />}
      </div>
    </>
  );
}
