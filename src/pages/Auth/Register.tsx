import { FormEvent } from "react";
import LoginSVG from "../../assets/LoginSVG";

export default function Register() {

  function handleSubmit(e: FormEvent) {
    alert("Submitted")
    e.preventDefault()
  }


  return (
    <>
      <div id="Login" className="auth-page">
        <div className="auth-box">
          <h3>Register</h3>
          <form className="auth-form" onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label htmlFor="email-input">Email</label>  
              <input type="email" id="email-input" />
            </div>      
            
            <div className="input-group">
              <label htmlFor="password-input">Password</label>  
              <input type="password" id="password-input" />
            </div>

            <div className="input-group">
              <label htmlFor="password-input2">Re-enter</label>
              <input type="password" id="password-input2" />
            </div>

            <button type="submit" className="primary">Submit</button>
          </form>
        </div>
          <LoginSVG scale={0.7} x="0" y="0" />
      </div>
    </>
  );
}
