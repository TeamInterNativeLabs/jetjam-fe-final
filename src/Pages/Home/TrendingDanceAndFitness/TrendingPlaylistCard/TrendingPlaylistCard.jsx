import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TrendingPlaylistCard = ({ data, handleChange }) => {

    const { _id, image, name, writer } = data

    const img = `${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${image}`

    const navigate = useNavigate()

    const onClickCard = useCallback(() => {
        if (_id) {
            navigate(`/album-details/${_id}`)
        }
    }, [])

    return (
        <div className='cursor-pointor' onClick={onClickCard}>
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
                {/* <div className="flex-shrink-0">
                    <div className="d-flex align-items-center gap-2">
                        <button className="transparent-btn white-text" onClick={handleChange}><FontAwesomeIcon icon={faPlay} /></button>
                        <button className="transparent-btn white-text"><FontAwesomeIcon icon={faHeart} /></button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default TrendingPlaylistCard;
