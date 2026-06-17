import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { motion, AnimatePresence } from "framer-motion";
import { bg_cover2 } from "../../assets";

import PaypalPayment from "./Payment";
import { AlbumContent } from "./AlbumContent";

const AlbumPage = () => {
  const { id } = useParams();
  const [buy,   setBuy]   = useState(false);
  const [album, setAlbum] = useState(null);

  return (
    <>
      <img className="banner-picture" src={bg_cover2} alt="Album Banner" />
      <div className="album-page">
        <div className="album-card-wrapper">
          <AnimatePresence mode="wait">
            {!buy ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%' }}
              >
                <AlbumContent setBuy={setBuy} setAlbum={setAlbum} albumId={id} />
              </motion.div>
            ) : (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%' }}
              >
                <PayPalScriptProvider
                  options={{
                    "client-id": `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`,
                    currency: "USD",
                    intent: "capture",
                    "disable-funding": "paylater,venmo,credit",
                    vault: false,
                    "enable-funding": "card",
                  }}
                >
                  <PaypalPayment setBuy={setBuy} album={album} />
                </PayPalScriptProvider>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default AlbumPage;
