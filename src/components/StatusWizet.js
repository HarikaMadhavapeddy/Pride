import React from "react";
import "./StatusWizet.css";
import { ShortFormatDate } from "./Util";

export default function StatusWizet({ orderDetails }) {
  const currentDate = new Date();
  const orderPlacedDate = new Date(orderDetails.orderDate);
  const estShippingDate = new Date(orderDetails.estShippingDate);
  const deliveryDate = new Date(orderDetails.deliveryDate);
  const isOrderPlaced = currentDate >= orderPlacedDate;
  const isShipped = currentDate >= estShippingDate;
  const isDelivered = currentDate >= deliveryDate;
  const cancelledDate = orderDetails.CancelledDate
    ? new Date(orderDetails.CancelledDate)
    : null;
  const isCancelled = orderDetails.status === "cancelled";

  return (
    <div className="statusWidget-container">
      <div className="statusWidget">
        <div className={`circle ${isOrderPlaced ? "Active" : ""}`}>
          <span>
            Ordered
            <br />
            {ShortFormatDate(orderPlacedDate)}
          </span>
        </div>
        <div className={`line ${isCancelled ? 'Deactive' : isShipped ? "Active" : ''}`}></div>
        <div className={`circle ${isCancelled ? 'Deactive' : isShipped ? "Active" : ''}`}>
          <span>
            Shipping by
            <br />
            {ShortFormatDate(estShippingDate)}
          </span>
        </div>
        <div className={`line ${isCancelled ? 'Deactive' : isDelivered ? "Active" : ''}`}></div>
        <div className={`circle ${isCancelled ? 'Deactive' : isDelivered ? "Active" : ''}`}>
          <span>
            Delivery by
            <br />
            {ShortFormatDate(deliveryDate)}
          </span>
        </div>
        {isCancelled && (
          <>
            <div className={`line ${isCancelled ? 'Deactive':'' }`}></div>
            <div className={`circle ${isCancelled ? "Active" : ""}`}>
              <span>
                Cancelled
                <br />
                {ShortFormatDate(cancelledDate)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
