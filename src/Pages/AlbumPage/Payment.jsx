import React, { useState } from "react";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { content_bg3 } from "../../assets";
import { getApiBaseUrl } from "../../Config/env";
import "./payment.css";

function PaypalPayment({ album }) {
  const [paid,          setPaid]          = useState(false);
  const [downloading,   setDownloading]   = useState(false);
  const [downloadToken, setDownloadToken] = useState(null);
  const [payerEmail,    setPayerEmail]    = useState(null);
  const { token } = useSelector((state) => state.authSlice);

  const thanks = "Thank You".split(" ");

  // Download using secure token — no login required, works forever
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const url = downloadToken
        ? `${getApiBaseUrl()}/album/download-by-token/${downloadToken}`
        : `${getApiBaseUrl()}/album/download/${album._id}`;

      const headers = (!downloadToken && token)
        ? { Authorization: `Bearer ${token}` }
        : {};

      const res = await fetch(url, { headers });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Download failed. Please use the link in your email.");
        return;
      }
      const blob   = await res.blob();
      const objUrl = window.URL.createObjectURL(blob);
      const a      = document.createElement("a");
      a.href        = objUrl;
      a.download    = `${album?.name || "album"}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objUrl);
    } catch (err) {
      alert("Download failed. Please use the link in your email.");
    } finally {
      setDownloading(false);
    }
  };

  const createOrder = async () => {
    const res = await fetch(`${getApiBaseUrl()}/album/create-album-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ albumId: album?._id, price: album?.price }),
    });
    const data = await res.json();
    if (!data.id) throw new Error(data.message || "Order creation failed");
    return data.id;
  };

  const onApprove = async (data) => {
    const res = await fetch(`${getApiBaseUrl()}/album/capture-album-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ order_id: data.orderID }),
    });
    const result = await res.json();
    if (result.success) {
      setDownloadToken(result.download_token || null);
      setPayerEmail(result.payer_email || null);
      setPaid(true);
    } else {
      alert(result.message || "Payment capture failed. Please contact support.");
    }
  };

  const onError = (err) => {
    console.error("PayPal error:", err);
    alert("Payment failed. Please try again.");
  };

  return (
    <div className="payment-screen">
      <img src={content_bg3} className="payment-bg" alt="" />

      {!paid ? (
        <div className="payment-content">
          <h2 className="album-heading">Complete Purchase</h2>
          <p className="album-price-label">${album?.price}</p>
          <p className="album-name-label">{album?.name}</p>
          <div className="payment-divider" />

          <div className="payment-button">
            <PayPalButtons
              style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay", height: 45 }}
              fundingSource={FUNDING.PAYPAL}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              className="p-button"
            />
            <PayPalButtons
              style={{ layout: "vertical", color: "black", shape: "rect", height: 45 }}
              fundingSource={FUNDING.CARD}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              className="p-button"
            />
          </div>

          <p style={{ fontSize: '11px', color: '#4a7c9e', textAlign: 'center', marginTop: '4px' }}>
            🔒 Secured by PayPal · All payments go to JetJams LLC
          </p>
          <button
            onClick={() => {/* handled by parent setBuy */}}
            style={{ background: 'none', border: 'none', color: '#4a7c9e', fontSize: '12px', cursor: 'pointer', marginTop: '4px', textDecoration: 'underline' }}
          >
            ← Back to album
          </button>
        </div>
      ) : (
        <motion.div
          className="download-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="success-icon">✓</div>
          <p style={{ color: '#F6D027', fontSize: '22px', fontWeight: 800, margin: 0 }}>
            Payment Successful!
          </p>
          <p style={{ color: '#aaa', fontSize: '13px', margin: 0, textAlign: 'center', maxWidth: '320px' }}>
            Your album is ready to download.
            {payerEmail && (
              <> A permanent download link has also been sent to <strong style={{ color: '#3cbff3' }}>{payerEmail}</strong>.</>
            )}
            <br />You can download as many times as you want — no expiry.
          </p>

          <motion.button
            className="download-button"
            disabled={downloading}
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {downloading ? "Downloading…" : "⬇ Download Album"}
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
