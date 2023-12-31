import React from "react";
import "./accordionStyles.css";

const Accordion = ({ title, children, accordionOpen }) => {
  const [isOpen, setOpen] = React.useState(accordionOpen);
  return (
    <div className="accordion-wrapper">
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
