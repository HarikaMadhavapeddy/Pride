import React, { useState } from "react";
import "./FormAddress.css";
import { toast } from "react-toastify";

export default function FormAddress({ onSave, handleCancel, addressData={}, type='Add Address' }) {
  const [address, setAddress] = useState(addressData);
  function handleAddress() {
    if (
      address.adLn1 === "" ||
      address.adLn2 === "" ||
      address.state === "" ||
      address.country === "" ||
      address.pincode === ""
    ) {
        toast.error('Please fill in all the fields');
    }else if(address.pincode.length!==5){
toast.error('Please enter a valid pincode');
    }
    else{
        onSave(address);
    }
    //basic validation
    
  }
  return (
    <div className="AddressForm">
      <input
        type="text"
        value={address.adLn1}
        required
        onChange={(e) => setAddress({ ...address, adLn1: e.target.value })}
        placeholder="street/lane"
      />
      <input
        type="text"
        value={address.adLn2}
        required
        onChange={(e) => setAddress({ ...address, adLn2: e.target.value })}
        placeholder="county"
      />
      <input
        type="text"
        value={address.state}
        required
        onChange={(e) => setAddress({ ...address, state: e.target.value })}
        placeholder="state"
      />
      <input
        type="text"
        required
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
        placeholder="country"
      />
      <input
        type="number"
        value={address.pincode}
        required
        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        placeholder="pincode"
      />
      <div>
        <button onClick={handleAddress}>{type}</button>
        {type!=='Save and Proceed'&& <button onClick={handleCancel}>Cancel</button>}
      </div>
    </div>
  );
}
