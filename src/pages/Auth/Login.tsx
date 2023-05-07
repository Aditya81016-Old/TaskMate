import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginSVG from "../../assets/LoginSVG";
import { authenticateUser } from "../../modules/User";
import { User } from "../../data/Variables";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailWarning, setEmailWarning] = useState("")
  const [passwordWarning, setPasswordWarning] = useState("")

  const navigate = useNavigate();

  let data = { success: false, log: "" };

  async function LoginUser(e: FormEvent) {
    e.preventDefault();

    User.email = email;
    User.password = password;

    data = (await authenticateUser(User)) || data;

    /* 
      if user checked remember me then
      frontrnd user will be saved in localstorage
      to access later when user tries to authenticate 
    */
    if (rememberMe) localStorage.setItem("User", JSON.stringify(User));

    // if server returns a success response then navigate the user to home page
    if (data.success) {
      navigate("/accessed");
    }
    // else if the fetch was unsuccessful then info the user
    else {

      // info the user that the email is already used
      if (data.log === "No user found") {
        setEmailWarning("No user with the email found");
        setPasswordWarning("")
      }
      
      if (data.log === "User not authenticated") {
        setEmailWarning("");
        setPasswordWarning("Wrong password")
      }
    }
  }

  return (
    <>
      <div id="Login" className="auth-page">
        <div className="auth-box">
          <h3>Login</h3>
          <form className="auth-form" onSubmit={LoginUser}>
            <div className="input-group">
              <label htmlFor="email-input">Email</label>
              <input
                type="email"
                id="email-input"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <p className="warning">{emailWarning}</p>
            </div>

            <div className="input-group">
              <label htmlFor="password-input">Password</label>
              <input
                type="password"
                id="password-input"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
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
            <Link to="/auth?method=register" className=" text-blue-600 underline">Register instead</Link>
          </form>
        </div>
        <LoginSVG scale={0.7} x="0" y="0" />
      </div>
    </>
  );
}
