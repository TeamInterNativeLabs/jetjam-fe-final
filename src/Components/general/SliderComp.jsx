import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SongCard from "../../Pages/Home/TrendingDanceAndFitness/SongCard";

export default function SliderComp({ songSets = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="flex flex-row">
      <button
        ref={prevRef}
        className=" z-10 bg-gray-300 text-black p-2 bg-white rounded-full"
      >
        &lt;
      </button>
      {/* Custom Prev Button */}

      {/* Swiper */}

      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="flex-1"
      >
        {songSets?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="">
              <p>{`${item}`}</p>
              {/* <SongCard data={item} /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Next Button */}
      <button
        ref={nextRef}
        className="  z-10 bg-gray-300 bg-white text-black p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
}
