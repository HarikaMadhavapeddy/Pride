import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../Redux/AuthSlice";
import { toast } from "react-toastify";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pwdToggle,setPwdToggle]=useState(true);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  function handleLogin(e) {
    e.preventDefault();
    dispatch(userLogin({ email, password: pwd }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setEmail("");
        setPwd("");
        toast.success("User logged in successfully");
        navigate("/products");
      })
      .catch((error) => toast.error(error));
  }
  return (
    <div className="Loginpage">
      <h1>Login</h1>
      <form className="LoginPageForm">
        <div className="Loginpage-user-box">
          <input
            id="LoginPageEmail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Id"
          />
        </div>
        <div className="Loginpage-user-box">
          <input
            id="LoginPagePwd"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type={pwdToggle? 'password':'text'}
            placeholder="Password"
          ></input>
          <span class="password-toggle-icon" onClick={()=>setPwdToggle(!pwdToggle)}>
            {pwdToggle? <FaEyeSlash />:<FaRegEye />}
          </span>
        </div>
        <div className="LoginPageBottom">
          <Link to="/forgetPwd" style={{ color: "yellow" }}>
            forget password
          </Link>
          <button className="LoginPageButton" onClick={(e) => handleLogin(e)}>
            Submit
          </button>
          <Link to="/signup" style={{ color: "white" }}>
            new user! signup{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}
