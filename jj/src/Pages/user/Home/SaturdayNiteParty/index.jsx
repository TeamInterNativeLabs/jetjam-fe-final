import React, { useState } from 'react'
import { sampleVideo, saturdayPartyImg1, saturdayPartyImg2, saturdayPartyImg3, saturdayPartyImg4, saturdayPartyImg5, saturdayPartyImg6, siteVideoPoster } from '../../../../assets'
import { SiteModal } from '../../../../Components/SiteModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const SaturdayNiteParty = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const saturdayPartyImages = [
        {
            id: 1,
            img: saturdayPartyImg1,
        },
        {
            id: 2,
            img: saturdayPartyImg2,
        },
        {
            id: 3,
            img: saturdayPartyImg3,
        },
        {
            id: 4,
            img: saturdayPartyImg4,
        },
        {
            id: 5,
            img: saturdayPartyImg5,
        },
        {
            id: 6,
            img: saturdayPartyImg6,
        },
    ]
    return (
        <>
            <section className="saturday-nite-party pb-sm-5 pb-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 col-lg-11 col-12 mx-auto">
                            <h4>Best of the Saturday Nite Party</h4>
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="row">
                                        {saturdayPartyImages.map(ele => (
                                            <div className="col-sm-6 my-3" key={ele.id}>
                                                <img src={ele.img} alt="" className="img-fluid w-100" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-lg-7 my-3">
                                    <div className="site-video h-100">
                                        <img src={siteVideoPoster} alt="" className="img-fluid w-100 h-100" />
                                        <button className="play-video-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlay} /> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SiteModal show={show} className="video-modal" handleClose={handleClose}>
                <video poster={siteVideoPoster} controls>
                    <source src={sampleVideo} />
                </video>
            </SiteModal>
        </>
    )
}

export default SaturdayNiteParty