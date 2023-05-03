import { useLocation, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { User } from "../../data/Variables";
import { useEffect, useState } from "react";
import { authenticateUser } from "../../modules/User";
import UserFound from "./components/UserFound";

import "./stylesheet/style.sass";
import "./stylesheet/res.sass";

export default function Auth() {
  const method = new URLSearchParams(useLocation().search).get("method");
  const navigate = useNavigate();
  const [userFound, setUserFound] = useState(false);

  const user = JSON.parse(String(localStorage.getItem("User")));

  useEffect(() => {
    if (user != null) setUserFound(true);
  }, [setUserFound, user]);

  function UserFoundDisagree() {
    setUserFound(false);
    localStorage.removeItem("User");
  }

  async function UserFoundAgree() {
    User.email = user.email;
    User.password = user.password;
    await authenticateUser(User);
    console.log("User Found!");
    navigate("/accessed");
  }

  return (
    <>
      {userFound && (
        <UserFound
          User={user}
          method={method || ""}
          onDisagree={UserFoundDisagree}
          onAgree={UserFoundAgree}
        />
      )}
      {method == "register" ? <Register /> : <Login />}
    </>
  );
}
