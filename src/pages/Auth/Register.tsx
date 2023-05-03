import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import LoginSVG from "../../assets/LoginSVG";
import { createUser } from "../../modules/User";
import { User } from "../../data/Variables";
// import $ from "jquery"

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  const navigate = useNavigate();

  let data = { success: false, log: "" };

  async function RegisterUser(e: FormEvent) {
    e.preventDefault();

    if (password != password2) setPasswordWarning("Password didnt match");
    else {
      setPasswordWarning("");

      // creates frontend user
      User.name = name;
      User.email = email;
      User.password = password;

      // creates user in backend and updated frontend users property
      data = (await createUser(User)) || data;
      console.log(data, "\n\n", User);

      /* 
      if user checked remember me then
      frontrnd user will be saved in localstorage
      to access later when user tries to authenticate 
    */
      if (rememberMe) localStorage.setItem("User", JSON.stringify(User));

      // if server returns a success response then navigate the user to home page
      if (data.success) {
        console.log("User Registered!");
        navigate("/accessed");
      }
      // else if the fetch was unsuccessful then info the user
      else {
        console.log("Failed To Register User! \n", data.log);

        // info the user that the email is already used
        if (data.log === "Email already exists")
          setEmailWarning("Email already used");
      }
    }
  }

  return (
    <>
      <div id="Login" className="auth-page">
        <div className="auth-box">
          <h3>Register</h3>
          <form className="auth-form register" onSubmit={RegisterUser}>
            <div className="input-group">
              <label htmlFor="name-input">Name</label>
              <input
                type="text"
                name="name"
                id="name-input"
                value={name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email-input">Email</label>
              <input
                type="email"
                name="email"
                id="email-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                required
              />
              <p className="warning">{emailWarning}</p>
            </div>

            <div className="input-group">
              <label htmlFor="password-input">Password</label>
              <input
                type="password"
                name="password"
                id="password-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password-input2">Re-enter</label>
              <input
                type="password"
                id="password-input2"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.currentTarget.value);
                }}
                required
              />
              <p className="warning">{passwordWarning}</p>
            </div>

            <div className="input-group">
              <div className="input-group remeber-me-box">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="remember-me-checkbox"
                  onClick={() => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <label htmlFor="remember-me-checkbox">Remember Me</label>
              </div>
              <button type="submit" className="primary">
                Submit
              </button>
            </div>
            <Link to="/auth?method=login" className=" text-blue-600 underline">Login instead</Link>
          </form>
        </div>
        <LoginSVG scale={0.7} x="0" y="0" />
      </div>
    </>
  );
}
