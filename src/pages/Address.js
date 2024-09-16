import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormAddress from "../components/FormAddress";
import { AddAddress } from "../Redux/AddressSlice";
import { toast } from "react-toastify";
import './Address.css';

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
    navigate("/payment",{state:{selectedAddress}});
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
            <div className="AddressPage-container">
              Select shipping address
              {data.map((address) => (
                <div className="AddressBlock">
                  <input type="radio"
                  name='address'
                    onChange={() => handleSelectAddress(address)}
                  />
                  <div>
                    <p>{address.adLn1}<br/>{address.adLn2}<br/>{address.state}<br/>
                    {address.country},{address.pincode}</p>
                  </div>
                  
                </div>
              ))}
              <div className="AddressButton-container">
              <button className="AddressButton" onClick={()=>setShowForm(true)}>Add new Address</button>
              <button className="AddressButton" onClick={() => handleProceedToPayment(selectedAddress)}>
                Proceed to Payment
              </button>
              </div>
              
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
