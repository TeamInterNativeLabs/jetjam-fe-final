import React from "react";
import SongSets from "../TrendingDanceAndFitness/SongSets";
import "./index.css";

const BeatmixPlayStation = ({ data }) => {
  return (
    <section className="album-release pb-sm-5 pb-4">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11 col-12">
            <h4 className="text-center">Demo Play Station</h4>
            <SongSets title={""} songSets={data} />
            {/* <BeatmixSlider data={user?.subscription ? data?.filter(item => item?.playable) : data} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeatmixPlayStation;
