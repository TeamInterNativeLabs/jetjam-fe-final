import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faSoundcloud, faTwitter } from '@fortawesome/free-brands-svg-icons'

export const UserFooter = () => {
    return (
        <footer className='py-0'>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xxl-10 col-lg-11 col-12">
                        <div className="footer-inner">
                            <div className="row">
                                <div className="col-md-6 my-3">
                                    <Link to={'/'}>
                                        <img src={logo} alt="" className="img-fluid" />
                                    </Link>
                                    <ul className="social-icons">
                                        <li>
                                            <Link><FontAwesomeIcon icon={faFacebookF}/></Link>
                                        </li>
                                        <li>
                                            <Link><FontAwesomeIcon icon={faInstagram}/></Link>
                                        </li>
                                        <li>
                                            <Link><FontAwesomeIcon icon={faTwitter}/></Link>
                                        </li>
                                        <li>
                                            <Link><FontAwesomeIcon icon={faSoundcloud}/></Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-3 my-3">
                                    <p className="p-lg semi-bold mb-0">Genres</p>
                                    <ul className='mt-3'>
                                        <li>
                                            <Link>Hit Country</Link>
                                        </li>
                                        <li className='mt-2'>
                                            <Link>Hit 80's & 90's</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-3 my-3">
                                    <p className="p-lg semi-bold mb-0">Quick Links</p>
                                    <ul className='mt-3'>
                                        <li>
                                            <Link>Music License Disclosure</Link>
                                        </li>
                                        <li className='mt-2'>
                                            <Link>Terms & Conditions</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                    <p className='mb-0 l-grey-text'>Copyright 2024, jetJams.net. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
