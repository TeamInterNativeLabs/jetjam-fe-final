import React from "react";
import SongSets from "../TrendingDanceAndFitness/SongSets";
import "./index.css";
import BeatmixSlider from "./BeatmixSlider";

const BeatmixPlayStation = ({ data }) => {
  return (
    <section className="album-release pb-sm-5 pb-4">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11 col-12">
            <h4 className="text-center mb-3">Demo Play Station</h4>
            <div className="demo-play-station-row">
              <SongSets title="Free Demos" songSets={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeatmixPlayStation;
