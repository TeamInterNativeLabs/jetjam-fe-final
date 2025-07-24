import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import SiteButton from '../../../Components/Button/button'
import { bannerBottom, bannerPoster, bannerVideo } from '../../../assets'
import Counter from './Counter'
import './index.css'

export const Banner = ({ data = [] }) => {

    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.authSlice)

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
                                        <p className="xl-grey-text">Welcome to JetJams.net, your ultimate destination for world-class beatmixing tailored specifically for aerobics and country line dance instructors. At JetJams, we understand the pulse of your classes, and we're here to elevate your teaching experience like never before</p>
                                    </div>
                                    {
                                        isLoggedIn ?
                                            <SiteButton onClick={() => navigate('/beat-mixed-set')}>View All Sets</SiteButton>
                                            :
                                            <SiteButton onClick={() => navigate('/login')}>Log in</SiteButton>
                                    }
                                    <div className="counters d-flex align-items-center gap-sm-5 gap-4 mt-4">
                                        {
                                            data?.map(item => (
                                                <Counter count={item?.albums} label={`Total ${item?.name} Sets`} />
                                            ))
                                        }
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
    )
}
