import { useState } from "react";
import { User } from "../../../data/Variables";
import { toggleClass } from "../../../modules/Functions";
import { deleteUser, updateUser } from "../../../modules/User";
import InputPopup from "../components/InputPopup";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { password } = User;

  const navigate = useNavigate();

  const dumName = User.name,
    dumEmail = User.email;

  const [inputName, setInputName] = useState(dumName);
  const [inputEmail, setInputEmail] = useState(dumEmail);

  const [PopupPassInputWarning, setPopupPassInputWarning] = useState("");
  const [PopupPassInputWarning2, setPopupPassInputWarning2] = useState("");
  const [EmailWarning, setEmailWarning] = useState("");

  function PasswordPopupToggle() {
    toggleClass("#Update-User", "hidden", "flex");
  }

  function PasswordPopupToggle2() {
    toggleClass("#Delete-User", "hidden", "flex");
  }

  async function UpdateUserSuperset() {
    const pass = String($("#Update-User-input").val());
    $("#Update-User-input").val("");
    const data = await updateUser(pass, inputName, inputEmail);
    console.log(data);

    if (data.success) {
      PasswordPopupToggle();
      setPopupPassInputWarning("");
    } else {
      if (data.log == "Wrong Password") {
        setPopupPassInputWarning("Wrong passowrd");
        setEmailWarning("");
      }
      if (data.log == "Email already exists") {
        setEmailWarning("Email already used");
        setPopupPassInputWarning("");
        PasswordPopupToggle();
      }
    }
  }

  async function DeleteUserSuperset() {
    const pass = String($("#Delete-User-input").val());
    const data = await deleteUser(pass);
    if (data.success) {
      navigate("/");
      localStorage.removeItem("User");
    } else {
      if (data.log == "Wrong Password") {
        setPopupPassInputWarning2("Wrong Password");
      }
    }
  }

  return (
    <>
      <div id="Settings">
        <h3>Settings</h3>
        <div id="Infos">
          <div className="info">
            <div className="title">Name: </div>
            <input
              type="text"
              name="name"
              id="name-input"
              value={inputName}
              onChange={(e) => setInputName(e.currentTarget.value)}
            />
          </div>
          <div className="info">
            <div className="title">Email: </div>
            <div className="flex flex-col justify-end items-end pr-0">
              <input
                type="email"
                name="name"
                id="email-input"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.currentTarget.value)}
              />
              <p className="warning relative -translate-y-[0.5px] px-3 text-right">
                {EmailWarning}
              </p>
            </div>
          </div>
          <div className="info">
            <div className="title">Password: </div>
            <input
              type="text"
              name="name"
              id="password-input"
              value={password}
            />
          </div>
          <div className="info my-20">
            <button className="danger" onClick={PasswordPopupToggle2}>
              Delete Account
            </button>
            <button className="primary" onClick={PasswordPopupToggle}>
              Update Details
            </button>
          </div>
        </div>
      </div>
      <InputPopup
        toggleFunction={PasswordPopupToggle}
        submitFunction={UpdateUserSuperset}
        id="Update-User"
        title="Enter your password to update user"
        placeholder="your password here..."
        warning={PopupPassInputWarning}
      />
      <InputPopup
        toggleFunction={PasswordPopupToggle2}
        submitFunction={DeleteUserSuperset}
        id="Delete-User"
        title="Enter your password to delete user"
        placeholder="your password here..."
        warning={PopupPassInputWarning2}
      />
    </>
  );
}
