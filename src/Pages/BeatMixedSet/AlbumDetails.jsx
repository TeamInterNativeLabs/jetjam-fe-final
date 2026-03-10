import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CustomAudioPlayer from "../../Components/AudioPlayer/AudioPlayer";
import { UserLayout } from "../../Components/Layout";
import Loader from "../../Components/Loader";
import { useGetAlbumsQuery } from "../../Redux/Services/Album";
import { useGetSubscriptionsQuery } from "../../Redux/Services/Subscription";
import { formatSecondsToHHMM } from "../../Utils/helper";
import AlbumSongCard from "./AlbumSongCard";
import "./index.css";
import { play, setAlbums } from "../../Redux/Slices/Player";
import { imageUrl } from "../../Config/env";
import { placeholder } from "../../assets";

const AlbumDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoggedIn, user } = useSelector((state) => state.authSlice);
    const { data, isLoading } = useGetAlbumsQuery({ _id: id });
    const { data: subscriptionData } = useGetSubscriptionsQuery({}, { skip: !isLoggedIn });
    
    const currentDetails = data?.data;
    const img = imageUrl(currentDetails?.image) || placeholder;
    const { isPlaying, track_id } = useSelector((state) => state.playerSlice);

    // Check for active subscription from subscription API
    const activeSubscription = subscriptionData?.data?.find(sub => sub.active && !sub.canceledAt && !sub.canceled);
    const hasActiveSubscription = !!activeSubscription;
    
    // Album is playable if it's marked as free OR user has active subscription
    const isPlayable = data?.data?.playable === true || hasActiveSubscription;

    const handleChange = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        if (!isPlayable) {
            navigate("/subscription-plans");
            return;
        }
        
        // Set up the album for playback before dispatching play
        if (currentDetails) {
            const albumForPlayer = [{
                name: currentDetails.name,
                writer: currentDetails.singer || "Jet Jams",
                src: imageUrl(currentDetails.file_url),
                id: 1
            }];
            
            // Set albums first, then play
            dispatch(setAlbums([currentDetails]));
            dispatch(play(id));
        }
    };

    return (
        <UserLayout>
            <Loader loading={isLoading} />
            <section className="beat-mixed-set">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <div className="d-flex align-items-end jusitfy-content-between gap-3">
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-end flex-wrap gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={img}
                                                alt=""
                                                className="img-fluid album-cover-img"
                                                onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }}
                                            />
                                        </div>
                                        <div className="flex-grow-1 pb-4">
                                            <p className="mb-0 l-grey-text p-md">Album</p>
                                            <h3 className="inter">{currentDetails?.name}</h3>
                                            <div className="d-flex">
                                                <p className="mb-0 l-grey-text p-md">
                                                    {currentDetails?.singer || "Jet Jams"}
                                                </p>
                                                <p className="mb-0 l-grey-text p-md mx-2">|</p>
                                                <p className="mb-0 l-grey-text p-md">
                                                    {" "}
                                                    {formatSecondsToHHMM(data?.data?.length)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 pb-4">
                                    <button className="play-album-song" onClick={handleChange}>
                                        <FontAwesomeIcon
                                            icon={isPlaying && track_id === id ? faPause : faPlay}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="album-songs mt-4">
                                {currentDetails?.tracks?.map((item, index) => (
                                    <AlbumSongCard data={item} index={index} key={item._id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
};

export default AlbumDetails;
