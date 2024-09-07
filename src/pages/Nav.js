import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function Nav() {
  const navigation = useNavigate();
  const params=useLocation();
console.log(params);
  function handleNavList() {
    if(params.pathname!=='/products'){
      navigation("products");
    }
    
  }
  return (
    <>
      <div className="nav-container">
        <ul className="nav-container-ul">
          <li className="nav-li" onClick={handleNavList}>
            Women Ethnic
          </li>
          <li className="nav-li" onClick={handleNavList}>
            Women Westeren
          </li>
          <li className="nav-li" onClick={handleNavList}>
            Men
          </li>
          <li className="nav-li" onClick={handleNavList}>
            Kids
          </li>
          <li className="nav-li" onClick={handleNavList}>
            Home & Kitchen
          </li>
          <li className="nav-li" onClick={handleNavList}>
            Beauty & Health
          </li>
          <li className="nav-li" onClick={handleNavList}>
            Jewellery & Accessories
          </li>
          <li className="nav-li" onClick={handleNavList}>
            Bags & Footware
          </li>
          <li className="nav-li" onClick={handleNavList}>
            Electronics
          </li>
        </ul>
      </div>
    </>
  );
}
