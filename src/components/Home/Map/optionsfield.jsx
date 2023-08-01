import React from "react";
import Toggle from "./toggle";

const Optionsfield = (props) => {
  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <Toggle />
        <div className="toggle txt-s py3 toggle--active-white">
          {option.name}
        </div>
      </label>
    );
  };
  return (
    <div className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
      {props.options.map(renderOptions)}
    </div>
  );
};

export default Optionsfield;
