import { get, push, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import CreditCard from "../components/CreditCard";
import { auth, database } from "../Firebase/Firebase";
import "./Payment.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GenerateDate } from "../components/Util";
import random from "random";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { clearCart } from "../Redux/CartSlice";

export default function Payment() {
  const [cardDetails, setCardDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedPaymentCard, setSelectedPaymentCard] = useState(null);
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.shoppingCart
  );
  const [loading, setLoading] = useState(true);
  const [enteredCvv, setEnteredCvv] = useState("");
  const [showForm, setShowForm] = useState(false);
  const defaultData = {
    number: "",
    name: "",
    cvc: "",
    valid: "",
    focused: "",
    issuer: "",
  };
  useEffect(() => {
    console.log(location.state.selectedAddress);
    sessionStorage.setItem("ENABLE_REALTIME_CARDVALIDATION", false);
    const cardRef = ref(database, `CardDetails/${auth.currentUser.uid}`);
    get(cardRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCardDetails(Object.values(snapshot.val()));
          console.log(Object.values(snapshot.val()));
        }
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);
  function AddCardDetails(userCardDetails) {
    const cardRef = ref(database, `CardDetails/${auth.currentUser.uid}`);
    push(cardRef, userCardDetails)
      .then(() => validateCardDetails(userCardDetails))
      .catch()
      .finally();
  }
  function validateCardDetails(CardDetailsToBeValidated) {
    const sessionData = sessionStorage.getItem(
      "ENABLE_REALTIME_CARDVALIDATION"
    );
    if (sessionData === "true") {
      if (CardDetailsToBeValidated.isValid) {
        CreateOrder(CardDetailsToBeValidated);
      } else {
        toast.error("Invalid card details");
      }
    } else {
      CreateOrder(CardDetailsToBeValidated);
    }
  }
  function CreateOrder(OrderCardDetails) {
    const myOrderDetails = {
      orderDate: new Date().toISOString(),
      estShippingDate: GenerateDate(random.int(1, 3)),
      deliveryDate: GenerateDate(random.int(4, 7)),
      items: items,
      orderId: uuidv4(),
      address: location?.state?.userSelectedAdress,
      cardDetails: OrderCardDetails,
      status: "pending",
      totalPrice: totalPrice,
      quantity: totalQuantity,
    };
    const orderRef = ref(
      database,
      `Orders/${auth.currentUser.uid}/${myOrderDetails.orderId}`
    );
    console.log(orderRef);
    set(orderRef, myOrderDetails)
      .then(() => {
        console.log("Order created successfully", myOrderDetails);
        return update(orderRef, { status: "confirmed" });
      })
      .then(() => {
        dispatch(clearCart());
        navigate("/orderSuccess", { state: { myOrderDetails } });
      })
      .catch((error) => navigate("/orderFail"));
  }
  return (
    <div>
      {loading ? (
        <div>...Loading</div>
      ) : (
        <div>
          {cardDetails.length > 0 ? (
            <>
              {showForm ? (
                <CreditCard
                  userCardDetails={defaultData}
                  handleCardDetailsCallback={AddCardDetails}
                  type="Pay"
                  onCancel={() => setShowForm(false)}
                />
              ) : (
                <div className="cardDetails-container">
                  {cardDetails.map((card) => (
                    <div className="cardDetailsBlock">
                      <input
                        type="radio"
                        name="cards"
                        onChange={() => setSelectedPaymentCard(card)}
                      />
                      <label>XXXX XXXX XXXX {card.number.slice(14, 19)}</label>
                      {selectedPaymentCard?.number === card.number && (
                        <input
                          onChange={(e) => setEnteredCvv(e.target.value)}
                          type="number"
                          placeholder="Enter Cvv"
                        />
                      )}
                    </div>
                  ))}
                  <button onClick={() => setShowForm(true)}>
                    Add new Card
                  </button>

                  <button
                    onClick={() => validateCardDetails(selectedPaymentCard)}
                    disabled={selectedPaymentCard?.cvc !== enteredCvv}
                  >
                    Pay securely
                  </button>
                </div>
              )}
            </>
          ) : (
            <div>
              <CreditCard
                type="Pay"
                userCardDetails={defaultData}
                handleCardDetailsCallback={AddCardDetails}
                cancelType="navigate"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
