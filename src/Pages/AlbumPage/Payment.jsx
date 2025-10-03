import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { motion } from "framer-motion";
import CircularCountdown from "./CircularCountdown";
import { content_bg3 } from "../../assets";
import "./payment.css";

function PaypalPayment({ album }) {
  const [paid, setPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timer;
    if (paid && timeLeft > 0) {
      setTimerActive(true);
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [paid, timeLeft]);

  const thanks = "Thank you for supporting the artist! ❤️".split(" ");

  return (
    <div className="payment-screen">
      <img src={content_bg3} className="payment-bg" alt="Background" />
      <div className="album-container">
        <p className="album-heading"> PURCHASE THIS ALBUM</p>
        <p className="album-paragraph">
          Hey! To get access to this album, please complete the payment.
        </p>
        <p className="album-paragraph">
          Once your payment is successful, a <strong>download button</strong>{" "}
          for the album{" "}
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: "smaller",
              color: "rgb(60, 191, 243)",
            }}
          >
            (.zip)
          </span>{" "}
          file will appear.
        </p>
        <p>
          ⏳ <strong className="album-warning">Important:</strong> The download
          button will only be available for <strong>5 minutes</strong>.
        </p>
      </div>

      {!paid ? (
        <div className="payment-button">
          <PayPalButtons
            createOrder={async () => {
              const response = await fetch(
                `${import.meta.env.VITE_APP_BASE_URL}/album/create-album-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    albumId: album?._id, // 👈 replace with actual data
                    price: album?.price, // 👈 example field
                  }),
                }
              );
              const data = await response.json();
              return data.id; // Use order ID from server
            }}
            onApprove={async (data) => {
              await fetch(
                `${
                  import.meta.env.VITE_APP_BASE_URL
                }/album/capture-album-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ order_id: data.orderID }),
                }
              );
              setPaid(true);
            }}
            onError={(err) => {
              console.error(err);
              alert("Payment failed");
            }}
            className="p-button"
          />
        </div>
      ) : (
        <motion.div
          className="download-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {timerActive && timeLeft > 0 && (
            <CircularCountdown timeLeft={timeLeft} />
          )}
          <motion.button
            className="download-button"
            disabled={timeLeft <= 0}
            onClick={() => {
              window.open(
                `${
                  import.meta.env.VITE_APP_IMAGE_BASE_URL + "/" + album?.file
                }`,
                "_blank"
              );
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              timeLeft <= 30 && timeLeft > 0
                ? {
                    scale: [1, 1.05, 1],
                    transition: { repeat: Infinity, duration: 1 },
                  }
                : {}
            }
          >
            {timeLeft > 0 ? "Download" : "Link Expired"}
          </motion.button>
          <p className="album-thanks">
            {thanks.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i / 6 }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default PaypalPayment;
