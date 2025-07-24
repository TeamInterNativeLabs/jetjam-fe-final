import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Col, Container, Dropdown, Nav, Navbar, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { exclamation, logo } from '../../assets'
// import { chatItems } from '../../../Config/Data'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Slices/Auth'
import SiteButton from '../Button/button'
import { SiteModal } from '../SiteModal'

export const UserHeader = (props) => {

    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.authSlice)
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const actionMethod = () => {
        dispatch(logout())
        setShow(false)
        navigate('/login');
    }

    return (
        <>
            <header className={`user-header pt-3 ${props?.className}`}>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col xs={12} lg={11} xl={10}>
                            <Navbar expand="xl">
                                <Navbar.Brand>
                                    <Link to={'/'}>
                                        <img src={logo} alt="" className="img-fluid site-logo" />
                                    </Link>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="navbarScroll">
                                    <FontAwesomeIcon icon={faBars} />
                                </Navbar.Toggle>
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav className="ms-auto align-items-xl-center gap-xl-5 align-items-start">
                                        <Link to={'/'} className={location.pathname === "/" && 'active-route'}>Home</Link>
                                        <Link to={'/beat-mixed-set'} className={location.pathname === "/beat-mixed-set" && 'active-route'}>All Sets</Link>
                                        <a href='#fitmix-section' >Fit-Mix Message </a>
                                        <Link to={'/snp-live'} className={location.pathname === "/snp-live" && 'active-route'}>SNP Live</Link>
                                        <Link to={'/contact-us'} className={location.pathname === "/contact-us" && 'active-route'}>Contact Us</Link>
                                        {isLoggedIn ? (
                                            <>
                                                <Link to={'/subscription-logs'} className={location.pathname === "/subscription-logs" && 'active-route'}>My subscription</Link>
                                                <Dropdown>
                                                    <Dropdown.Toggle className='transparent-btn' id="dropdown-basic">
                                                        <svg width="24" height="27" viewBox="0 0 32 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.2267 20.1833H20.7887C26.4888 20.1833 31.0154 25.3718 31.0154 31.7133V36.1331C31.0154 37.4782 30.1771 38.439 29.1712 38.439H1.84416C0.838254 38.439 0 37.4782 0 36.1331V31.7133C0 25.3718 4.52657 20.1833 10.2267 20.1833ZM20.7887 23.258H10.2267C6.03543 23.258 2.68241 27.1013 2.68241 31.7133V35.3644H28.333V31.7133C28.333 27.1013 24.98 23.258 20.7887 23.258Z" fill="white" />
                                                            <path d="M15.4274 0.966797C19.6187 0.966797 22.9717 4.8101 22.9717 9.61423C22.9717 14.2262 19.6187 18.0695 15.4274 18.0695C11.4038 18.0695 8.05078 14.2262 8.05078 9.61423C8.05078 4.8101 11.4038 0.966797 15.4274 0.966797ZM15.4274 4.04144C12.9127 4.04144 10.7332 6.53959 10.7332 9.61423C10.7332 12.6889 12.9127 14.9949 15.4274 14.9949C18.1098 14.9949 20.2893 12.6889 20.2893 9.61423C20.2893 6.53959 18.1098 4.04144 15.4274 4.04144Z" fill="white" />
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu align={"end"}>
                                                        <Link to={'/profile'}>Profile</Link>
                                                        <Link onClick={handleShow}>Log Out</Link>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </>
                                        ) : (
                                            <SiteButton onClick={() => navigate('/register')}><span className="border-btn-inner">Sign-Up</span></SiteButton>
                                        )}
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
            </header>
            <SiteModal
                show={show}
                handleClose={handleClose}
                noCloseBtn
                modalImg={exclamation}
                modalTitle="logout Confirmation"
                modalText="Are you sure you want to logout"
                modalType
                actionMethod={actionMethod}
            />
        </>

    )
}
