import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import Countdown from "./Countdown";
import { motion } from "framer-motion";

import {
  album_cover,
  bpm,
  content_bg3,
  minutes,
  price_tag2,
  placeholder,
} from "../../assets";
import { getApiBaseUrl, imageUrl } from "../../Config/env";

export const AlbumContent = ({ setBuy, setAlbum, albumId }) => {
  const [albumData, setAlbumData] = useState();
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const getAlbumData = async () => {
    try {
      setLoading(true);
      setError(null);
      // If albumId is provided fetch that specific album, otherwise fetch the active one
      const url = albumId
        ? `${getApiBaseUrl()}/album/get-paid-album/${albumId}`
        : `${getApiBaseUrl()}/album/get-paid-album`;

      const res  = await fetch(url);
      const json = await res.json();

      if (!json.success) throw new Error(json.message || "Failed to fetch album data");

      setAlbumData(json.data);
      setAlbum(json.data);
    } catch (err) {
      console.error("Error fetching album:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAlbumData();
  }, [albumId]);

  return (
    <div>
      {loading && (
        <div style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F6D027', fontSize: '18px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎵</div>
            Loading album...
          </div>
        </div>
      )}
      {error && (
        <div style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#ff6b6b', textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
            <p>Could not load album.</p>
            <p style={{ fontSize: '12px', color: '#aaa' }}>{error}</p>
          </div>
        </div>
      )}
      {!loading && !error && albumData && (
        <div className="album-content-wrapper">
          <div
            className="album-image"
            style={{
              backgroundImage: `url(${imageUrl(albumData?.image?.replace(/\\/g, "/")) || placeholder})`,
            }}
          >
            <img className="price-tag" src={price_tag2}></img>
            <p className="album-price">${albumData?.price}</p>
          </div>

          <div className="album-content">
            <img src={content_bg3} className="content-bg" />
            <p className="album-title">{albumData?.name?.toUpperCase()}</p>
            <p className="album-description">
              {albumData?.description?.split("")?.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: i / 10,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
            </p>

            <p className="tracklist-title">TRACKLIST:</p>

            <ul>
              {albumData?.tracks?.map((track, index) => (
                <li key={index}>
                  <strong>
                    <motion.span
                      className="singer"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.4 }}
                    >
                      {track?.name}
                    </motion.span>
                  </strong>{" "}
                </li>
              ))}
            </ul>
            {/* <p className="bpm-title">190</p> */}
            <img src={bpm} width={100} className="bpm" />
            <Countdown type={"bpm"} max={albumData?.bpm} />
            {/* <p className="clock">48:00</p> */}
            <img src={minutes} width={100} className="minute" />
            <span style={{ display: "flex", flexDirection: "row" }}>
              <Countdown type={"clock"} max={albumData?.length / 60} />
              <p className="clock-">:00</p>
            </span>
            {/* <p className="minute-text">MIN</p> */}
          </div>

          {/* Overlapping Buy Button */}
          <motion.button
            className="buy-button-overlap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setBuy(true)}
          >
            <FontAwesomeIcon
              icon={faCreditCard}
              style={{
                marginRight: "10px",
                fontSize: "1.2rem",
                fontWeight: "bolder",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "bolder",
              }}
            >
              BUY NOW
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};
