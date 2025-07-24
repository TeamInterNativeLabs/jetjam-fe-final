import React, { useState } from 'react'
import SiteButton from '../../../../Components/Button/button'
import { bannerBottom } from '../../../../assets'
import TrendingPlaylistCard from './TrendingPlaylistCard/TrendingPlaylistCard'
import { playList } from '../../../../Components/AudioPlayer/playList'
import './index.css'
import CustomAudioPlayer from '../../../../Components/AudioPlayer/AudioPlayer'

export const TrendingDanceAndFitness = () => {
    const [showPlayer, setShowPlayer] = useState(false);
    const handleChange = ()=>{
        setShowPlayer(!showPlayer);
    }
    return (
        <section className="trending-dance-and-fitness pb-sm-5 pb-4">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-11 col-12">
                        <div className="d-flex flex-lg-nowrap gap-3 flex-wrap">
                            <div className="flex-shrink-0">
                                <div className="trending-card">
                                    <h4>Trending Dance & Fitness</h4>
                                    <div className="position-relative">
                                        <div className="banner-player">
                                            <div className="banner-playlist">
                                                {playList.map((item, index)=>(
                                                    <TrendingPlaylistCard handleChange={handleChange} {...item} key={index} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 my-3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={bannerBottom} alt="" className="img-fluid banner-bottom" />
            {showPlayer && (
                <CustomAudioPlayer />
            )}
        </section>
    )
}
