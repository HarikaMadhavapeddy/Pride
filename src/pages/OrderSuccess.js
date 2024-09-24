import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormatDate } from "../components/Util";

export default function OrderSuccess() {
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [order, setOrder] = useState({});
  const navigate=useNavigate();
  useEffect(() => {
    setShowBanner(true);
    const timeOut = setTimeout(() => {
      setShowBanner(false);
      if (location.state.myOrderDetails) {
        setOrder(location.state.myOrderDetails);
      }
    }, 3000);
  }, []);
  return (
    <div>
      {showBanner ? (
        <div>Order Confirmed</div>
      ) : (
        <div>
          <p>Thank you for shopping with us!</p>
          <p>{order?.orderId}</p>
          <p>Estimated delivery by {FormatDate(order?.deliveryDate)}</p>
          <div>{order&&order.items&&order.items.map(item=>(<p>{item.title}</p>))}</div>
          <p>Total price {order?.totalPrice}</p>
          <button onClick={()=>navigate('/products')}>Continue Shopping</button>
          <button onClick={()=>navigate(`/orders/${order.orderId}`)}>Track Order</button>

        </div>
      )}
    </div>
  );
}
