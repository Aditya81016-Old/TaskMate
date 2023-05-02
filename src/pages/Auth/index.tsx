import { useLocation, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

import "./stylesheet/style.sass"
import "./stylesheet/res.sass"
import { useEffect } from "react";

export default function Auth() {
  const method = new URLSearchParams(useLocation().search).get("method");
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("User")
    if (user != undefined) {
      console.log("User Found!")
      navigate("/home")
    } else {
      console.log("User Not Found!")
    }
  }, [navigate])

  return (
    <>
        {method == "register" ? <Register /> : <Login />}
    </>
  );
}
