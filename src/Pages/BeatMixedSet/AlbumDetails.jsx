import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CustomAudioPlayer from "../../Components/AudioPlayer/AudioPlayer";
import { UserLayout } from "../../Components/Layout";
import Loader from "../../Components/Loader";
import { useGetAlbumsQuery } from "../../Redux/Services/Album";
import { formatSecondsToHHMM } from "../../Utils/helper";
import AlbumSongCard from "./AlbumSongCard";
import "./index.css";
import { play } from "../../Redux/Slices/Player";

const AlbumDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoggedIn } = useSelector((state) => state.authSlice);
    const { data, isLoading } = useGetAlbumsQuery({ _id: id });
    const currentDetails = data?.data;
    const img = `${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${currentDetails?.image
        }`;
    const { isPlaying, track_id } = useSelector((state) => state.playerSlice);

    const handleChange = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        } else if (!data?.data?.playable) {
            navigate("/subscription-plans");
            return;
        }

        dispatch(play(id));
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
