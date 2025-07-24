import React from "react";

export const SiteSelect = (props) => {
  return (
    <>
      {props.label && (
        <label
          className={`site-label ${props.labelClass ? props.labelClass : ""}`}
        >
          {props.label}
          {props.requiredStar && <span className="red-text">*</span>}
        </label>
      )}
      <select
        name={props.name}
        id={props.id}
        className={`site-input ${props.className ? props.className : ""}`}
        value={props?.value}
        onChange={props?.onChange}
      >
        {props.items.map((item) => (
          <option value={item.value} key={item.id}>
            {item.option}
          </option>
        ))}
      </select>
    </>
  );
};
