import { get, push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import CreditCard from "../components/CreditCard";
import { auth, database } from "../Firebase/Firebase";
import "./Payment.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
export default function Payment() {
  const [cardDetails, setCardDetails] = useState([]);
  const location = useLocation();
  const [selectedPaymentCard, setSelectedPaymentCard] = useState(null);
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
        CreateOrder();
      } else {
        toast.error("Invalid card details");
      }
    } else {
      CreateOrder();
    }
  }
  function CreateOrder() {
    console.log("Order created successfully");
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
