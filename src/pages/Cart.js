import { useDispatch, useSelector } from "react-redux";
import { deleteItem, minusItem, plusItem } from "../Redux/CartSlice";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const Dispatch = useDispatch();
  const navigate=useNavigate();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.shoppingCart
  );
  function handleProceedToCheckout() {
    if (auth.currentUser) {
      navigate('/address');
    }
    else {
      navigate('/login');
    }
  }
  return (
    <div className="cartItems">
      <div>
        {items.length > 0 ? (
          <div className="cart-container">
            {items.map((item) => (
              <div className="single-cart-container" key={item.id}>
                <img src={item.images[0]} />
                <div>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
                <div id="quantity-cart-container">
                  <button onClick={() => Dispatch(plusItem(item))}>+</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => Dispatch(minusItem(item))}>-</button>
                </div>

                <button
                  onClick={() => Dispatch(deleteItem(item))}
                  className="delete-cart-container"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <div className="cartCheckout">
          {items.map((item) => (
            <div className="cartCheckoutItems">
              <span>{item.title}: </span>
              <span>
                {" "}
                {item.quantity} * {item.price}
              </span>
            </div>
          ))}
          <div className="cartCheckoutItems-bottom">
            <span>Total Quantity:{totalQuantity}</span>
            <span>
              Total Price: {totalPrice > 0 ? totalPrice.toFixed(2) : 0}
            </span>
            <button
              className="Proceed-cart-container"
              onClick={handleProceedToCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
