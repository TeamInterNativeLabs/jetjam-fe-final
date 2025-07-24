import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const BannerPlaylistCard = ({img, name, writer, handleChange}) => {
  return (
    <div>
        <div className="playlist-card my-3 d-flex align-items-center justify-content-between gap-3">
            <div className="flex-grow-1 d-flex align-items-center gap-3">
                <div className="flex-shrink-0">
                    <img src={img} alt="" className="img-fluid banner-playlist-img" />
                </div>
                <div className="flex-grow-1">
                    <p className="akira mb-0">{name}</p>
                    <p className="p-sm l-grey-text mb-0">{writer}</p>
                </div>
            </div>
            <div className="flex-shrink-0">
                <div className="d-flex align-items-center gap-2">
                    <button className="transparent-btn white-text" onClick={handleChange}><FontAwesomeIcon icon={faPlay} /></button>
                    <button className="transparent-btn white-text"><FontAwesomeIcon icon={faHeart} /></button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BannerPlaylistCard;
