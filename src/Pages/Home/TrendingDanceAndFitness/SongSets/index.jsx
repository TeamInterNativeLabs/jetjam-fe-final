import Slider from "react-slick";
import SongCard from "../SongCard";
import { Link } from "react-router-dom";
import EmptyComponent from "../../../../Components/EmptyComponent";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Reduced from 4 to make cards larger
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1599, // Extra large screens
      settings: {
        slidesToShow: 4, // Reduced from 5 to make cards larger
        slidesToScroll: 1,
        dots: true,
        infinite: true,
      },
    },
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 3, // Standard desktop
        slidesToScroll: 1,
        dots: true,
        infinite: true,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3, // Laptop - keep 3
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
  // Adjust slider settings based on number of items
  const sliderSettingsAdjusted = {
    ...sliderSettings,
    infinite: songSets?.length > 1, // Only infinite if more than 1 item
    slidesToShow: Math.min(sliderSettings.slidesToShow, songSets?.length || 1),
    arrows: songSets?.length > 1, // Only show arrows if more than 1 item
    dots: songSets?.length > 1, // Only show dots if more than 1 item
  };

  // Update responsive settings to respect the number of items
  if (sliderSettingsAdjusted.responsive) {
    sliderSettingsAdjusted.responsive = sliderSettingsAdjusted.responsive.map(breakpoint => ({
      ...breakpoint,
      settings: {
        ...breakpoint.settings,
        slidesToShow: Math.min(breakpoint.settings.slidesToShow, songSets?.length || 1),
        infinite: songSets?.length > 1,
        arrows: songSets?.length > 1,
        dots: songSets?.length > 1,
      }
    }));
  }

  return (
    <>
      {title && (
        <div className="d-flex mb-3 align-items-center justify-content-between gap-3 ">
          <h4 className="mb-0">{title}</h4>
          <Link to="/beat-mixed-set" className="l-grey-text">
            See All
          </Link>
        </div>
      )}

      <div className="px-4">
        {songSets?.length > 0 ? (
          songSets.length === 1 ? (
            // If only one item, show it in a horizontal layout container
            <div className="d-flex justify-content-start align-items-center" style={{ minHeight: '300px' }}>
              <div style={{ maxWidth: '350px', minWidth: '250px' }}>
                <SongCard data={songSets[0]} />
              </div>
            </div>
          ) : (
            // If multiple items, use slider
            <Slider {...sliderSettingsAdjusted}>
              {songSets.map((item, index) => (
                <div key={item._id || item.id || index} className="pe-3">
                  <SongCard data={item} />
                </div>
              ))}
            </Slider>
          )
        ) : (
          <EmptyComponent />
        )}
      </div>
    </>
  );
}

export default SongSets;
