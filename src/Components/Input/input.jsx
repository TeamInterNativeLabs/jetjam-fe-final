import React from "react";
import "./input.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SiteInput = (props) => {
  return (
    <div className="d-flex flex-column w-100">
      {props.label ? (
        <label
          className={`site-label mb-1 ${
            props.labelClass ? props.labelClass : ""
          }`}
        >
          {props.label}
          {props.requiredStar ? <span className="red-text"> *</span> : ""}
        </label>
      ) : (
        ""
      )}
      {props.pass ? (
        <div className="position-relative w-100">
          <input
            type={props.type}
            readOnly={props?.readOnly}
            onChange={props?.onChange}
            placeholder={props.placeholder}
            value={props?.value}
            className={`site-input pe-5 ${
              props.className ? props.className : ""
            }`}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
          />
          <FontAwesomeIcon
            className="right-icon"
            onClick={props.iconFunction}
            icon={props.eyeIcon}
          />
        </div>
      ) : props.oneIcon ? (
        <div className="position-relative">
          <FontAwesomeIcon
            className="left-icon l-grey-text"
            icon={props.leftIcon}
          />
          <input
            type={props.type}
            readOnly={props?.readOnly}
            onChange={props?.onChange}
            placeholder={props.placeholder}
            value={props?.value}
            className={`site-input ps-5 ${
              props.className ? props.className : ""
            }`}
          />
        </div>
      ) : props.doubleIcon ? (
        <div className="position-relative">
          <FontAwesomeIcon
            className="left-icon l-grey-text"
            icon={props.leftIcon}
          />
          <input
            type={props.type}
            readOnly={props?.readOnly}
            onChange={props?.onChange}
            placeholder={props.placeholder}
            value={props?.value}
            className={`site-input ps-5 ${
              props.className ? props.className : ""
            }`}
          />
          <FontAwesomeIcon
            className="right-icon"
            onClick={props.iconFunction}
            icon={props.eyeIcon}
          />
        </div>
      ) : (
        <input
          type={props.type}
          readOnly={props?.readOnly}
          onChange={props?.onChange}
          placeholder={props.placeholder}
          value={props?.value}
          className={`site-input ${props.className ? props.className : ""}`}
        />
      )}
      {props?.error ? (
        <label className={`site-error mt-1`}>{props?.error}</label>
      ) : (
        ""
      )}
    </div>
  );
};
export default SiteInput;
