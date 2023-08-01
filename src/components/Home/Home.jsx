import React, { useState } from "react";
import { PlotMegaregion } from "./Plot/plot";
import { MapboxGLMap } from "./Map/MapboxGLMap";

export const Home = () => {
  const [selectedId, setSelectedId] = useState("");

  const initialFormState = { mySelectKey: "East" };
  const [myForm, setMyForm] = useState(initialFormState);

  const initialLabelState = { mySelectLabel: "Eastern" };
  const [myLabel, setMyLabel] = useState(initialLabelState);

  const initialFormStateInvHarv = { mySelectKeyInvHarv: "Inventory" };
  const [myFormInvHarv, setMyFormInvHarv] = useState(initialFormStateInvHarv);

  const initialLabelStateInvHarv = { mySelectLabelInvHarv: "Inventory" };
  const [myLabelInvHarv, setMyLabelInvHarv] = useState(
    initialLabelStateInvHarv
  );

  const updateForm = (value, label) => {
    setMyForm({ ...myForm, mySelectKey: value });
    setMyLabel({ ...myLabel, mySelectLabel: label });
  };

  const updateFormInvHarv = (valueInvHarv, labelInvHarv) => {
    setMyFormInvHarv({ ...myFormInvHarv, mySelectKeyInvHarv: valueInvHarv });
    setMyLabelInvHarv({
      ...myLabelInvHarv,
      mySelectLabelInvHarv: labelInvHarv,
    });
  };

  var callback = (passedSite) => {
    setSiteData(passedSite);
  };

  const [siteData, setSiteData] = useState([]);

  return (
    <div className="home">
      <div className="row">
        <MapboxGLMap
          highlightLineColor={{ rgba: [255, 102, 0, 1] }}
          getSelectedID={() => selectedId}
          passSiteData={callback}
        />
        <div className="plotlyMegaregion">
          <PlotMegaregion
            heightP={350}
            widthP={550}
            onClickRegion={({ value, label }) => {
              updateForm(value, label);
              setSelectedId(label);
            }}
            onClickInvHarv={({ valueInvHarv, labelInvHarv }) => {
              updateFormInvHarv(valueInvHarv, labelInvHarv);
            }}
            myLabel={myLabel}
            myForm={myForm}
            passedData={siteData}
            myLabelInvHarv={myLabelInvHarv}
            myFormInvHarv={myFormInvHarv}
          />
        </div>
      </div>
    </div>
  );
};
