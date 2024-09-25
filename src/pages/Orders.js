import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, database } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const orderRef = ref(database, `Orders/${auth.currentUser.uid}`);
    get(orderRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          //console.log(Object.values(snapshot.val()));
          setOrders(Object.values(snapshot.val()));
        }
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  return (
    <div >
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {orders.length > 0 ? (
            <div className="Orders-container">
              <ul className="OrderDetails">
                {orders.map((item) => (
                  <li className="OrderDetails-Item">
                    <Link className="OrderDetailsLink" to={`/orders/${item.orderId}`}>
                      <div >
                        <h4>Order Id : {item.orderId}</h4>
                        <div className="OrderItemDetails">
                          {item.items.map((value) => (
                            <div className="OrderItemDetails-single">
                            <img src={value.images[0]}/>
                            <p>{value.title}</p>
                            </div>
                            
                          ))}
                        </div>
                        <p>Order Status : <span className={item.status==='cancelled'? 'StatusDeactive':'StatusActive'}>{item.status}</span></p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No Orders</p>
          )}
        </div>
      )}
    </div>
  );
}
