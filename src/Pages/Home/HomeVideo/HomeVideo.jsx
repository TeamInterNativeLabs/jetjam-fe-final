import React from "react";
import "./HomeVideo.css";

const YOUTUBE_VIDEO_ID = "eXGk9qRmVJ0";

const HomeVideo = () => {
  return (
    <>
      <section className="raise-the-occasion pb-sm-5 pb-4">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10 col-lg-11 text-center">
              <div className="site-video mt-3">
                <div className="player-wrapper">
                  <iframe
                    className="react-player youtube-embed"
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
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
