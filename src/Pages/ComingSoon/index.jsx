import React, { useEffect } from 'react'
import { UserLayout } from '../../Components/Layout'
import { bannerBottom, bannerPoster, bannerVideo, logo } from '../../assets'
import { Link } from 'react-router-dom'
// import './index.css'

export const ComingSoon = () => {
    return (
        <>
            <section className="banner align-items-center">
                <img src={logo} alt="" className="img-fluid site-logo mb-5" style={{ zIndex: 99 }} />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <div className="row">
                                <div className="col-12 my-3">
                                    <div className="banner-inner d-flex justify-content-center align-items-center">
                                        <h1 className='text-center' style={{ fontSize: "250px" }}>Coming Soon</h1>
                                        {/* {
                                        !isLoggedIn &&
                                        <SiteButton onClick={() => navigate('/login')}>Log in</SiteButton>
                                    } */}
                                        <div className="counters d-flex align-items-center gap-sm-5 gap-4 mt-4">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <video muted autoPlay playsInline loop poster={bannerPoster} className='banner-video'>
                    <source src={bannerVideo} />
                </video>
                <img src={bannerBottom} alt="" className="img-fluid banner-bottom" />
            </section>
        </>
    )
}
