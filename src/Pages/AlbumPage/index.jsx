import React, { useState } from "react";
import "./style.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { motion } from "framer-motion";
import { bg_cover2 } from "../../assets";

import PaypalPayment from "./Payment";
import { AlbumContent } from "./AlbumContent";

const AlbumPage = () => {
  const [buy, setBuy] = useState(false);
  const [album, setAlbum] = useState("");

  return (
    <>
      <img className="banner-picture" src={bg_cover2} alt="Album Banner" />
      <div className="album-page">
        <motion.div
          className={`album-card ${buy ? "flipped" : ""}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <AlbumContent setBuy={setBuy} setAlbum={setAlbum} />
            </div>
            <div className="flip-card-back">
              <PayPalScriptProvider
                options={{
                  "client-id": `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`, // Replace with your actual client ID
                  currency: "USD",
                }}
              >
                <PaypalPayment setBuy={setBuy} album={album} />
              </PayPalScriptProvider>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AlbumPage;
