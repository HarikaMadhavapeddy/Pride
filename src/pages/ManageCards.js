import React, { useEffect, useState } from "react";
import CreditCard from "../components/CreditCard";
import { get, push, ref, remove, set } from "firebase/database";
import { auth, database } from "../Firebase/Firebase";
import { toast } from "react-toastify";
import "./ManageCards.css";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export default function ManageCards() {
  const [cardDetails, setCardDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingData, setEditingData] = useState(null);
  const defaultData = {
    number: "",
    name: "",
    cvc: "",
    valid: "",
    focused: "",
    issuer: "",
  };
  useEffect(() => {
    const cardRef = ref(database, `CardDetails/${auth.currentUser.uid}`);
    get(cardRef)
      .then((snapshot) => {
        //console.log(Object.entries(snapshot.val()));
        if (snapshot.exists()) {
          setCardDetails(
            Object.entries(snapshot.val()).map(([key, cardDetails]) => ({
              key,
              ...cardDetails,
            }))
          );
        }
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);
  function AddCardDetails(userCardDetails) {
    setShowForm(false);
    const cardRef = ref(database, `CardDetails/${auth.currentUser.uid}`);
    push(cardRef, userCardDetails)
      .then((response) => {
        toast.success("Card details added successfully");
        setCardDetails([
          { key: response.key, ...userCardDetails },
          ...cardDetails,
        ]);
      })
      .catch()
      .finally(() => setShowForm(false));
    console.log(cardDetails);
  }
  function handleCancel() {
    setShowForm(false);
    setEditingData(null);
  }
  function EditCardDetails(userCardDetails) {
    console.log(userCardDetails);
    setShowForm(false);
    const cardRef = ref(
      database,
      `CardDetails/${auth.currentUser.uid}/${userCardDetails.key}`
    );
    set(cardRef, userCardDetails)
      .then(() =>
        setCardDetails((prevCardDetails) =>
          prevCardDetails.map((card) =>
            card.key === userCardDetails.key ? userCardDetails : card
          )
        )
      )
      .catch()
      .finally(() => setEditingData(null));
  }
  function handleDeleteCardDetails(key) {
    const cardRef = ref(database, `CardDetails/${auth.currentUser.uid}/${key}`);
    remove(cardRef).then(() => {
      toast.success("card details deleted successfully");
      setCardDetails((prevCardDetails) =>
        prevCardDetails.filter((details) => details.key !== key)
      );
    });
  }
  function handleEditCardDetails(card) {
    setShowForm(true);
    setEditingData(card);
  }
  return (
    <div>
      {loading ? (
        <div>...Loading</div>
      ) : (
        <div>
          {showForm ? (
            <CreditCard
              onCancel={handleCancel}
              type={editingData ? "Save" : "Add"}
              userCardDetails={editingData ? editingData : defaultData}
              handleCardDetailsCallback={
                editingData ? EditCardDetails : AddCardDetails
              }
            />
          ) : (
            <div className="ManageCards-container">
              {cardDetails.length>0? 'Fetched Card Details':'No Data Found' }
              <div>
                {cardDetails.length > 0 &&
                  cardDetails.map((card) => (
                    <p className="ManageCards">
                      XXXX XXXX XXXX {card.number.slice(14,19)}, {card.name}
                      <MdDelete className='ManageCards-delete' onClick={() => handleDeleteCardDetails(card.key)} />
                      <MdEdit className='ManageCards-delete' onClick={() => handleEditCardDetails(card)}/>
                    </p>
                  ))}
              </div>
              <button id="ManageCards-button" onClick={() => setShowForm(true)}>
                Add New Card Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
