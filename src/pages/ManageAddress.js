import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormAddress from "../components/FormAddress";
import { AddAddress, DeleteAddress, UpdateAddress } from "../Redux/AddressSlice";
import { auth } from "../Firebase/Firebase";
import { toast } from "react-toastify";
import "./ManageAddress.css";

export default function () {
  const { data, loading, error } = useSelector((state) => state.UserAddress);
  const [editingAddress, setEditingAddress] = useState(null);
  const Dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  function handleAddAddress(address) {
    Dispatch(AddAddress(address))
      .then(() => toast.success("address added successfully"))
      .catch((error) => toast.error(error))
      .finally(() => setShowForm(false));
  }
  function handleDeleteAddress(key) {
    Dispatch(DeleteAddress(key))
      .then(() => toast.success("Address deleted successfully"))
      .catch((error) => toast.error("Failed to delete address"));
  }
  function handleEditAddress(key) {
    setShowForm(true);
    const EditAddress = data.find((address) => address.key === key);
    setEditingAddress(EditAddress);
  }
  function handleUpdateAddress(updatedAddress){
Dispatch(UpdateAddress(updatedAddress)).then(()=>{
    setShowForm(false);
    toast.success('Address updated successfully');
}).catch((error)=>toast.error('failed to update address'));
  }
  return (
    <div className="manageAddress">
      <h1>Manage Address</h1>
      <div className="manageAddress-container">
        {showForm ? (
          <>
            {editingAddress ? (
              <FormAddress
                type="Save Address"
                addressData={editingAddress}
                onSave={handleUpdateAddress}
                handleCancel={() => setShowForm(false)}
              />
            ) : (
              <FormAddress
                onSave={handleAddAddress}
                handleCancel={() => setShowForm(false)}
              />
            )}
          </>
        ) : (
          <div className="manageAddress-sec2">
            <span>Fetched</span>
            {data.length > 0 ? (
              data.map((address) => (
                <span>
                  <p>
                    {address.adLn1}, {address.adLn2}, {address.state},{" "}
                    {address.country}, {address.pincode}
                    <button className="manageAddress-Sec2-Button" onClick={() => handleEditAddress(address.key)}>
                      Edit
                    </button>
                    <button className="manageAddress-Sec2-Button" onClick={() => handleDeleteAddress(address.key)}>
                      Delete
                    </button>
                  </p>
                </span>
              ))
            ) : (
              <p>No addresses found</p>
            )}
            <button
              className="manageAddressButton"
              onClick={() => setShowForm(true)}
            >
              Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
