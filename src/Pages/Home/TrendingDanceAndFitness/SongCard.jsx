import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { formatSecondsToHHMM } from "../../../Utils/helper";
import { imageUrl } from "../../../Config/env";
import { placeholder } from "../../../assets";
import { play, pause, setAlbums } from "../../../Redux/Slices/Player";
import { useGetSubscriptionsQuery } from "../../../Redux/Services/Subscription";

const SongCard = ({ data, size = "sm" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { image, name, length = 0, _id, genre } = data;
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  const { isPlaying, track_id } = useSelector((state) => state.playerSlice);
  const { data: subscriptionData } = useGetSubscriptionsQuery({}, { skip: !isLoggedIn });

  const img = imageUrl(image) || placeholder;
  const isCurrentlyPlaying = isPlaying && track_id === _id;

  // Check for active subscription
  const activeSubscription = subscriptionData?.data?.find(sub => sub.active && !sub.canceledAt && !sub.canceled);
  const hasActiveSubscription = !!activeSubscription;
  
  // Album is playable if it's marked as free OR user has active subscription
  const isPlayable = data?.playable === true || hasActiveSubscription;

  const handlePlayClick = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!isPlayable) {
      navigate("/subscription-plans");
      return;
    }

    if (isCurrentlyPlaying) {
      dispatch(pause());
    } else {
      // Set up the album for playback
      const albumForPlayer = [{
        name: data.name,
        writer: data.singer || "Jet Jams",
        src: imageUrl(data.file_url),
        id: 1
      }];
      
      // Set albums first, then play
      dispatch(setAlbums([data]));
      dispatch(play(_id));
    }
  };

  return (
    <Link className="d-block" to={`/album-details/${_id}`}>
      <div className="song-card">
        <img src={img} alt="" className="img-fluid song-card-img" onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }} />
        <div className="song-card-gradient"></div>
        
        {/* Play button overlay */}
        <button 
          className="song-card-play-btn" 
          onClick={handlePlayClick}
          aria-label={isCurrentlyPlaying ? "Pause" : "Play"}
        >
          <FontAwesomeIcon icon={isCurrentlyPlaying ? faPause : faPlay} />
        </button>
        
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
