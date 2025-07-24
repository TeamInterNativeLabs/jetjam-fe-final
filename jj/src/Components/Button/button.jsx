import React from 'react'
import "./button.css"

const SiteButton = (props) => {
  return (
    <>
        <button type={props.type?props.type:'button'} onClick={props.onClick} {...props} className={`site-btn ${props.className?props.className:''}`}>{props.children}</button>
    </>
  )
}
export default SiteButton;
