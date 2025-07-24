import React, { useState } from 'react'
import CustomAudioPlayer from '../../../Components/AudioPlayer/AudioPlayer'
import { useGetAlbumsQuery } from '../../../Redux/Services/Album'
import './index.css'
import SongSets from './SongSets'
import TrendingPlaylistCard from './TrendingPlaylistCard/TrendingPlaylistCard'
import EmptyComponent from '../../../Components/EmptyComponent'

export const TrendingDanceAndFitness = () => {

    const { data: trendingAlbum } = useGetAlbumsQuery({ trending: true, page: 1 }, { refetchOnReconnect: true, refetchOnMountOrArgChange: true, refetchOnFocus: true })
    const { data: suggestedAlbum } = useGetAlbumsQuery({ suggested: true, page: 1 }, { refetchOnReconnect: true, refetchOnMountOrArgChange: true, refetchOnFocus: true })
    const { data: newAlbum } = useGetAlbumsQuery({ newAlbum: true, page: 1 }, { refetchOnReconnect: true, refetchOnMountOrArgChange: true, refetchOnFocus: true })

    const [showPlayer, setShowPlayer] = useState(false);
    const handleChange = () => {
        setShowPlayer(!showPlayer);
    }

    return (
        <section className="trending-dance-and-fitness pb-sm-5 pb-4">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-11 col-12">
                        <div className="row">
                            <div className="col-xl-4 my-3">
                                <div className="trending-card">
                                    <h4>Trending Dance & Fitness</h4>
                                    <div className="position-relative">
                                        <div className="banner-player">
                                            <div className="banner-playlist">
                                                {
                                                    trendingAlbum?.data?.length > 0 ?
                                                        trendingAlbum?.data?.map((item) => (
                                                            <TrendingPlaylistCard handleChange={handleChange} data={item} key={item._id} />
                                                        )) : <EmptyComponent />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 my-3">
                                <SongSets title={'New Sets'} songSets={newAlbum?.data} />
                                <div className="mt-5">
                                    <SongSets title={'Suggested'} songSets={suggestedAlbum?.data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showPlayer && (
                <CustomAudioPlayer />
            )}
        </section>
    )
}
