import React from "react";
import Slider from "react-slick";
import SongCard from "../SongCard";
import { Link } from "react-router-dom";
import EmptyComponent from "../../../../Components/EmptyComponent";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

function SongSets({ title, songSets }) {
  return (
    <>
      <div className="d-flex mb-3 align-items-center justify-content-between gap-3">
        <h4 className="mb-0">{title}</h4>
        <Link to={"/beat-mixed-set"} className="l-grey-text">
          See All
        </Link>
      </div>
      <div className="slider-container">
        {songSets?.length > 0 ? (
          <Slider {...settings}>
            {songSets?.map((item) => (
              <div key={item._id} className="pe-3">
                <SongCard data={item} />
              </div>
            ))}
          </Slider>
        ) : (
          <EmptyComponent />
        )}
      </div>
    </>
  );
}

export default SongSets;
