import React from "react";
import "./index.css";
import { shadowImg } from "../../../assets";

const ShadowDivider = ({ footerShadowDivider }) => {
  return (
    <div className="shadow-divider">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 px-0">
            <img src={shadowImg} alt="" className="img-fluid " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadowDivider;
