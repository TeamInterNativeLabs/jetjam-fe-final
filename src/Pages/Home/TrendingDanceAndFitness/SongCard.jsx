import React from "react";
import { Link } from "react-router-dom";
import { formatSecondsToHHMM } from "../../../Utils/helper";
import { imageUrl } from "../../../Config/env";
import { placeholder } from "../../../assets";

const SongCard = ({ data, size = "sm" }) => {
  const { image, name, length = 0, _id, genre } = data;

  const img = imageUrl(image) || placeholder;

  return (
    <Link className="d-block" to={`/album-details/${_id}`}>
      <div className="song-card">
        <img src={img} alt="" className="img-fluid song-card-img" onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }} />
        <div className="song-card-gradient"></div>
        <div className="song-card-inner">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="flex-grow-1">
              <p
                className={`semi-bold p-${size} mb-0 xl:text-xl lg:text-base text-sm`}
              >
                {name}
              </p>
            </div>
            <div className="flex-shrink-0 text-wrap break-words">
              <p
                className={`mb-0 p-${size} xl:text-xl lg:text-base text-sm break-words`}
              >
                {formatSecondsToHHMM(length)}
              </p>
            </div>
          </div>
          <p className="mb-0 p-sm xl:text-xl lg:text-base text-sm">
            {genre?.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SongCard;
