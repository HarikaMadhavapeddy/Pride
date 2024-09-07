import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormAddress from "../components/FormAddress";
import { AddAddress } from "../Redux/AddressSlice";
import { toast } from "react-toastify";

export default function Address() {
  const { data, error, loading } = useSelector((state) => state.UserAddress);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showForm, setShowForm] = useState(false);
  const Dispatch = useDispatch();
  function handleSelectAddress(address) {
    setSelectedAddress(address);
  }
  function handleProceedToPayment(userSelectedAdress) {
    sessionStorage.setItem("address", JSON.stringify(userSelectedAdress));
    navigate("/payment");
  }
  function handleAddAddress(address) {
    Dispatch(AddAddress(address))
      .then(() => handleProceedToPayment(address))
      .catch((error) => toast.error(error));
  }

  return (
    <>
      {data.length > 0 ? (
        <>
          {showForm ? (
            <FormAddress onSave={handleAddAddress} type="Save and Continue" handleCancel={() => setShowForm(false)}/>
          ) : (
            <div>
              {data.map((address) => (
                <span>
                  <input
                    type="radio"
                    onChange={() => handleSelectAddress(address)}
                  />
                  {address.adLn1},{address.adLn2},{address.state},
                  {address.country},{address.pincode}
                </span>
              ))}
              <button onClick={()=>setShowForm(true)}>Add new Address</button>
              <button onClick={() => handleProceedToPayment(selectedAddress)}>
                Proceed to Payment
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <FormAddress onSave={handleAddAddress} type="Save and Proceed" />
        </>
      )}
    </>
  );
}
