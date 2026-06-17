import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { UserLayout } from "../../Components/Layout";
import Loader from "../../Components/Loader";
import { getApiBaseUrl, imageUrl } from "../../Config/env";
import { placeholder } from "../../assets";
import "./index.css";

const AlbumPurchase = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { token } = useSelector((state) => state.authSlice);

  const [album,       setAlbum]       = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [paid,        setPaid]        = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [alreadyOwned, setAlreadyOwned] = useState(false);

  // Fetch album details
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${getApiBaseUrl()}/album/get-paid-album/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Album not found");
        setAlbum(json.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  // Check if user already owns this album
  useEffect(() => {
    if (!token || !id) return;
    const checkOwnership = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/album/my-purchases`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success) {
          const owned = json.data.some(p => p.album?._id === id || p.album === id);
          if (owned) setAlreadyOwned(true);
        }
      } catch (_) {}
    };
    checkOwnership();
  }, [token, id]);

  const handleDownload = async () => {
    if (!token) return;
    setDownloading(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/album/download/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Download failed. Please log in.");
        return;
      }
      const blob = await res.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `${album?.name || "album"}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return (
    <UserLayout>
      <div className="album-purchase-page">
        <Loader loading={true} />
      </div>
    </UserLayout>
  );

  if (error) return (
    <UserLayout>
      <div className="album-purchase-page">
        <div className="ap-error">
          <h3>Album not found</h3>
          <p>{error}</p>
        </div>
      </div>
    </UserLayout>
  );

  return (
    <UserLayout>
      <div className="album-purchase-page">
        <div className="ap-container">

          {/* Left — album info */}
          <motion.div
            className="ap-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="ap-cover-wrapper">
              <img
                src={imageUrl(album?.image) || placeholder}
                alt={album?.name}
                className="ap-cover"
                onError={e => { e.target.src = placeholder; }}
              />
              <div className="ap-price-badge">${album?.price}</div>
            </div>

            <h1 className="ap-title">{album?.name}</h1>
            <p className="ap-genre">{album?.genre?.name}</p>
            <p className="ap-description">{album?.description}</p>

            <div className="ap-meta">
              {album?.bpm  && <span className="ap-meta-chip">{album.bpm} BPM</span>}
              {album?.length && <span className="ap-meta-chip">{Math.round(album.length / 60)} min</span>}
              <span className="ap-meta-chip">{album?.tracks?.length || 0} tracks</span>
            </div>

            {album?.tracks?.length > 0 && (
              <div className="ap-tracklist">
                <p className="ap-tracklist-title">TRACKLIST</p>
                <ol>
                  {album.tracks.map((track, i) => (
                    <li key={track._id || i}>{track.name}</li>
                  ))}
                </ol>
              </div>
            )}
          </motion.div>

          {/* Right — payment */}
          <motion.div
            className="ap-payment"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {alreadyOwned || paid ? (
              <div className="ap-success">
                <div className="ap-success-icon">✓</div>
                <h2>{alreadyOwned ? "You own this album" : "Payment Successful!"}</h2>
                <p>
                  {alreadyOwned
                    ? "You have already purchased this album. Click below to download."
                    : "Thank you for your purchase! A confirmation email has been sent to you. Click below to download your album."}
                </p>
                {token ? (
                  <button
                    className="ap-download-btn"
                    onClick={handleDownload}
                    disabled={downloading}
                  >
                    {downloading ? "Downloading…" : "⬇ Download Album"}
                  </button>
                ) : (
                  <div>
                    <p className="ap-login-note">Please log in to download your album.</p>
                    <a href="/login" className="ap-login-btn">Log In</a>
                  </div>
                )}
              </div>
            ) : (
              <div className="ap-buy-section">
                <h2>Purchase This Album</h2>
                <div className="ap-price-display">
                  <span className="ap-price-amount">${album?.price}</span>
                  <span className="ap-price-note">one-time purchase · lifetime access</span>
                </div>
                <p className="ap-buy-desc">
                  Pay securely with PayPal. After payment you will receive a download link by email
                  and the album will be available in your account.
                </p>

                <PayPalScriptProvider
                  options={{
                    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                    createOrder={async () => {
                      const res = await fetch(`${getApiBaseUrl()}/album/create-album-order`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        },
                        body: JSON.stringify({ albumId: id, price: album?.price }),
                      });
                      const data = await res.json();
                      if (!data.id) throw new Error(data.message || "Order creation failed");
                      return data.id;
                    }}
                    onApprove={async (data) => {
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
                        setPaid(true);
                      } else {
                        alert(result.message || "Payment capture failed. Please contact support.");
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert("Payment failed. Please try again.");
                    }}
                  />
                </PayPalScriptProvider>

                <p className="ap-secure-note">🔒 Secure payment via PayPal</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </UserLayout>
  );
};

export default AlbumPurchase;
