import "./ProductDetails.css";
import { FaUserCircle } from "react-icons/fa";
import RatingStar from "../components/RatingStar";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/CartSlice";
export default function ProductDetails({ item }) {
  console.log(item);
  const Dispatch=useDispatch();
  function handleAddToCart(item){
    Dispatch(addItem(item));
    }
  return (
      <div className="single-productsDetails-container">
        <div className="productDetails">
          <img src={item.images[0]} />
          <p style={{ fontSize: "20px", fontWeight: "600" }}>{item.title}</p>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>${item.price}</p>
          <p style={{ fontWeight: "300", fontSize: "18px" }}>
            {item.description}
          </p>
          <button onClick={()=>handleAddToCart(item)} >Add to cart</button>
        </div>
        <div className="productDetailsReviews">
          {item.reviews.map((review) => (
            <div className="productDetails-review">
              <span id='review-name'><FaUserCircle /> {review.reviewerName}</span>
              <span id='review-rating'><RatingStar rating={review.rating}/></span>
              <span id='review-comment'>{review.comment}</span>
              </div>
          ))}
        </div>
      </div>
  );
}
