import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeholder } from "../../assets";
import { SiteModal } from "../../Components/SiteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useGetSnpVideosQuery } from "../../Redux/Services/SnpVideo";
import EmptyComponent from "../../Components/EmptyComponent";
import { UserLayout } from "../../Components/Layout";
import "./index.css";

const SnpVideos = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);
  const handleShow = (video) => {
    setActive(video);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setActive(null);
  };

  const { data, isSuccess } = useGetSnpVideosQuery(
    { active: true },
    { refetchOnFocus: true }
  );
  const videos = data?.data ?? [];

  const handleImgError = (e) => {
    e.target.src = placeholder;
  };

  return (
    <UserLayout>
      <section className="snp-videos-page beat-mixed-set pb-sm-5 pb-4">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-11 col-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <h4 className="mb-0">Best of the Saturday Nite Party</h4>
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate("/")}
                >
                  ← Back to Home
                </button>
              </div>
              {videos.length > 0 ? (
                <div className="row">
                  {videos.map((ele) => (
                    <div
                      className="col-sm-6 col-md-4 col-lg-3 my-3 cursor-pointer"
                      key={ele._id}
                      onClick={() => handleShow(ele)}
                    >
                      <div
                        className="snp-video-card position-relative"
                        style={{
                          borderRadius: "0.5rem",
                          overflow: "hidden",
                          aspectRatio: "16/9",
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${ele?.thumbnail}`}
                          alt={ele?.title || "Video"}
                          onError={handleImgError}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                        <div className="snp-video-card-overlay">
                          <FontAwesomeIcon icon={faPlay} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyComponent message="No SNP Videos" />
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteModal show={show} className="video-modal" handleClose={handleClose}>
        {active && (
          <video
            poster={`${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${active?.thumbnail}`}
            onError={(e) => handleImgError(e)}
            controls
            autoPlay
          >
            <source
              src={`${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${active?.url}`}
            />
          </video>
        )}
      </SiteModal>
    </UserLayout>
  );
};

export default SnpVideos;
