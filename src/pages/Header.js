import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../Redux/AuthSlice";
import { toast } from "react-toastify";
import UserNav from "./userNav";
import { LuShoppingCart } from "react-icons/lu";
import { searchProduct } from "../Redux/SearchSlice";

export default function Header() {
  const Dispatch = useDispatch();
  const { user } = useSelector((state) => state.shoppingAuth);
  const { totalQuantity } = useSelector((state) => state.shoppingCart);
  console.log(user);

  function handleSearch(e) {
    Dispatch(searchProduct(e.target.value));
    //console.log(searchData);
  }
  return (
    <>
      <div className="header-container">
        <span id="HeaderLogo">Pride</span>
        <div className="header-container-middle">
          <spam id="magnifier">
            <CiSearch id="magnifier-icon" />
          </spam>
          <input
            id="search-box"
            type="text"
            placeholder="Try Saree, Kurti or Search by Product Code"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="header-container-right">
          <p>Download App</p>
          <p>Become a Supplier</p>
          <p>Newsroom</p>
          {/*<button onClick={handleLogout}>Logout</button>*/}

          <div className="dropdown">
            {user ? (
              <span id="profile">
                Hello!
                <span id="profile-text">
                  {user&&user.name.length > 5
                    ? user.name.substring(0, 6) + "..."
                    : user.name}
                </span>
              </span>
            ) : (
              <Link to="login">
                <span id="profile">
                  <CgProfile />
                  <span id="profile-text">Login</span>
                </span>
              </Link>
            )}
            {user && (
              <div className="header-container-right-Nav">
                <UserNav />
              </div>
            )}
          </div>

          <Link to="cart">
            <spam id="cart">
              <LuShoppingCart id="cart-icon" />
              <span id="cart-quantity">{totalQuantity}</span>
            </spam>
          </Link>
        </div>
      </div>
    </>
  );
}
