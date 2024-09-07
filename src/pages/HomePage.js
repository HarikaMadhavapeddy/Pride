import { useContext, useEffect, useState } from "react";
import "./style.css";
import { CartContext } from "../store/CartContext";
import { Link, json, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchProducts } from "../Redux/productsSlice";
import Nav from "./Nav";
import { addItem } from "../Redux/CartSlice";

export default function HomePage() {
  /*const cart = useContext(CartContext);
  const productsD = useLoaderData(); // it returns data which is loaded in loader property of root element
  const productsData = productsD.products;
const{searchItem}=cart;
console.log(filteredData);*/
  const { data, loading, error } = useSelector(
    (state) => state.shoppingProducts
  );
  const { searchData } = useSelector((state) => state.shoppingSearch);
  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchData.toLowerCase())
  );

  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(FetchProducts());
  }, []);
  function handleAddToCart(item) {
    Dispatch(addItem(item));
  }
  return (
    <>
      <Nav />
      <div className="products-container">
        {filteredData &&
          filteredData.length > 0 &&
          filteredData.map((item) => (
            <div className="single-products-container" key={item.id}>
              <img src={item.images[0]} />
              <p>{item.title}</p>
              <p>${item.price}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              <Link to={`${item.id}`}>click here for product description</Link>
            </div>
          ))}
      </div>
    </>
  );
}
//loader function returns data fetched
/*export async function loader() {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw json({ message: "something went wrong" }, { status: 400 });
  } else {
    return response;
  }
}*/
