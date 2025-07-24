import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Lottie from "lottie-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SiteButton from '../Button/button';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const SiteModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} size={`${props.largeModal?"lg":"md"}`} className={`site-modal ${props.userModal?"user-modal":''}${props.className?' ' +props.className:''}`}>
        <Modal.Body className={`${props.modalBodyClass?props.modalBodyClass:''}`}>
            {props.noCloseBtn?'':<button className="close-btn" onClick={props.handleClose}><FontAwesomeIcon icon={faTimes} /></button>}
            <div className={`py-4${props.largeModal?" modal-form":""}`}>
                <div className='text-center'>
                    {props.lottieIcon?<Lottie className='lottie-icon' animationData={props.lottieIcon} loop={true} />:props.modalImg?<img src={props.modalImg} className='img-fluid' />:''}
                    {props.modalTitle?<h5 className="mt-4 black-text mb-0">{props.modalTitle}</h5>:''}
                    {props.modalText?<p className={`medium p-md mt-2 mb-0 grey-text`}>{props.modalText}</p>:''}
                </div>
                {props.children}
                {props.modalType?(
                    <div className="d-flex gap-3 flex-wrap align-items-center justify-content-center">
                        <SiteButton onClick={props.handleClose} className="mt-3">No</SiteButton>
                        <SiteButton onClick={props.actionMethod} className="mt-3 orange-btn">Yes</SiteButton>
                    </div>
                ):props.normalModal?(<div className="text-center"><SiteButton onClick={props.handleClose} className="mt-3">Okay</SiteButton></div>):''}  
            </div>
        </Modal.Body>
    </Modal>
  )
}
