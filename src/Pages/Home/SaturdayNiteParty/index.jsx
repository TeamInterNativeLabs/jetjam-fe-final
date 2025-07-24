import React, { useEffect, useState } from 'react'
import { sampleVideo, saturdayPartyImg1, saturdayPartyImg2, saturdayPartyImg3, saturdayPartyImg4, saturdayPartyImg5, saturdayPartyImg6, siteVideoPoster } from '../../../assets'
import { SiteModal } from '../../../Components/SiteModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useGetSnpVideosQuery } from '../../../Redux/Services/SnpVideo';
import EmptyComponent from '../../../Components/EmptyComponent';

const SaturdayNiteParty = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { data, isSuccess } = useGetSnpVideosQuery({ active: true }, { refetchOnFocus: true })
    const [active, setActive] = useState()

    useEffect(() => {
        if (isSuccess && data?.data?.length > 0) {
            setActive(data?.data[0])
        }
    }, [data, isSuccess])

    return (
        <>
            <section className="saturday-nite-party pb-sm-5 pb-4 ">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-10 col-lg-11 col-12 mx-auto">
                            <h4 className='text-center mb-3'>Best of the Saturday Nite Party</h4>
                            {
                                data?.data?.length > 0 ?
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="row">
                                                {data?.data.map(ele => (
                                                    <div className="col-sm-6 my-3 cursor-pointor" key={ele._id} onClick={() => setActive(ele)}>
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${ele?.thumbnail}`} alt="" className="img-fluid w-100" style={{ height: "180px", borderRadius: "0.5rem", border: `0.2rem solid ${active?._id === ele?._id ? "#F6D027" : "transparent"}` }} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-lg-7 my-3">
                                            {
                                                active &&
                                                <div className="site-video h-100">
                                                    <img src={`${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${active?.thumbnail}`} alt="" className="img-fluid w-100 h-100" style={{ borderRadius: "1rem" }} />
                                                    <button className="play-video-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlay} /></button>
                                                </div>
                                            }
                                        </div>
                                    </div> : <div className='mt-4'><EmptyComponent message="No SNP Videos" /></div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <SiteModal show={show} className="video-modal" handleClose={handleClose}>
                <video poster={`${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${active?.thumbnail}`} controls>
                    <source src={`${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${active?.url}`} />
                </video>
            </SiteModal>
        </>
    )
}

export default SaturdayNiteParty