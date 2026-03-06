import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { beatmixPlayStationData } from "../../../Config/Data";
import CustomAudioPlayer from "./AudioPlayer/AudioPlayer";
import { formatDate, formatSecondsToString } from "../../../Utils/helper";
import { useSelector } from "react-redux";
import { imageUrl } from "../../../Config/env";
import { placeholder } from "../../../assets";

const settings = {
  slidesToShow: 4,
  vertical: true,
  arrows: false,
  swipeToSlide: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1399,
      settings: {
        vertical: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        vertical: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        vertical: false,
      },
    },
  ],
};

const onImgError = (e) => { e.target.onerror = null; e.target.src = placeholder; };

const BeatMixImageCard = ({ image }) => {
  const img = imageUrl(image) || placeholder;

  return (
    <div className="p-3" style={{ cursor: "pointer" }}>
      <img src={img} alt="" className="img-fluid w-100 beat-mix-img" onError={onImgError} />
    </div>
  );
};

const BeatMixCard = ({ data, enablePlayer }) => {
  const img = imageUrl(data?.image) || placeholder;

  return (
    <div>
      <div className="row align-items-center">
        <div className="col-lg-7 my-3">
          <img
            src={img}
            alt=""
            className="img-fluid w-100"
            style={{ borderRadius: "20px", height: "500px" }}
            onError={onImgError}
          />
        </div>
        <div className="col-lg-5 my-3">
          <h4>{data?.name}</h4>
          <div className="row">
            <div className="col-sm-6">
              <div className="feature-card h-100 d-flex flex-column justify-content-center">
                <div className="d-flex align-items-center flex-wrap gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={beatmixPlayStationData[0]?.artistImg}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <p className="p-sm semi-bold mb-0 l-grey-text">Artist</p>
                    <p className="mb-0 semi-bold">Jet Jams</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="feature-card h-100 d-flex flex-column justify-content-center">
                <p className="p-sm semi-bold mb-0 l-grey-text">Album Info</p>
                <div className="d-flex align-items-center gap-2 justify-content-between flex-wrap">
                  <p className="mb-0 semi-bold">
                    {data?.tracks?.length} Tracks
                  </p>
                  <p className="mb-0 semi-bold">{data?.likes || "0"} Likes</p>
                </div>
              </div>
            </div>
          </div>
          <p className="d-inline-block py-2 px-3 mb-0 track-card">
            {formatSecondsToString(data?.length)}
          </p>
          <div className="d-flex align-items-center gap-3">
            <p className="semi-bold mb-0 purple-text">{data?.postedBy}</p>
            <p className="semi-bold mb-0">{formatDate(data?.createdAt)}</p>
          </div>
          <p className="semi-bold mb-0">
            Tracks:
            {data?.tracks?.map((ele, index) => (
              <span className="d-inline-block ms-1" key={index}>
                {ele?.name},
              </span>
            ))}
          </p>
          {enablePlayer && <CustomAudioPlayer />}
        </div>
      </div>
    </div>
  );
};

const BeatmixSlider = ({ data = [] }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  const { user } = useSelector((state) => state.authSlice);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container">
      <div className="d-xl-flex align-items-center justify-content-between">
        <div className="beat-mix-slider">
          <Slider
            asNavFor={nav2}
            arrows={false}
            ref={(slider) => (sliderRef1 = slider)}
          >
            {data.map((item) => (
              <BeatMixCard data={item} enablePlayer={user?.subscription} />
            ))}
          </Slider>
        </div>
        <div className="flex-shrink-0 my-3">
          <div className="w-150">
            <Slider
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              {...settings}
            >
              {data.map((item) => (
                <BeatMixImageCard key={item?._id} image={item.image} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeatmixSlider;
