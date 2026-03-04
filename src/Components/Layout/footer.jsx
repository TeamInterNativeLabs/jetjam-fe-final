import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faSoundcloud, faTwitter } from '@fortawesome/free-brands-svg-icons'
export const UserFooter = () => {

    const current_year = new Date().getFullYear()

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
                                            <Link><FontAwesomeIcon icon={faFacebookF} /></Link>
                                        </li>
                                        <li>
                                            <Link><FontAwesomeIcon icon={faInstagram} /></Link>
                                        </li>
                                        <li>
                                            <Link><FontAwesomeIcon icon={faTwitter} /></Link>
                                        </li>
                                        <li>
                                            <Link><FontAwesomeIcon icon={faSoundcloud} /></Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6 my-3">
                                    <p className="p-lg semi-bold mb-0">Quick Links</p>
                                    <ul className='mt-3'>
                                        <li><Link to='/'>Home</Link></li>
                                        <li className='mt-2'><Link to='/privacy-policy'>Privacy Policy</Link></li>
                                        <li className='mt-2'><Link to='/terms-and-conditions'>Terms & Conditions</Link></li>
                                        <li className='mt-2'><Link to='/snp-live'>SNP Live</Link></li>
                                        <li className='mt-2'><Link to='/login'>Login</Link></li>
                                        <li className='mt-2'><Link to='/contact-us'>Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                    <p className='mb-0 l-grey-text'>Copyright {current_year}, <span className="m-yellow-text"> jetjams.net</span>. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
