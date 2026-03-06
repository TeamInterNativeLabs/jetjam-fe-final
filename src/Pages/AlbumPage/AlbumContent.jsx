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

export const AlbumContent = ({ setBuy, setAlbum }) => {
  const [albumData, setAlbumData] = useState();
  const getAlbumData = async () => {
    try {
      const res = await fetch(
        `${getApiBaseUrl()}/album/get-paid-album`
      );

      const json = await res.json(); // 👈 parse the JSON body

      if (!json.success) throw new Error("Failed to fetch album data");

      console.log("Album Data: ", json?.data);
      setAlbumData(json.data);
      setAlbum(json.data);
    } catch (error) {
      console.error("Error fetching album:", error);
    }
  };

  useEffect(() => {
    const data = {
      title: "Skyline Stories",
      description:
        `"Skyline Stories" captures the essence of urban youth, late-night walks, and stories told under neon skies with a nostalgic yet fresh vibe.`.split(
          " "
        ),
      trackList: [
        { title: "Hanging High", artist: "Skyro" },
        { title: "Neon Conversations", artist: "Luma" },
        { title: "Faded Graffiti", artist: "Kairo" },
        { title: "Cloud Tapes", artist: "Luna Vale" },
        { title: "Night Drip", artist: "Solvane" },
        { title: "City Static", artist: "Jaxon Grey" },
        { title: "Glow in Transit", artist: "Ivy Echo" },
        { title: "Concrete Dreams", artist: "V!be" },
        { title: "Stolen Frequencies", artist: "Mira Rae" },
        { title: "Afterhours Echoes", artist: "Felix Shore" },
        { title: "Streetlight Diaries", artist: "Rhea" },
        { title: "Midnight Monologue", artist: "Azura" },
      ],
      price: 9.99,
      bpm: 190,
      minutes: 48,
      album_cover,
    };
    // setAlbumData(data);
    getAlbumData();

    console.log(data);
  }, []);

  return (
    <div>
      {albumData && (
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
