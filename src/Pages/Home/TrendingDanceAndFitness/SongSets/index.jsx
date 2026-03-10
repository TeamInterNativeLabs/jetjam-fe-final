import React from "react";
import Slider from "react-slick";
import SongCard from "../SongCard";
import { Link } from "react-router-dom";
import EmptyComponent from "../../../../Components/EmptyComponent";
import SliderComp from "../../../../Components/general/SliderComp";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1599, // Extra large screens
      settings: {
        slidesToShow: 5, // Show more cards on very large screens
        slidesToScroll: 1,
        dots: true,
        infinite: true,
      },
    },
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 4, // Standard desktop
        slidesToScroll: 1,
        dots: true,
        infinite: true,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3, // Laptop
        slidesToScroll: 1,
        dots: true,
        infinite: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2, // Tablet
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1, // Mobile
        slidesToScroll: 1,
      },
    },
  ],
};

function SongSets({ title, songSets }) {
  const sliderSettingsAdjusted = {
    ...sliderSettings,
    infinite: songSets?.length > 1,
    slidesToShow: Math.min(sliderSettings.slidesToShow, songSets?.length || 1),
  };

  return (
    <>
      <div className="d-flex mb-3 align-items-center justify-content-between gap-3 ">
        <h4 className="mb-0">{title}</h4>
        <Link to="/beat-mixed-set" className="l-grey-text">
          See All
        </Link>
      </div>

      <div className="px-4">
        {songSets?.length > 0 ? (
          <Slider {...sliderSettingsAdjusted}>
            {songSets.map((item, index) => (
              <div key={item._id || item.id || index} className="pe-3">
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
