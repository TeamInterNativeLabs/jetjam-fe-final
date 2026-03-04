import React, { useState } from "react";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import { barVisualizer, discIcon, jetText } from "../../../assets";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LIVE_STREAM_URL =
  "https://cast2.my-control-panel.com/proxy/jetjamsj/stream";

function JetJamsLiveStream() {
  const [audioPlayed, setAudioPlayed] = useState(false);

  const toggleAudio = () => {
    setAudioPlayed((prev) => !prev);
    console.log("Audio toggled:", !audioPlayed);
  };

  return (
    <section className="pb-sm-5 pb-4" id="listen-live">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11 col-12">
            <div className="px-lg-5 px-md-4">
              <img src={jetText} alt="Jet Jams" className="img-fluid w-100" />
            </div>

            <div className="live-stream-audio-player">
              <div className="mt-5 mb-4">
                <img
                  src={barVisualizer}
                  alt="Visualizer"
                  className="img-fluid"
                />
              </div>

              <div className="d-flex align-items-center gap-3">
                {/* Left Disc */}
                <div className="flex-shrink-0">
                  <img
                    src={discIcon}
                    alt="Disc Left"
                    className={`img-fluid disc-img${
                      audioPlayed ? " disc-moving" : ""
                    }`}
                  />
                </div>

                {/* Player and Button */}
                <div className="flex-grow-1 text-center">
                  <button onClick={toggleAudio} className="audio-play-btn">
                    {audioPlayed ? (
                      <FontAwesomeIcon icon={faPause} />
                    ) : (
                      <FontAwesomeIcon icon={faPlay} />
                    )}
                  </button>

                  <ReactPlayer
                    url={LIVE_STREAM_URL}
                    playing={audioPlayed}
                    controls={false}
                    onError={(e) => console.error("Stream loading error:", e)}
                    style={{ display: "none" }}
                    stopOnUnmount
                  />
                </div>

                {/* Right Disc */}
                <div className="flex-shrink-0">
                  <img
                    src={discIcon}
                    alt="Disc Right"
                    className={`img-fluid disc-img${
                      audioPlayed ? " disc-moving" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JetJamsLiveStream;
