import React, { useRef, useState, useEffect, setState } from "react";
import Plotly from "plotly.js";

import createPlotlyComponent from "react-plotly.js/factory";
import { useQuery } from "react-query";

const Plot = createPlotlyComponent(Plotly);

export const PlotHarvest = ({ barColorInput, onClick }) => {
  const dataChartNode = useRef();

  const getHarvest = () =>
    fetch(
      `https://raw.githubusercontent.com/eastcoasting/test/master/harvest.json`
    );

  function getFavorites() {
    return Promise.all([getHarvest()])
      .then((responses) => {
        return Promise.all(
          responses.map((response) => {
            return response.json();
          })
        );
      })
      .then((data) => data);
  }

  const { data } = useQuery("Harvest", getFavorites);

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

  React.useEffect(() => {
    if (!data) {
    } else {
      const [Inventory] = data;

      if (data) {
        for (var key in Inventory) {
          setDataTableYInventory.push(Inventory[key].Time);
          setDataTableXAspen.push(Inventory[key]["Aspen Tons Cut"]);
          setDataTableXSpruceFir.push(Inventory[key]["Spruce-Fir Tons Cut"]);
          setDataTableXOtherSoftwood.push(
            Inventory[key]["Other Softwood Tons Cut"]
          );
          setDataTableXPine.push(Inventory[key]["Pine Tons Cut"]);
          setDataTableXCedar.push(Inventory[key]["Cedar Tons Cut"]);
          setDataTableXHardwood.push(Inventory[key]["Hardwood Tons Cut"]);
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

  const chartData = [
    {
      x: stateYInventory,
      y: stateXAspen,
      type: "bar",
      name: "Aspen",
      marker: { color: "rgb(50, 43, 45)" },
      showlegend: true,
      hovertemplate: "%{y:.2s} Kt/Yr",
    },
    {
      x: stateYInventory,
      y: stateXSpruceFir,
      type: "bar",
      name: "Spruce-Fir",
      marker: { color: "rgb(59, 157, 60)" },
      showlegend: true,
      hovertemplate: "%{y:.2s} Kt/Yr",
    },
    {
      x: stateYInventory,
      y: stateXOtherSoftwood,
      type: "bar",
      name: "Other Softwood",
      marker: { color: "rgb(26, 64, 55)" },
      showlegend: true,
      hovertemplate: "%{y:.2s} Kt/Yr",
    },
    {
      x: stateYInventory,
      y: stateXPine,
      type: "bar",
      name: "Pine",
      marker: { color: "rgb(249, 209, 161)" },
      showlegend: true,
      hovertemplate: "%{y:.2s} Kt/Yr",
    },
    {
      x: stateYInventory,
      y: stateXCedar,
      type: "bar",
      name: "Cedar",
      marker: { color: "rgb(133, 178, 147)" },
      showlegend: true,
      hovertemplate: "%{y:.2s} Kt/Yr",
    },
    {
      x: stateYInventory,
      y: stateXHardwood,
      type: "bar",
      name: "Hardwood",
      marker: { color: "rgb(126, 102, 86)" },
      showlegend: true,
      hovertemplate: "%{y:.2s} Kt/Yr",
    },
  ];

  return (
    <div className={"plotHarvest"} style={{ flexGrow: 1 }}>
      <Plot
        style={{ height: "75vh", right: 0 }}
        ref={dataChartNode}
        data={chartData}
        layout={{
          barmode: "stack",
          autosize: true,
          legend: {
            orientation: "v",
          },
          yaxis: {
            title: "Thousand Tons per Year",
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
        }}
      />
    </div>
  );
};
