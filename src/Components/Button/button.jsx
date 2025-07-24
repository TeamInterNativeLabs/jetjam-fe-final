import React from "react";
import "./button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const SiteButton = (props) => {
  return (
    <>
      <button
        type={props.type ? props.type : "button"}
        onClick={props.onClick}
        {...props}
        className={`site-btn ${props.className ? props.className : ""}`}
      >
        {props.children} <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </>
  );
};
export default SiteButton;
