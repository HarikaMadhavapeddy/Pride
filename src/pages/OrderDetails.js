import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, database } from "../Firebase/Firebase";
import { get, ref, update } from "firebase/database";
import { GetCardLastDigits } from "../components/Util";
import { toast } from "react-toastify";
import StatusWizet from "../components/StatusWizet";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const orderRef = ref(
      database,
      `Orders/${auth?.currentUser?.uid}/${orderId}`
    );
    get(orderRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCurrentOrder(snapshot.val());
          console.log(currentOrder);
        }
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);
  function handleOrderCancel() {
    const orderRef = ref(database, `Orders/${auth.currentUser.uid}/${orderId}`);
    update(orderRef, {
      status: "cancelled",
      CancelledDate: new Date().toISOString(),
    }).then(() => {
      setCurrentOrder({
        ...currentOrder,
        status: "cancelled",
        CancelledDate: new Date().toISOString(),
      });
      toast.success("Order has been cancelled");
    });
  }

  return (
    <div>
      {loading ? (
        <div>...loading</div>
      ) : (
        <div>
          {currentOrder && (
            <div className="Orderdetails-container">
              <h4>Order Id : {currentOrder.orderId}</h4>
              <div>
                <StatusWizet orderDetails={currentOrder} />
              </div>
              <p id="OrderStatus">
                Order Status :{" "}
                <span
                  className={
                    currentOrder.status === "cancelled"
                      ? "StatusDeactive"
                      : "StatusActive"
                  }
                >
                  {currentOrder.status}
                </span>
              </p>
              <div className="Orderdetails-Items">
                {currentOrder.items.map((item) => (
                  <div className="Orderdetails-Single">
                    <div className="Orderdetails-SingleImg">
                      <img src={item.images[0]} />
                    </div>
                    <div className="Orderdetails-SingleDetails">
                      <span id='title'>{item.title}</span>
                      <span>Quantity : {item.quantity}</span>
                      <span>Price : ${item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p>Total Price : ${currentOrder.totalPrice.toFixed(2)}</p>
              <div>
                <h5>
                  Address : {currentOrder.address.adLn1},{" "}
                  {currentOrder.address.adLn2}, {currentOrder.address.pincode}
                </h5>
              </div>
              <p>
                Card Details : {currentOrder.cardDetails.name}, Card ending with
                : {GetCardLastDigits(currentOrder.cardDetails.number)}
              </p>
              {currentOrder.status !== "cancelled"&&
                  <>
                  <p>Cancellation available till shipping</p>
                  <button
                  onClick={handleOrderCancel}
                >
                  Cancel Order
                </button>
                  </>
                   }
              {currentOrder.status === "cancelled" && (
                <div>
                  Refund of {currentOrder.totalPrice} has been credited to Card
                  ending with :{" "}
                  {GetCardLastDigits(currentOrder.cardDetails.number)}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
