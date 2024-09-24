import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/AuthSlice";
import { toast } from "react-toastify";
import "./Profile.css";
import { CgProfile } from "react-icons/cg";

export default function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.shoppingAuth);
  function handleUpdateName() {
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        dispatch(setUser({ ...user, name }));
        toast.success("user name updated successfully");
        setName("");
      })
      .catch((error) => toast.error(error.message));
  }
  function handleUpdateEmail() {
    if (user.email === email) {
      toast.error("current user email and updated email are same");
    } else {
      updateEmail(auth.currentUser, email)
        .then(() => {
          dispatch(setUser({ ...user, email }));
          toast.success("email updated successfully");
          setEmail("");
        })
        .catch((error) => {
          if (error.code === "auth/requires-recent-login") {
            const credentials = EmailAuthProvider.credential(
              auth.currentUser.email,
              prompt("enter your password")
            );
            reauthenticateWithCredential(auth.currentUser, credentials)
              .then(() => {
                return updateEmail(auth.currentUser, email);
              })
              .then(() => {
                dispatch(setUser({ ...user, email }));
                toast.success("email updated successfully");
                setEmail("");
              })
              .catch((error) => toast.error(error.message));
          } else {
            toast.error(error.message);
          }
        });
    }
  }
  function handleUpdatePwd() {
    updatePassword(auth.currentUser, pwd)
      .then(() => {
        dispatch(setUser({ ...user, password: pwd }));
        toast.success("password updated successfully");
        setPwd("");
      })
      .catch((error) => toast.error(error.message));
  }
  return (
    <div className="profile-conatiner">
      <div className="profile-label">
        <CgProfile className="profile-icon" />
        <span>Update Profile </span>
      </div>
      <div className="profileInput-container">
        <div className="profile-input">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Update Name"
          />
          <button onClick={handleUpdateName} disabled={name ? false : true}>
            Update
          </button>
        </div>
        <div className="profile-input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Update Email"
          />
          <button onClick={handleUpdateEmail} disabled={email ? false : true}>
            Update
          </button>
        </div>
        <div className="profile-input">
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Update Password"
          />
          <button onClick={handleUpdatePwd} disabled={pwd ? false : true}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
