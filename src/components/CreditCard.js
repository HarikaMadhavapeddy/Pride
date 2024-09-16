import React, { useState } from "react";
import Cards from "react-credit-cards";
import "./CreditCard.css";
import "react-credit-cards/es/styles-compiled.css";
import Payment from "payment";
import { formatCVC, formatCreditCardNumber } from "./Util";
import { useNavigate } from "react-router-dom";

export default function CreditCard({
  onCancel,
  type,
  userCardDetails,
  handleCardDetailsCallback,
  cancelType=''
}) {
  const [cardDetails, setCardDetails] = useState(userCardDetails);
  const navigate = useNavigate();
  function handleFocus(value) {
    setCardDetails({ ...cardDetails, focused: value });
  }
  function handleCallBack({ issuer }, isValid) {
    console.log(isValid, issuer);
    setCardDetails({ ...cardDetails, issuer, isValid });
  }
  function handleCardDetails() {
    handleCardDetailsCallback(cardDetails);
  }
  return (
    <div className="CreditCard-container">
      <div>
        <Cards
          callback={handleCallBack}
          focused={cardDetails.focused}
          name={cardDetails.name}
          number={cardDetails.number}
          expiry={cardDetails.valid}
          cvc={cardDetails.cvc}
        />
      </div>
      <div className="CreditCard-Input">
        <input
          name="number"
          required
          onFocus={(e) => handleFocus(e.target.name)}
          pattern="[\d| ]{16,22}"
          type="text"
          value={cardDetails.number}
          onChange={(e) =>
            setCardDetails({
              ...cardDetails,
              number: formatCreditCardNumber(
                e.target.value,
                cardDetails.issuer
              ),
            })
          }
          placeholder="Card Number"
        />
        <input
          name="name"
          value={cardDetails.name}
          onFocus={(e) => handleFocus(e.target.name)}
          required
          type="text"
          onChange={(e) =>
            setCardDetails({ ...cardDetails, name: e.target.value })
          }
          placeholder="Name"
        />
        <div>
          <input
            id="cvc"
            name="cvc"
            onFocus={(e) => handleFocus(e.target.name)}
            required
            type="number"
            value={cardDetails.cvc}
            onChange={(e) =>
              setCardDetails({
                ...cardDetails,
                cvc: formatCVC(e.target.value, cardDetails.issuer),
              })
            }
            placeholder="CVV"
          />
          <input
            id="valid"
            name="expiry"
            onFocus={(e) => handleFocus(e.target.name)}
            required
            value={cardDetails.valid}
            type="text"
            onChange={(e) =>
              setCardDetails({ ...cardDetails, valid: e.target.value })
            }
            placeholder="Valid thru"
          />
        </div>
        <>
          {type === "Pay" ? (
            <>
              <button onClick={handleCardDetails}>Pay securely</button>
              <button onClick={() => {cancelType==='navigate'? navigate("/address"): onCancel()}}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={handleCardDetails}>{type} card details</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          )}
        </>
      </div>
    </div>
  );
}
