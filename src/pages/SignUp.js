import React, { useState } from "react";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { userSignUp } from "../Redux/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

export default function SignUp() {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [pwdToggle, setPwdToggle] = useState(true);
  const [cfPwdToggle, setCfPwdToggle] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSignUp(e) {
    e.preventDefault();
    if (input.password.length <= 6) {
      setError({ ...error, pwd: true });
    } else if (input.password !== input.confirmPwd) {
      setError({ ...error, cfmPwd: true, pwd: false });
    } else {
      dispatch(
        userSignUp({
          name: input.userName,
          email: input.email,
          password: input.password,
        })
      )
        .unwrap()
        .then((response) => {
          toast.success("User created successfully");
          navigate("/login");
        })
        .catch((error) => toast.error(error));
    }
  }
  return (
    <div className="SignUppage">
      <h1>First Time User!</h1>
      <form className="SignUpPageForm">
        <input
          id="SignUpPageName"
          onChange={(e) => setInput({ ...input, userName: e.target.value })}
          type="text"
          placeholder="User Name"
          required
        />
        <input
          id="SignUpPageEmail"
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          type="email"
          placeholder="Email Id"
          required
        />
        <div className="SignUppage-user-box">
          <input
            id="SignUpPagePwd"
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            type={pwdToggle ? "password" : "text"}
            placeholder="Password"
            required
          />
          <span
            class="password-toggle-icon"
            onClick={() => setPwdToggle(!pwdToggle)}
          >
            {pwdToggle ? <FaEyeSlash />:<FaRegEye /> }
          </span>
        </div>
        {error.pwd && (
          <span style={{ color: "white" }}>
            Password must contain 6 characters
          </span>
        )}
        <div className="SignUppage-user-box">
          <input
            id="SignUpPageCfmPwd"
            onChange={(e) => setInput({ ...input, confirmPwd: e.target.value })}
            type={cfPwdToggle ? "password" : "text"}
            placeholder="Confirm Password"
            required
          />
          <span
            class="password-toggle-icon"
            onClick={() => setCfPwdToggle(!cfPwdToggle)}
          >
            {cfPwdToggle ? <FaEyeSlash />:<FaRegEye />}
          </span>
        </div>
        {error.cfmPwd && (
          <span style={{ color: "white" }}>
            Password and confirmpassword should be same
          </span>
        )}

        <div>
          <button className="SignUpPageButton" onClick={(e) => handleSignUp(e)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
