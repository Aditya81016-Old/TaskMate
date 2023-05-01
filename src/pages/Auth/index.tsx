import { useLocation } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

import "./stylesheet/style.sass"
import "./stylesheet/res.sass"

export default function Auth() {
  const method = new URLSearchParams(useLocation().search).get("method");

  return (
    <>
        {method == "register" ? <Register /> : <Login />}
    </>
  );
}
