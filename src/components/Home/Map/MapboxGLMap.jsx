import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Menu from "react-burger-menu/lib/menus/slide";
import { FiLayers } from "react-icons/fi";

import "../toggleStyles.css";
import "./sidebarStyles.css";
import "../accordionStyles.css";
import "./legendStyle.css";
import Accordion from "../accordion";
import Layer from "./layer";
import Legend from "./Legend";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#b8b7ad",
    minHeight: "30px",

    marginBottom: "0px",
    height: "30px",
    width: "150px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
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

export const MapboxGLMap = ({
  passSiteData,
  getSelectedID,
  highlightLineColor = { rgba: [255, 102, 0, 1] },
}) => {
  const options = [
    { value: null, label: "All Attributes" },
    { value: "Biomass", label: "Biomass" },
    { value: "Multi Use", label: "Multi Use" },
    { value: "Paper Mill", label: "Paper Mill" },
    { value: "Saw Mill", label: "Saw Mill" },
    { value: "Unspecified", label: "Unspecified" },
    { value: "Brownfield", label: "Brownfield" },
    { value: "Greenfield", label: "Greenfield" },
  ];

  const initialFormState = { mySelectKey: null };
  const [myForm, setMyForm] = useState(initialFormState);

  const initialLabelState = { mySelectLabel: "All Attributes" };
  const [myLabel, setMyLabel] = useState(initialLabelState);

  const updateForm = (value, label) => {
    setMyForm({ ...myForm, mySelectKey: value });
    setMyLabel({ ...myLabel, mySelectLabel: label });
  };

  const mapContainer = useRef(null);
  const [statefulMap, setStatefulMap] = useState(null);

  const [selectedId, setSelectedId] = useState("");

  const [siteData, setSiteData] = useState([]);

  const [loadWidth, setLoadWidth] = useState(null);
  const [loadHeight, setLoadHeight] = useState(null);

  const [visibilityA, setVisibilityA] = useState("none");
  const [sliderValueA, setSliderValueA] = useState(100);
  const [toTop, setToTop] = useState(null);

  const [visibilityB, setVisibilityB] = useState("none");
  const [sliderValueB, setSliderValueB] = useState(100);

  const [visibilityC, setVisibilityC] = useState("none");
  const [sliderValueC, setSliderValueC] = useState(100);

  const [visibilityD, setVisibilityD] = useState("visible");
  const [sliderValueD, setSliderValueD] = useState(100);

  const [visibilityE, setVisibilityE] = useState("none");
  const [sliderValueE, setSliderValueE] = useState(100);

  const [visibilityF, setVisibilityF] = useState("none");
  const [sliderValueF, setSliderValueF] = useState(70);

  const [visibilityG, setVisibilityG] = useState("none");
  const [sliderValueG, setSliderValueG] = useState(70);

  const [visibilityH, setVisibilityH] = useState("none");
  const [sliderValueH, setSliderValueH] = useState(100);

  const [visibilityI, setVisibilityI] = useState("none");
  const [sliderValueI, setSliderValueI] = useState(100);

  const [visibilityJ, setVisibilityJ] = useState("none");
  const [sliderValueJ, setSliderValueJ] = useState(100);

  const [visibilityK, setVisibilityK] = useState("none");
  const [sliderValueK, setSliderValueK] = useState(100);

  const [visibilityL, setVisibilityL] = useState("none");
  const [sliderValueL, setSliderValueL] = useState(100);

  const [visibilityM, setVisibilityM] = useState("none");
  const [sliderValueM, setSliderValueM] = useState(100);

  const [visibilityN, setVisibilityN] = useState("none");
  const [sliderValueN, setSliderValueN] = useState(100);

  const landClassStyles = [
    "Biomass",
    "#fbb03b",
    "Paper Mill",
    "#223b53",
    "Multi Use",
    "#e55e5e",
    "Saw Mill",
    "#3bb2d0",
    "Unspecified",
    "#ccc",
  ];
  const landClassLegend = landClassStyles.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const ownershipStyles = [
    "Federal",
    "#1E4F24",
    "State",
    "#1F4089",
    "Local",
    "#90248B",
    "Family",
    "#4BB15F",
    "Corporate",
    "#EF7433",
    "Other private",
    "#E9D841",
  ];
  const ownershipLegend = ownershipStyles.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const vernalPools = ["Vernal Pool", "#C864F0"];
  const vernalPoolsLegend = vernalPools.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const conservedAreas = ["Conserved Area", "#713886"];
  const conservedAreasLegend = conservedAreas.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const newMarketTaxCredits = ["NMTC", "#0C1243"];
  const newMarketTaxCreditsLegend = newMarketTaxCredits.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const qualifiedOpportunityZones = ["QOZ", "#0C4315"];
  const qualifiedOpportunityZonesLegend = qualifiedOpportunityZones.reduce(
    function (result, value, index, array) {
      if (index % 2 === 0) result.push(array.slice(index, index + 2));
      return result;
    },
    []
  );

  const railRoads = ["Active Track", "#8a0f13", "Inactive  Track", "#f31c24"];
  const railRoadsLegend = railRoads.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const privateRoads = ["Road", "#818824"];
  const privateRoadsLegend = privateRoads.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const maineMills = [
    "Biomass Power Generator",
    "#1B9E77",
    "Manufactured Wood Mill",
    "#E7298A",
    "Chip Mill",
    "#D95F02",
    "Hardwood Sawmill",
    "#7570B3",
    "Pellet Mill",
    "#E6AB02",
    "Pulp and Paper Mill",
    "#A6761D",
    "Softwood Sawmill",
    "#666666",
  ];
  const maineMillsLegend = maineMills.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const initMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWljaGFlbG93ZW4iLCJhIjoiY2xqc25ueWZ4MG5lejNya2NvcWliNXBxZiJ9.xxLDHo22CLbdkM8eLGXSuQ";

    const mapboxGlMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/outdoors-v12`,
      zoom: 6.5,
      attributionControl: false,
      bounds: [-71.562744, 42.999217, -66.509033, 47.54714],
    });

    mapboxGlMap.addControl(new mapboxgl.NavigationControl());
    mapboxGlMap.addControl(new mapboxgl.FullscreenControl());
    mapboxGlMap.addControl(
      new mapboxgl.AttributionControl({
        customAttribution:
          "<div class='smallViewport' <strong>Additional data available with a desktop site</strong> <br> </div>",
      })
    );

    mapboxGlMap.on("load", () => {
      mapboxGlMap.resize();

      mapboxGlMap.addLayer({
        id: "satellite",
        source: {
          type: "raster",
          url: "mapbox://mapbox.satellite",
          tileSize: 256,
        },
        type: "raster",
      });

      mapboxGlMap.addSource("vernalPools", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/vernalPools.json",
      });

      mapboxGlMap.addLayer({
        id: "vernalPools",
        source: "vernalPools",
        sourceLayer: "vernalPools-source-layer",
        type: "fill",
        paint: {
          "fill-color": "rgba(200,100,240,0.5)",
          "fill-outline-color": "rgb(200,100,240)",
        },
      });

      mapboxGlMap.addSource("conservedAreas", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/Conserved_Lands.json",
      });

      mapboxGlMap.addLayer({
        id: "conservedAreas",
        source: "conservedAreas",
        sourceLayer: "conservedAreas-source-layer",
        type: "fill",
        paint: {
          "fill-color": "rgba(113,56,134,0.5)",
          "fill-outline-color": "rgb(157,80,188)",
        },
      });

      mapboxGlMap.addSource("rail", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/maineRail.geojson",
      });

      mapboxGlMap.addLayer({
        id: "rail",
        source: "rail",
        sourceLayer: "rail-source-layer",
        type: "line",
        paint: {
          "line-color": [
            "match",
            ["get", "status"],
            1,
            "#8a0f13",
            2,
            "#f31c24",
            "#cccccc",
          ],
          "line-width": 1.5,
        },
      });

      mapboxGlMap.addSource("maineMills", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/maineMills.geojson",
      });

      mapboxGlMap.loadImage(
        "https://raw.githubusercontent.com/mapbox/maki/cb5d8516eb4d0fcbe38f69dd285268f43c3d6a4e/sdf/triangle.png",
        function (error, image) {
          if (error) throw error;
          mapboxGlMap.addImage("triangle-icon", image, { sdf: true });
        }
      );

      mapboxGlMap.addLayer({
        id: "maineMills",
        source: "maineMills",
        sourceLayer: "maineMills-source-layer",
        type: "symbol",
        layout: {
          "icon-image": "triangle-icon",
          "icon-size": 1,
          visibility: "none",
        },
        paint: {
          "icon-color": [
            "match",
            ["get", "Type"],
            "Biomass Power Generator",
            "#1B9E77",
            "Chip Mill",
            "#D95F02",
            "Hardwood Sawmill",
            "#7570B3",
            "Manufactured Wood Mill",
            "#E7298A",
            "Pellet Mill",
            "#E6AB02",
            "Pulp and Paper Mill",
            "#A6761D",
            "Softwood Sawmill",
            "#666666",
            "#ccc",
          ],
        },
      });

      mapboxGlMap.addSource("privateRoads", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/privateRoads.json",
      });

      mapboxGlMap.addLayer({
        id: "privateRoads",
        source: "privateRoads",
        sourceLayer: "privateRoads-source-layer",
        type: "line",
        paint: {
          "line-color": "rgb(129,136,36)",
          "line-width": 2,
        },
      });

      mapboxGlMap.setPaintProperty("road-secondary-tertiary", "line-color", [
        "match",
        ["get", "class"],
        "tertiary",
        "#818824",
        "#FFFFFF",
      ]);

      mapboxGlMap.addLayer({
        id: "landOwnership",
        type: "raster",
        minzoom: 0,
        maxzoom: 22,
        source: {
          type: "raster",
          tiles: [
            "https://apps.fs.usda.gov/arcx/rest/services/RDW_AdminAndOwnership/PublicPrivateForestOwnership_CONUS/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=EPSG%3A3857&dpi=96&format=png32&transparent=true&layers=show%3A0&f=image",
          ],
          tileSize: 256,
          bounds: [-71.136475, 43.052834, -66.829834, 47.532038],
        },
      });

      mapboxGlMap.addSource("newMarketTaxCredits", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/newMarketTaxCredits.json",
      });

      mapboxGlMap.addLayer({
        id: "newMarketTaxCredits",
        source: "newMarketTaxCredits",
        sourceLayer: "newMarketTaxCredits-layer",
        type: "fill",
        paint: {
          "fill-color": "rgb(12,18,67)",
          "fill-outline-color": "rgb(7,6,34)",
        },
      });

      mapboxGlMap.addSource("qualifiedOpportunityZones", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/qualifiedOpportunityZones.json",
      });

      mapboxGlMap.addLayer({
        id: "qualifiedOpportunityZones",
        source: "qualifiedOpportunityZones",
        sourceLayer: "qualifiedOpportunityZones-layer",
        type: "fill",
        paint: {
          "fill-color": "rgb(12,67,21)",
          "fill-outline-color": "rgb(6,34,11)",
        },
      });

      mapboxGlMap.addSource("megaRegions", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/megaregions.json",
      });

      mapboxGlMap.addLayer({
        id: "megaRegions-solid-fill",
        source: "megaRegions",
        sourceLayer: "megaRegions-layer",
        type: "fill",
        paint: {
          "fill-color": "rgba(255,255,255,0.0)",
          "fill-outline-color": "rgba(255,255,255,0.0)",
        },
      });

      mapboxGlMap.addSource("siteSelection", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/FORMAINE_Communities_Data.geojson",
      });

      mapboxGlMap.addLayer({
        id: "siteSelection",
        source: "siteSelection",
        type: "circle",
        paint: {
          "circle-radius": {
            base: 1.75,
            stops: [
              [12, 10],
              [22, 180],
            ],
          },
          "circle-color": [
            "match",
            ["get", "Site Type"],
            "Biomass",
            "#fbb03b",
            "Paper Mill",
            "#223b53",
            "Multi Use",
            "#e55e5e",
            "Saw Mill",
            "#3bb2d0",
            "#ccc",
          ],
        },
      });

      mapboxGlMap.addLayer({
        id: "megaRegions-solid-line",
        source: "megaRegions",
        type: "line",
        paint: {
          "line-color": "rgb(176,100,50)",
          "line-width": 2,
        },
      });

      mapboxGlMap.addSource("ports", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/formaine/data/main/mainePorts.geojson",
      });

      mapboxGlMap.loadImage(
        "https://raw.githubusercontent.com/mapbox/maki/cb5d8516eb4d0fcbe38f69dd285268f43c3d6a4e/sdf/harbor.png",
        function (error, image) {
          if (error) throw error;
          mapboxGlMap.addImage("harbor-icon", image, { sdf: true });
        }
      );

      mapboxGlMap.addLayer({
        id: "ports",
        source: "ports",
        sourceLayer: "ports-source-layer",
        type: "symbol",
        layout: {
          "icon-image": "harbor-icon",
          "icon-size": 1.5,
          visibility: "none",
        },
      });

      //lay down a transparent highlight line layer, we'll use this layer later to highlight a feature based on selectedId
      mapboxGlMap.addLayer({
        id: "megaRegions-highlight",
        source: "megaRegions",
        type: "line",
        paint: {
          "line-color": `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]}, 0)`,
          "line-width": 3,
        },
      });

      mapboxGlMap.on("mouseenter", "megaRegions-solid-fill", function () {
        mapboxGlMap.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      mapboxGlMap.on("mouseleave", "megaRegions-solid-fill", function () {
        mapboxGlMap.getCanvas().style.cursor = "";
      });

      ///////////////////////////////////////////////////////////

      mapboxGlMap.on("mouseenter", "siteSelection", function () {
        mapboxGlMap.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      mapboxGlMap.on("mouseleave", "siteSelection", function () {
        mapboxGlMap.getCanvas().style.cursor = "";
      });

      mapboxGlMap.on("click", "siteSelection", function (e) {
        mapboxGlMap.getCanvas().style.cursor = "pointer";
        const coordinates = e.features[0].geometry.coordinates.slice();

        //map.setCenter(center);
        mapboxGlMap.flyTo({
          center: coordinates,
          zoom: 14,
          easing(t) {
            return t;
          },
        });
      });

      mapboxGlMap.on("click", "qualifiedOpportunityZones", function (e) {
        //Popup
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            "<h5> " +
              e.features[0].properties.NAMELSAD +
              "</h5>" +
              "<hr>" +
              "<h6> County: " +
              e.features[0].properties.County +
              "</h6>" +
              "<hr>" +
              "<h6> Tract Type: " +
              e.features[0].properties.Tract_Type +
              "</h6>"
          )
          .addTo(mapboxGlMap);
      });

      mapboxGlMap.on("click", "newMarketTaxCredits", function (e) {
        //Popup
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            "<h5> " +
              e.features[0].properties.NAMELSAD +
              "</h5>" +
              "<hr>" +
              "<h6> County Name: " +
              e.features[0].properties.County_Name +
              "</h6>" +
              "<hr>" +
              "<h6> Unemployment Rate: " +
              e.features[0].properties
                .Census_Tract_Unemployment_Rate_____2011_2015 +
              "</h6>"
          )
          .addTo(mapboxGlMap);
      });

      setStatefulMap(mapboxGlMap);
    });
  };

  useEffect(() => {
    const ratio = Math.min(1280 / window.innerWidth, 1280 / window.innerHeight);

    setLoadWidth(Math.round(window.innerWidth * ratio));
    setLoadHeight(Math.round(window.innerHeight * ratio));
  }, [window, setLoadWidth, setLoadHeight]);

  useEffect(() => {
    if (!statefulMap) {
      initMap();
    } else {
      if (getSelectedID()) {
        statefulMap.setPaintProperty("megaRegions-highlight", "line-color", [
          "case",
          ["==", ["get", "Megaregion"], getSelectedID()],
          `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]},${highlightLineColor.rgba[3]})`,
          "rgba(0,0,0,0)",
        ]);

        statefulMap.on("click", "megaRegions-solid-fill", function (e) {
          statefulMap.setPaintProperty("megaRegions-highlight", "line-color", [
            "case",
            ["==", ["get", "Megaregion"], e.features[0].properties.Megaregion],
            `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]},${highlightLineColor.rgba[3]})`,
            "rgba(0,0,0,0)",
          ]);
        });
      } else {
        statefulMap.setPaintProperty(
          "megaRegions-highlight",
          "line-color",
          "rgba(0,0,0,0)"
        );
      }

      statefulMap.on("click", "siteSelection", function (e) {
        const selectedSite = e.features[0].properties;

        setSiteData(selectedSite);
        passSiteData(selectedSite);
        console.log(selectedSite);
      });

      statefulMap.on("click", "megaRegions-solid-fill", function (e) {
        statefulMap.setPaintProperty("megaRegions-highlight", "line-color", [
          "case",
          ["==", ["get", "id"], getSelectedID()],
          `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]},${highlightLineColor.rgba[3]})`,
          "rgba(0,0,0,0)",
        ]);
      });
    }
  }, [statefulMap, getSelectedID(), setSiteData]);

  useEffect(() => {
    if (!statefulMap) {
    } else {
      statefulMap.setLayoutProperty(
        "vernalPools",
        "visibility",
        `${visibilityA}`
      );
      statefulMap.setPaintProperty(
        "vernalPools",
        "fill-opacity",
        parseInt(`${sliderValueA}`, 10) / 100
      );
      if (toTop != null) {
        statefulMap.moveLayer(toTop);
      }

      statefulMap.setLayoutProperty(
        "satellite",
        "visibility",
        `${visibilityB}`
      );
      statefulMap.setPaintProperty(
        "satellite",
        "raster-opacity",
        parseInt(`${sliderValueB}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "conservedAreas",
        "visibility",
        `${visibilityC}`
      );
      statefulMap.setPaintProperty(
        "conservedAreas",
        "fill-opacity",
        parseInt(`${sliderValueC}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "siteSelection",
        "visibility",
        `${visibilityD}`
      );
      statefulMap.setPaintProperty(
        "siteSelection",
        "circle-opacity",
        parseInt(`${sliderValueD}`, 10) / 100
      );

      {
        if (
          !(myForm.mySelectKey == null) &&
          !(myForm.mySelectKey == "Greenfield") &&
          !(myForm.mySelectKey == "Brownfield")
        ) {
          statefulMap.setFilter("siteSelection", [
            "==",
            "Site Type",
            `${myLabel.mySelectLabel}`,
          ]);
        } else if (
          myForm.mySelectKey == "Greenfield" ||
          myForm.mySelectKey == "Brownfield"
        ) {
          statefulMap.setFilter("siteSelection");
          statefulMap.setFilter("siteSelection", [
            "==",
            `${myForm.mySelectKey}`,
            "Yes",
          ]);
        } else {
          statefulMap.setFilter("siteSelection");
        }
      }

      statefulMap.setLayoutProperty(
        "landOwnership",
        "visibility",
        `${visibilityE}`
      );
      statefulMap.setPaintProperty(
        "landOwnership",
        "raster-opacity",
        parseInt(`${sliderValueE}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "qualifiedOpportunityZones",
        "visibility",
        `${visibilityF}`
      );
      statefulMap.setPaintProperty(
        "qualifiedOpportunityZones",
        "fill-opacity",
        parseInt(`${sliderValueF}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "newMarketTaxCredits",
        "visibility",
        `${visibilityG}`
      );
      statefulMap.setPaintProperty(
        "newMarketTaxCredits",
        "fill-opacity",
        parseInt(`${sliderValueG}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "megaRegions-solid-line",
        "visibility",
        `${visibilityH}`
      );
      statefulMap.setPaintProperty(
        "megaRegions-solid-line",
        "line-opacity",
        parseInt(`${sliderValueH}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "megaRegions-solid-fill",
        "visibility",
        `${visibilityI}`
      );
      statefulMap.setPaintProperty(
        "megaRegions-solid-fill",
        "fill-opacity",
        parseInt(`${sliderValueI}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "megaRegions-highlight",
        "visibility",
        `${visibilityJ}`
      );
      statefulMap.setPaintProperty(
        "megaRegions-highlight",
        "line-opacity",
        parseInt(`${sliderValueJ}`, 10) / 100
      );

      statefulMap.setLayoutProperty("rail", "visibility", `${visibilityK}`);
      statefulMap.setPaintProperty(
        "rail",
        "line-opacity",
        parseInt(`${sliderValueK}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "road-secondary-tertiary",
        "visibility",
        `${visibilityL}`
      );
      statefulMap.setPaintProperty(
        "road-secondary-tertiary",
        "line-opacity",
        parseInt(`${sliderValueL}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "privateRoads",
        "visibility",
        `${visibilityL}`
      );
      statefulMap.setPaintProperty(
        "privateRoads",
        "line-opacity",
        parseInt(`${sliderValueL}`, 10) / 100
      );

      statefulMap.setLayoutProperty(
        "maineMills",
        "visibility",
        `${visibilityM}`
      );
      statefulMap.setPaintProperty(
        "maineMills",
        "icon-opacity",
        parseInt(`${sliderValueM}`, 10) / 100
      );

      statefulMap.setLayoutProperty("ports", "visibility", `${visibilityN}`);
      statefulMap.setPaintProperty(
        "ports",
        "text-opacity",
        parseInt(`${sliderValueN}`, 10) / 100
      );
    }
  }, [
    statefulMap,
    visibilityA,
    visibilityB,
    visibilityC,
    visibilityD,
    visibilityE,
    visibilityF,
    visibilityG,
    visibilityH,
    visibilityI,
    visibilityJ,
    visibilityK,
    visibilityL,
    visibilityM,
    visibilityN,
    sliderValueA,
    sliderValueB,
    sliderValueC,
    sliderValueD,
    sliderValueE,
    sliderValueF,
    sliderValueG,
    sliderValueH,
    sliderValueI,
    sliderValueJ,
    sliderValueK,
    sliderValueL,
    sliderValueM,
    sliderValueN,
    toTop,
    myForm,
    myLabel,
  ]);

  return (
    <div>
      {loadWidth && (
        <div
          className={"staticMap"}
          style={{
            backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/[-71.562744,42.999217,-66.509033,47.547140]/${loadWidth}x${loadHeight}@2x?access_token=pk.eyJ1IjoibWljaGFlbG93ZW4iLCJhIjoiY2xqc25ueWZ4MG5lejNya2NvcWliNXBxZiJ9.xxLDHo22CLbdkM8eLGXSuQ')`,
            backgroundSize: "cover",
            width: "100vw",
            top: "0vh",
            left: "0",
            bottom: "0vh",
            position: "absolute",
            visibility: statefulMap === null ? "visible" : "hidden",
          }}
        ></div>
      )}
      <div
        style={{
          width: "100vw",
          top: "0vh",
          left: "0",
          bottom: "0vh",
          position: "absolute",
        }}
        ref={mapContainer}
      />

      <div
        className={"legendBox"}
        style={{
          padding:
            `${visibilityA}` === "visible" ||
            `${visibilityC}` === "visible" ||
            `${visibilityD}` === "visible" ||
            `${visibilityE}` === "visible" ||
            `${visibilityG}` === "visible" ||
            `${visibilityF}` === "visible" ||
            `${visibilityK}` === "visible" ||
            `${visibilityL}` === "visible" ||
            `${visibilityM}` === "visible"
              ? 10
              : null,
        }}
      >
        {visibilityA === "visible" ? (
          <Legend
            legendLayerTitle={"Vernal Pools"}
            itemArray={vernalPoolsLegend}
            keyID={"vernalPools"}
          />
        ) : null}

        {visibilityC === "visible" ? (
          <Legend
            legendLayerTitle={"Conserved Areas"}
            itemArray={conservedAreasLegend}
            keyID={"conservedAreas"}
          />
        ) : null}

        {visibilityD === "visible" ? (
          <Legend
            legendLayerTitle={"Sites"}
            itemArray={landClassLegend}
            keyID={"siteSelection"}
          />
        ) : null}

        {visibilityE === "visible" ? (
          <Legend
            legendLayerTitle={"Land Ownership"}
            itemArray={ownershipLegend}
            keyID={"ownership"}
          />
        ) : null}

        {visibilityG === "visible" ? (
          <Legend
            legendLayerTitle={"New Market Tax Credits"}
            itemArray={newMarketTaxCreditsLegend}
            keyID={"newMarketTaxCredits"}
          />
        ) : null}

        {visibilityF === "visible" ? (
          <Legend
            legendLayerTitle={"Qualified Opportunity Zones"}
            itemArray={qualifiedOpportunityZonesLegend}
            keyID={"qualifiedOpportunityZones"}
          />
        ) : null}

        {visibilityK === "visible" ? (
          <Legend
            legendLayerTitle={"Rail Access"}
            itemArray={railRoadsLegend}
            keyID={"railRoads"}
          />
        ) : null}

        {visibilityL === "visible" ? (
          <Legend
            legendLayerTitle={"Private/Tertiary Roads"}
            itemArray={privateRoadsLegend}
            keyID={"privateRoads"}
          />
        ) : null}

        {visibilityM === "visible" ? (
          <Legend
            legendLayerTitle={"Wood Processing Facilities"}
            itemArray={maineMillsLegend}
            keyID={"maineMills"}
          />
        ) : null}
      </div>

      <Menu customBurgerIcon={<FiLayers />} isOpen={true} noOverlay={true}>
        <Accordion title="Environment" accordionOpen={false}>
          <Layer
            layerTitle={"Vernal Pools"}
            sourceDetails={
              "https://maine.hub.arcgis.com/datasets/478a139603884f718651f21c9dbf318c"
            }
            layerDescription={
              "This dataset was developed in accordance with Maine's Natural Resources Protection Act (NRPA). Under this Act, the Maine Department of Inland Fisheries and Wildlife (MDIFW) is designated as the authority for determining Significant Wildlife Habitats (SWHs). This dataset includes all Significant Vernal Pools currently mapped. This dataset depicts 250-foot habitat zones surrounding the perimeters of Significant Vernal Pools (SVPs) or Potentially Significant Vernal Pools (PSVPs). SVPs and PSVPs were mapped and surveyed in the field by Maine Department of Environmental Protection staff, Maine Department of Inland Fisheries and Wildlife biologists, and appropriately trained consultants."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityA("none");
              } else {
                setVisibilityA("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueA(e.target.value)}
            sliderChangeValue={sliderValueA}
            layerToTop={() => {
              setToTop("vernalPools");
            }}
          />

          <Layer
            layerTitle={"Satellite"}
            sourceDetails={"© Mapbox © Maxar"}
            layerDescription={
              "Mapbox Satellite is a global tileset of high-resolution satellite imagery. The imagery data comes from a variety of commercial providers, as well as open data from NASA, USGS, and others. It’s color-corrected and blended together into a single raster tileset."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityB("none");
              } else {
                setVisibilityB("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueB(e.target.value)}
            sliderChangeValue={sliderValueB}
            layerToTop={() => {
              setToTop("satellite");
            }}
          />
        </Accordion>

        <Accordion title="Woodbasket" accordionOpen={false}>
          <Layer
            layerTitle={"Conserved Lands"}
            sourceDetails={
              "https://maine.hub.arcgis.com/datasets/a6797f12a07b4229bc2501d3741c98d4"
            }
            layerDescription={
              "Conserved Lands contains conservation lands ownership boundaries at 1:24,000 scale for Maine land in federal, state, municipal and non-profit ownership with easements. State, county, town, and coast boundary data were obtained from MEGIS town boundary dataset METWP24. 1:24,000 US Geological Survey (USGS) digital line graph data was used for hydrography and transportation features. Where state, county, and town boundaries were coincident with property boundaries, the coincident features were taken from METWP24. Where hydrography, roads, railroads and power-lines were coincident with property boundaries, the coincident features were taken from 1:24,000 digital line graph data. The ownership lines do not represent legal boundaries nor are the ownership lines a survey. Conserved Lands is an inventory of approximate property boundaries."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityC("none");
              } else {
                setVisibilityC("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueC(e.target.value)}
            sliderChangeValue={sliderValueC}
            layerToTop={() => {
              setToTop("conservedAreas");
            }}
          />

          <Layer
            layerTitle={"Forest Ownership"}
            sourceDetails={
              "https://usfs.maps.arcgis.com/home/item.html?id=0cc2cb942455475ca781fda25028ef2f"
            }
            layerDescription={
              "The data are designed for strategic analyses at a national or regional scale which require spatially explicit information regarding the extent, distribution, and prevalence of the ownership types represented. The data are not recommended for tactical analyses on a sub-regional scale, or for informing local management decisions. Furthermore, map accuracies vary considerably and thus the utility of these data can vary geographically under different ownership patterns."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityE("none");
              } else {
                setVisibilityE("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueE(e.target.value)}
            sliderChangeValue={sliderValueE}
            layerToTop={() => {
              setToTop("landOwnership");
            }}
          />

          <Layer
            layerTitle={"Forest Mega-regions"}
            sourceDetails={"Indufor and FOR/Maine 2020"}
            layerDescription={
              "Megaregions defined via county-wood basket groups."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityH("none");
                setVisibilityI("none");
                setVisibilityJ("none");
              } else {
                setVisibilityH("visible");
                setVisibilityI("visible");
                setVisibilityJ("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueH(e.target.value)}
            sliderChangeValue={sliderValueH}
            layerToTop={() => {
              setToTop("megaRegions-highlight");
            }}
          />
        </Accordion>

        <Accordion title="Maine's Forest Economy" accordionOpen={true}>
          <Layer
            layerTitle={"Sites"}
            sourceDetails={"Indufor and FOR/Maine 2020"}
            layerDescription={"Available Forest Economy Sites."}
            defaultChecked={true}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityD("none");
              } else {
                setVisibilityD("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueD(e.target.value)}
            sliderChangeValue={sliderValueD}
            layerToTop={() => {
              setToTop("siteSelection");
            }}
          />

          <div
            style={{
              float: "right",
              display: "flex",
              width: "100%",
              verticalAlign: "top",
            }}
          >
            <div style={{ paddingRight: "0.5em" }}>Displaying sites with</div>
            <Select
              className={"siteFilter"}
              styles={customStyles}
              maxMenuHeight={90}
              name="mySelect"
              value={options.filter(
                ({ value }) => value === myForm.mySelectKey || ""
              )}
              getOptionLabel={({ label }) => label}
              getOptionValue={({ value }) => value}
              onChange={({ value, label }) => updateForm(value, label)}
              options={options}
            />
          </div>
          <Layer
            layerTitle={"Wood Processing Facilities"}
            sourceDetails={"Indufor and FOR/Maine 2020"}
            layerDescription={"Major Wood Processing Facilities in Maine."}
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityM("none");
              } else {
                setVisibilityM("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueM(e.target.value)}
            sliderChangeValue={sliderValueM}
            layerToTop={() => {
              setToTop("maineMills");
            }}
          />

          <Layer
            layerTitle={"Ports"}
            sourceDetails={"Indufor and FOR/Maine 2020"}
            layerDescription={
              "Major Wood Exporting and Importing Ports in Maine."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityN("none");
              } else {
                setVisibilityN("visible");
              }
            }}
            layerToTop={() => {
              setToTop("ports");
            }}
          />
        </Accordion>

        <Accordion title="Incentives" accordionOpen={false}>
          <Layer
            layerTitle={"Qualified Opportunity Zones"}
            sourceDetails={
              "https://www.maine.gov/decd/business-development/opportunity-zones"
            }
            layerDescription={
              "The Opportunity Zones incentive is a community investment tool established by Congress in the Tax Cuts and Jobs Act of 2017 to encourage long-term investments in low-income urban and rural communities nationwide. Opportunity Zones provide a tax incentive for investors to re-invest their unrealized capital gains into dedicated Opportunity Funds."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityF("none");
              } else {
                setVisibilityF("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueF(e.target.value)}
            sliderChangeValue={sliderValueF}
            layerToTop={() => {
              setToTop("qualifiedOpportunityZones");
            }}
          />

          <Layer
            layerTitle={"New Market Tax Credit"}
            sourceDetails={
              "https://www.maine.gov/decd/business-development/opportunity-zones"
            }
            layerDescription={
              "The Opportunity Zones incentive is a community investment tool established by Congress in the Tax Cuts and Jobs Act of 2017 to encourage long-term investments in low-income urban and rural communities nationwide. Opportunity Zones provide a tax incentive for investors to re-invest their unrealized capital gains into dedicated Opportunity Funds."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityG("none");
              } else {
                setVisibilityG("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueG(e.target.value)}
            sliderChangeValue={sliderValueG}
            layerToTop={() => {
              setToTop("newMarketTaxCredits");
            }}
          />
        </Accordion>

        <Accordion title="Infrastructure" accordionOpen={false}>
          <Layer
            layerTitle={"Rail"}
            sourceDetails={
              "https://maine.hub.arcgis.com/datasets/27c9cef0de15475aa7461933e0294391"
            }
            layerDescription={
              "Statewide railroad coverage for Maine at 1:24000 scale or better."
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityK("none");
              } else {
                setVisibilityK("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueK(e.target.value)}
            sliderChangeValue={sliderValueK}
            layerToTop={() => {
              setToTop("rail");
            }}
          />

          <Layer
            layerTitle={"Private/ Tertiary Roads"}
            sourceDetails={
              "https://maine.hub.arcgis.com/datasets/9cae3411ae8d4cfc91627ab5bd3c9943"
            }
            layerDescription={
              "Represents public road centerlines in the state of Maine. Created by Maine Department of Transportation using MaineDOT's basemap linework managed in METRANS, MaineDOT's Linear Referencing System (LRS).  MaineDOT_Public_Roads includes the most commonly-used attributes such as traffic volumes, federal functional classifications, jurisdiction, priority and more.  This is updated regularly through a service, although the AGOL \"Updated\" date may only reflect the date this feature layer was created.\n"
            }
            defaultChecked={false}
            onToggleChange={(e) => {
              if (e.target.checked === false) {
                setVisibilityL("none");
              } else {
                setVisibilityL("visible");
              }
            }}
            onSliderChange={(e) => setSliderValueL(e.target.value)}
            sliderChangeValue={sliderValueL}
            layerToTop={() => {
              setToTop("road-secondary-tertiary");
            }}
          />
        </Accordion>
      </Menu>
    </div>
  );
};
