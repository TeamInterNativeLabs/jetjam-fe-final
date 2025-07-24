import React, { useEffect, useState } from 'react'
import { Col, Container, Dropdown, Nav, Navbar, Row } from 'react-bootstrap'
import { logo } from '../../assets'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMessage, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
// import { chatItems } from '../../../Config/Data'
import { SiteModal } from '../SiteModal'
import SiteButton from '../Button/button'

export const UserHeader = (props) => {
    const navigate = useNavigate();

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
                                    <Nav className="ms-auto align-items-xl-center gap-xxl-5 gap-xl-3 align-items-start">
                                        <Link>Fit-Mix Message </Link>
                                        <Link>SNP Live</Link>
                                        <Link>Contact Us</Link>
                                        <SiteButton><span className="border-btn-inner">Sign-Up</span></SiteButton>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
            </header>
        </>

    )
}
