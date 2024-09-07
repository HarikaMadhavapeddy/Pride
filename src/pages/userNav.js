import React from "react";
import "./userNav.css";
import { useDispatch, useSelector } from "react-redux";
import { userDelete, userLogout, userSignOut } from "../Redux/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.shoppingAuth);
  function handleLogout() {
    dispatch(userLogout())
      .unwrap()
      .then(() => {
        toast.success("user Logged out successfully");
        navigate("/");
      })
      .catch((error) => toast.error(error));
  }
  function handleDelete() {
    dispatch(userDelete())
      .unwrap()
      .then(() => {
        toast.success("Your account is deleted");
        navigate("/");
      })
      .catch((error)=>toast.error(error));
  }
  function handleOrders(){
    navigate('/orders');
  }
  function handleProfile(){
    navigate('/profile');
  }
  function handleAddress(){
    navigate('/manageAddress');
  }
  function handleManageCards(){

  }
  return (
    <div className="userNavContainer">
      <span className="userNavContainer-span" onClick={handleProfile}>Manage profile</span>
      <span className="userNavContainer-span"onClick={handleAddress}>Manage address</span>
      <span className="userNavContainer-span" onClick={handleManageCards}>Manage Cards</span>
      <span className="userNavContainer-span" onClick={handleOrders}>Orders</span>
      <span className="userNavContainer-span" onClick={handleLogout}>
        Logout
      </span>
      <span
        className="userNavContainer-span"
        onClick={handleDelete}
      >
        Delete Account
      </span>
    </div>
  );
}
