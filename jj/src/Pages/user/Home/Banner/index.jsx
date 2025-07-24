import React from 'react'
import './index.css'
import SiteButton from '../../../../Components/Button/button'
import { bannerBottom } from '../../../../assets'
import BannerPlaylistCard from './BannerPlaylistCard/BannerPlaylistCard'

export const Banner = () => {
    return (
        <section className="banner">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-11 col-12">
                        <div className="row">
                            <div className="col-12 col-xxl-10 col-xl-11 my-3">
                                <div className="banner-inner">
                                    <h1>Jetjams your gateway <br /> to beatmixed <span className="gradient-text"> dance <br /> fitness</span></h1>
                                    <div className="banner-text">
                                        <p className="l-grey-text">Welcome to JetJams.net, your ultimate destination for world-class beatmixing tailored specifically for aerobics and country line dance instructors. At JetJams, we understand the pulse of your classes, and we're here to elevate your teaching experience like never before</p>
                                    </div>
                                    <SiteButton>Login</SiteButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={bannerBottom} alt="" className="img-fluid banner-bottom" />
        </section>
    )
}
