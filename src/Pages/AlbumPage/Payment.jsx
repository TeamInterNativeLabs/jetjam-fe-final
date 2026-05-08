import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import CircularCountdown from "./CircularCountdown";
import { content_bg3 } from "../../assets";
import { getApiBaseUrl } from "../../Config/env";
import "./payment.css";

function PaypalPayment({ album }) {
  const [paid, setPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Get auth token from Redux to send with download request
  const { token } = useSelector((state) => state.authSlice);

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

  // FIX #6: Secure download — calls backend endpoint that verifies purchase
  const handleDownload = async () => {
    if (!album?._id) return;
    setDownloading(true);
    try {
      const response = await fetch(
        `${getApiBaseUrl()}/album/download/${album._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        alert(err.message || "Download failed. Please try again.");
        return;
      }

      // Stream the file as a download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${album?.name || "album"}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="payment-screen">
      <img src={content_bg3} className="payment-bg" alt="Background" />
      <div className="album-container">
        <p className="album-heading">PURCHASE THIS ALBUM</p>
        <p className="album-paragraph">
          Hey! To get access to this album, please complete the payment.
        </p>
        <p className="album-paragraph">
          Once your payment is successful, a <strong>download button</strong>{" "}
          for the album{" "}
          <span style={{ fontFamily: "sans-serif", fontSize: "smaller", color: "rgb(60, 191, 243)" }}>
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
                `${getApiBaseUrl()}/album/create-album-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                  },
                  body: JSON.stringify({
                    albumId: album?._id,
                    price: album?.price,
                  }),
                }
              );
              const data = await response.json();
              if (!data.id) throw new Error(data.message || "Order creation failed");
              return data.id;
            }}
            onApprove={async (data) => {
              const res = await fetch(
                `${getApiBaseUrl()}/album/capture-album-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                  },
                  body: JSON.stringify({ order_id: data.orderID }),
                }
              );
              const result = await res.json();
              if (result.success) {
                setPaid(true);
              } else {
                alert(result.message || "Payment capture failed");
              }
            }}
            onError={(err) => {
              console.error(err);
              alert("Payment failed. Please try again.");
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
            disabled={timeLeft <= 0 || downloading}
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              timeLeft <= 30 && timeLeft > 0
                ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1 } }
                : {}
            }
          >
            {downloading ? "Downloading…" : timeLeft > 0 ? "Download" : "Link Expired"}
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
