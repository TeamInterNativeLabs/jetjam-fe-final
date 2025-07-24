import React, { useState } from "react";
import { sampleVideo, siteVideoPoster } from "../../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "./HomeVideo.css";
import { SiteModal } from "../../../Components/SiteModal";
import ReactPlayer from "react-player/lazy";

const HomeVideo = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <section className="raise-the-occasion pb-sm-5 pb-4">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10 col-lg-11 text-center">
              <div className="site-video mt-3">
                <div className="player-wrapper">
                  <ReactPlayer
                    className="react-player"
                    url="https://youtu.be/eXGk9qRmVJ0"
                    width="100%"
                    height="100%"
                  />
                </div>

                {/* <img src={siteVideoPoster} alt="" className="img-fluid w-100" />
                                <button className="play-video-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlay} /> </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <SiteModal show={show} className="video-modal" handleClose={handleClose}>
                <video poster={siteVideoPoster} controls>
                    <source src={sampleVideo} />
                </video>
            </SiteModal> */}
    </>
  );
};

export default HomeVideo;
