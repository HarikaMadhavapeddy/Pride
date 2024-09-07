import { Outlet } from "react-router-dom";
//import Nav from "./Nav";
import "./style.css";
import CartContextProvider from "../store/CartContext";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function RootPage() {
  const loader = useSelector((state) => state.shoppingAuth.loading);
  return (
    <>
    {loader? <div>loading...</div>:
      <CartContextProvider>
        <Header />
        <Outlet />
        <ToastContainer position="bottom-right" />
      </CartContextProvider>}
      
    </>
  );
}
