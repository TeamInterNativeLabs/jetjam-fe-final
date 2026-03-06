import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { placeholder } from "../../../assets";
import { SiteModal } from "../../../Components/SiteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useGetSnpVideosQuery } from "../../../Redux/Services/SnpVideo";
import EmptyComponent from "../../../Components/EmptyComponent";
import SiteButton from "../../../Components/Button/button";
import { imageUrl, getImageBaseUrl } from "../../../Config/env";

const HOMEPAGE_VIDEO_LIMIT = 2;

const SaturdayNiteParty = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { data, isSuccess } = useGetSnpVideosQuery(
    { active: true },
    { refetchOnFocus: true }
  );
  const [active, setActive] = useState();
  const homepageVideos = (data?.data ?? []).slice(0, HOMEPAGE_VIDEO_LIMIT);

  useEffect(() => {
    if (isSuccess && data?.data?.length > 0) {
      setActive(data.data[0]);
    }
  }, [data, isSuccess]);

  const handleImgError = (e) => {
    e.target.src = placeholder;
  };

  return (
    <>
      <section className="saturday-nite-party pb-sm-5 pb-4 ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-10 col-lg-11 col-12 mx-auto">
              <h4 className="text-center mb-3">
                Best of the Saturday Nite Party
              </h4>
              {data?.data?.length > 0 ? (
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      {homepageVideos.map((ele) => (
                        <div
                          className="col-6 my-3 cursor-pointer"
                          key={ele._id}
                          onClick={() => setActive(ele)}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "180px", // fixed thumbnail height
                              borderRadius: "0.5rem",
                              overflow: "hidden",
                              border: `0.2rem solid ${
                                active?._id === ele?._id
                                  ? "#F6D027"
                                  : "transparent"
                              }`,
                            }}
                          >
                            <img
                              src={imageUrl(ele?.thumbnail) || placeholder}
                              alt="Video thumbnail"
                              onError={handleImgError}
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Preview Row */}
                  <div className="col-12 my-4">
                    {active && (
                      <div
                        className="site-video position-relative"
                        style={{
                          width: "100%",
                          borderRadius: "1rem",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={imageUrl(active?.thumbnail) || placeholder}
                          alt="Active video preview"
                          onError={handleImgError}
                          className="w-100 img-fluid" // keep responsive
                          style={{
                            borderRadius: "1rem",
                            objectFit: "cover",
                            maxHeight: "500px", // cap max height on big screens
                          }}
                        />
                        <button className="play-video-btn" onClick={handleShow}>
                          <FontAwesomeIcon icon={faPlay} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="col-12 text-center mt-3">
                    <Link to="/snp-videos">
                      <SiteButton>View More</SiteButton>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <EmptyComponent message="No SNP Videos" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <SiteModal show={show} className="video-modal" handleClose={handleClose}>
        <video
          poster={imageUrl(active?.thumbnail) || placeholder}
          onError={handleImgError}
          controls
        >
          <source
            src={active?.url?.startsWith('http') ? active.url : `${getImageBaseUrl().replace(/\/$/, '')}/${(active?.url || '').replace(/^\/+/, '')}`}
          />
        </video>
      </SiteModal>
    </>
  );
};

export default SaturdayNiteParty;
