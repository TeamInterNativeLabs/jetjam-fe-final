// PayPalButtonWrapper.js
import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButtonWrapper() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "20.00", // 💲 Set your price here
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            // 🚀 You can now call your backend to store payment details
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout onError", err);
        }}
      />
    </div>
  );
}

export default PayPalButtonWrapper;
