import React from "react";

const AlbumSongCard = ({ data, index }) => {
  const { name, duration = "15:20", singer = "alishan" } = data;

  return (
    <div className="album-song-card">
      <div className="d-flex align-items-center gap-3">
        <div className="flex-grow-1">
          <div className="d-flex gap-2">
            <div className="flex-shrink-0">
              <h5 className="inter semi-bold">{index + 1}- </h5>
            </div>
            <div className="flex-grow-1">
              <h5 className="inter semi-bold">{name}</h5>
              {/* <p className="mb-0">{singer}</p> */}
            </div>
          </div>
        </div>
        {/* <div className="flex-shrink-0">
                    <p className="mb-0">{duration}</p>
                </div> */}
      </div>
    </div>
  );
};

export default AlbumSongCard;
