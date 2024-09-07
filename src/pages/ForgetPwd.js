import React, { useState } from "react";
import "./Login.css";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ForgotPassword, userForgetPwd } from "../Redux/AuthSlice";
import { toast } from "react-toastify";

export default function ForgetPwd() {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  function handleForgetPwd(e) {
    e.preventDefault();
    /*dispatch(userForgetPwd(email))
      .unwrap()
      .then((response) => {
        console.log(response);
        toast.success("password reset mail sent successfully");
        setEmail('');
      })
      .catch((error) => toast.error(error));*/
      dispatch(ForgotPassword(email))
      .unwrap()
      .then(() => {
        toast.success("password reset mail sent successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }
  return (
    <div className="Loginpage">
      <h1>Forget Password</h1>
      <form className="LoginPageForm">
        <input
          id="LoginPageEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email Id"
        />
        <div className="LoginPageBottom">
          <button className="LoginPageButton" onClick={(e)=>handleForgetPwd(e)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
