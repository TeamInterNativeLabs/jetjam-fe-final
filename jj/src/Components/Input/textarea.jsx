import React from 'react'
import "./input.css"

const SiteTextarea = (props) => {
  return (
    <>
      {props.label?<label className={`site-label ms-4 ${props.labelClass?props.labelClass:''}`}>{props.label}{props.requiredStar?<span className='red-text'>*</span>:''}</label>:''}
      <textarea rows={props.rows} placeholder={props.placeholder} className={`site-input ${props.className ? props.className : ''}`}>{props?.value}</textarea>
    </>
  )
}
export default SiteTextarea;