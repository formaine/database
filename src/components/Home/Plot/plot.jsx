import React, { useRef, useState, useEffect, useMemo } from "react";
import Plotly from "plotly.js";
import Select from "react-select";
import Collapsible from "react-collapsible";
import { AiOutlineLineChart } from "react-icons/ai";

import createPlotlyComponent from "react-plotly.js/factory";
import { useQuery } from "react-query";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Container } from "reactstrap";
import { SelectColumnFilter } from "./filters";

import TableContainer from "./TableContainer";
import "./tableStyles.css";

import "./plotStyles.css";

const Plot = createPlotlyComponent(Plotly);

const customStylesInvHarv = {
  control: (provided, state) => ({
    ...provided,
    background: "#FAFAFA",
    borderColor: "#9e9e9e",
    fontWeight: "bold",
    minHeight: "30px",
    marginBottom: "0px",
    height: "30px",
    margin: "0 auto",
    width: "120px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

const customStylesRegion = {
  control: (provided, state) => ({
    ...provided,
    background: "#FAFAFA",
    borderColor: "#9e9e9e",
    fontWeight: "bold",
    minHeight: "30px",
    marginBottom: "0px",
    height: "30px",
    margin: "0 auto",
    width: "117px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

export const PlotMegaregion = ({
  heightP,
  widthP,
  passedData,
  onClickInvHarv,
  onClickRegion,
  myForm,
  myLabel,
  myFormInvHarv,
  myLabelInvHarv,
}) => {
  const dataChartNode = useRef();

  const optionsRegion = [
    { value: "East", label: "Eastern" },
    { value: "North", label: "Northern" },
    { value: "West", label: "Western" },
    { value: "South", label: "Southern" },
  ];

  const optionsInvHarv = [
    { valueInvHarv: "Harvest", labelInvHarv: "Harvest" },
    { valueInvHarv: "Inventory", labelInvHarv: "Inventory" },
  ];

  const getRegionInventory = () =>
    fetch(
      `https://raw.githubusercontent.com/eastcoasting/test/master/${myForm.mySelectKey}${myFormInvHarv.mySelectKeyInvHarv}.json`
    );

  function getFavorites() {
    return Promise.all([getRegionInventory()])
      .then((responses) => {
        return Promise.all(
          responses.map((response) => {
            return response.json();
          })
        );
      })
      .then((data) => data);
  }

  const { data } = useQuery(
    `${myForm.mySelectKey}${myFormInvHarv.mySelectKeyInvHarv}`,
    getFavorites
  );

  const [stateXAspen, setStateXAspen] = React.useState([]);
  const setDataTableXAspen = [];

  const [stateXSpruceFir, setStateXSpruceFir] = React.useState([]);
  const setDataTableXSpruceFir = [];

  const [stateXOtherSoftwood, setStateXOtherSoftwood] = React.useState([]);
  const setDataTableXOtherSoftwood = [];

  const [stateXPine, setStateXPine] = React.useState([]);
  const setDataTableXPine = [];

  const [stateXCedar, setStateXCedar] = React.useState([]);
  const setDataTableXCedar = [];

  const [stateXHardwood, setStateXHardwood] = React.useState([]);
  const setDataTableXHardwood = [];

  const [stateYInventory, setStateYInventory] = React.useState([]);
  const setDataTableYInventory = [];

  const [sitesArray, setSitesArray] = React.useState(null);

  const [tabIndex, setTabIndex] = useState(0);
  const [collapsibleOpen, setCollapsibleOpen] = useState(0);

  useEffect(() => {
    if (!data) {
    } else {
      const [Inventory] = data;

      if (data) {
        for (var key in Inventory) {
          setDataTableYInventory.push(Inventory[key].Time);
          setDataTableXAspen.push(Inventory[key]["Aspen Inventory"]);
          setDataTableXSpruceFir.push(Inventory[key]["Spruce-Fir Inventory"]);
          setDataTableXOtherSoftwood.push(
            Inventory[key]["Other Softwood Inventory"]
          );
          setDataTableXPine.push(Inventory[key]["Pine Inventory"]);
          setDataTableXCedar.push(Inventory[key]["Cedar Inventory"]);
          setDataTableXHardwood.push(Inventory[key]["Hardwood Inventory"]);
        }
        setStateXAspen(setDataTableXAspen);
        setStateXSpruceFir(setDataTableXSpruceFir);
        setStateXOtherSoftwood(setDataTableXOtherSoftwood);
        setStateXPine(setDataTableXPine);
        setStateXCedar(setDataTableXCedar);
        setStateXHardwood(setDataTableXHardwood);

        setStateYInventory(setDataTableYInventory);
      }
    }
  }, [data]);

  useEffect(() => {
    if (passedData.length === 0) {
    } else {
      const sitesTransposed = Object.keys(passedData).map((key) => ({
        key,
        value: passedData[key],
      }));

      setSitesArray(sitesTransposed);
      setTabIndex(1);

      if (window.innerWidth > 637) {
        setCollapsibleOpen(true);
      }
    }
  }, [passedData, setSitesArray, setTabIndex, setCollapsibleOpen, window]);

  const chartData = [
    {
      x: stateYInventory,
      y: stateXAspen,
      type: "line",
      name: "Aspen",
      marker: { color: "rgb(50, 43, 45)" },
      showlegend: true,
      hovertemplate: "%{y:.2s}",
    },
    {
      x: stateYInventory,
      y: stateXSpruceFir,
      type: "line",
      name: "Spruce-Fir",
      marker: { color: "rgb(59, 157, 60)" },
      showlegend: true,
      hovertemplate: "%{y:.2s}",
    },
    {
      x: stateYInventory,
      y: stateXOtherSoftwood,
      type: "line",
      name: "Other Softwood",
      marker: { color: "rgb(26, 64, 55)" },
      showlegend: true,
      hovertemplate: "%{y:.2s}",
    },
    {
      x: stateYInventory,
      y: stateXPine,
      type: "line",
      name: "Pine",
      marker: { color: "rgb(249, 209, 161)" },
      showlegend: true,
      hovertemplate: "%{y:.2s}",
    },
    {
      x: stateYInventory,
      y: stateXCedar,
      type: "line",
      name: "Cedar",
      marker: { color: "rgb(133, 178, 147)" },
      showlegend: true,
      hovertemplate: "%{y:.2s}",
    },
    {
      x: stateYInventory,
      y: stateXHardwood,
      type: "line",
      name: "Hardwood",
      marker: { color: "rgb(126, 102, 86)" },
      showlegend: true,
      hovertemplate: "%{y:.2s}",
    },
  ];

  /////////Table
  const columns = useMemo(
    () => [
      {
        Header: " ",
        accessor: "key",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Value",
        accessor: "value",
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <div className={"plot"}>
      <Collapsible
        trigger={<AiOutlineLineChart className={"chartIcon"} size="40px" />}
        open={collapsibleOpen}
        handleTriggerClick={() => {
          if (collapsibleOpen) {
            setCollapsibleOpen(false);
          } else {
            setCollapsibleOpen(true);
          }
        }}
      >
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Megaregion Harvest and Inventory</Tab>
            <Tab>Available Site Data</Tab>
          </TabList>
          <TabPanel>
            <div
              className={"toggle"}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Select
                className={"toggleMegaregion"}
                styles={customStylesRegion}
                name="toggleMegaregion"
                value={optionsRegion.filter(
                  ({ value }) => value === myForm.mySelectKey
                )}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
                onChange={onClickRegion}
                options={optionsRegion}
              />
              <div style={{ padding: "5px", fontWeight: "bold" }}>
                Megaregion
              </div>

              <Select
                className={"toggleHarvestInventory"}
                styles={customStylesInvHarv}
                name="toggleMegaregion"
                value={optionsInvHarv.filter(
                  ({ valueInvHarv }) =>
                    valueInvHarv === myFormInvHarv.mySelectKeyInvHarv
                )}
                getOptionLabel={({ labelInvHarv }) => labelInvHarv}
                getOptionValue={({ valueInvHarv }) => valueInvHarv}
                onChange={onClickInvHarv}
                options={optionsInvHarv}
              />
            </div>

            <Plot
              ref={dataChartNode}
              data={chartData}
              layout={{
                height: heightP,
                width: widthP,
                autosize: true,
                // title: `${myLabel.mySelectLabel} Megaregion ${myFormInvHarv.mySelectKeyInvHarv}`,
                legend: {
                  orientation: "v",
                },
                margin: {
                  t: 30,
                },
                yaxis: {
                  title: "Tons",
                  rangemode: "tozero",
                },
              }}
              config={{
                displaylogo: false,
                // displayModeBar: true,
                modeBarButtonsToRemove: [
                  "lasso2d",
                  "autoScale2d", // 2D options
                  "toggleSpikelines",
                  "zoom2d",
                  "zoomIn2d",
                  "zoomOut2d",
                  "pan2d",
                  "hoverClosestCartesian",
                  "hoverCompareCartesian",
                ],
                responsive: true,
                // scrollZoom,
                showTips: false,
                toImageButtonOptions: {
                  format: "svg", // one of png, svg, jpeg, webp
                  filename: "custom_image",
                  height: 500,
                  width: 700,
                  scale: 1, // Multiply title/legend/axis/canvas sizes by this factor
                },
              }}
            />
          </TabPanel>
          <TabPanel style={{ width: widthP, height: "410px" }}>
            {sitesArray ? (
              <Container
                style={{
                  marginTop: 0,
                  maxWidth: "100%",
                  padding: "10px",
                  overflowY: "scroll",
                  width: widthP,
                  height: "410px",
                }}
              >
                <TableContainer
                  columns={columns}
                  data={sitesArray}
                  resizable={false}
                />
              </Container>
            ) : (
              <div className={"selectAvailable"}>
                Select an Available Site for More Information
              </div>
            )}
          </TabPanel>
        </Tabs>
      </Collapsible>
    </div>
  );
};
