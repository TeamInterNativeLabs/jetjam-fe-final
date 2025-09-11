import React from "react";
import "./style.css";
import { motion } from "framer-motion";
import {
  album_cover,
  bannerPoster,
  bannerVideo,
  bg_cover,
  bg_cover2,
  bpm,
  content_bg,
  content_bg2,
  content_bg3,
  minutes,
  price_tag,
  price_tag2,
} from "../../assets";
import Countdown from "./Countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

const AlbumPage = () => {
  const title =
    `"Skyline Stories" captures the essence of urban youth, late-night walks, and stories told under neon skies with a nostalgic yet fresh vibe.`.split(
      " "
    );
  const trackList = [
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
  ];
  return (
    <>
      {/* <video
        muted
        autoPlay
        playsInline
        loop
        poster={bannerPoster}
        className="banner-video"
      >
        <source src={bannerVideo} />
      </video> */}
      <img className="banner-video" src={bg_cover2}></img>
      <div className="album-page">
        <motion.div
          className="album-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="album-content-wrapper">
            <div
              className="album-image"
              style={{
                backgroundImage: `url(${album_cover})`,
              }}
            >
              <img className="price-tag" src={price_tag2}></img>
              <p className="album-price">$9.99</p>
            </div>

            <div className="album-content">
              <img src={content_bg3} className="content-bg" />
              <p className="album-title">SKYLINE STORIES</p>
              <p className="album-description">
                {title.map((el, i) => (
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
                {trackList.map((track, index) => (
                  <li key={index}>
                    <strong>
                      <motion.span
                        className="singer"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 * index, duration: 0.4 }}
                      >
                        {track.title}
                      </motion.span>
                    </strong>{" "}
                  </li>
                ))}
              </ul>
              {/* <p className="bpm-title">190</p> */}
              <img src={bpm} width={100} className="bpm" />
              <Countdown type={"bpm"} max={190} />
              {/* <p className="clock">48:00</p> */}
              <img src={minutes} width={100} className="minute" />
              <span style={{ display: "flex", flexDirection: "row" }}>
                <Countdown type={"clock"} max={48} />
                <p className="clock-">:00</p>
              </span>
              {/* <p className="minute-text">MIN</p> */}
            </div>

            {/* Overlapping Buy Button */}
            <motion.button
              className="buy-button-overlap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Redirect to payment...")}
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
                  fontFamily: "Superion",
                }}
              >
                BUY NOW
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AlbumPage;
