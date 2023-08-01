import React from "react";
import "./legendStyle.css";

const Legend = ({ legendLayerTitle, itemArray, legendLayerFormat, keyID }) => {
  return (
    <div className={legendLayerFormat} key={keyID}>
      <div id="state-legend" className={keyID}>
        <h5>{legendLayerTitle}</h5>
        <h6 style={{ fontStyle: "italic" }}>{legendLayerFormat}</h6>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          {itemArray.map((itemArray) => (
            <div key={itemArray[1]}>
              <span style={{ backgroundColor: itemArray[1] }}></span>
              {itemArray[0]}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legend;
