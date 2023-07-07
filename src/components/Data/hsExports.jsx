import React, {useRef, useState, useEffect, setState} from "react";
import Plotly from "plotly.js"

import createPlotlyComponent from 'react-plotly.js/factory';

import {useQuery} from "react-query";
import census from "citysdk";
import Select from "react-select";
import { groupedOptions } from './selectGroups'

const Plot = createPlotlyComponent(Plotly);



const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '30px',
        marginBottom: '0px',
        height: '30px',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),
};



export const PlotHSExports = ({
                            barColorInput,
                            onClick
                        }) => {



    const dataChartNode = useRef();


    const initialFormState = { mySelectHS: "4403" };
    const [myHSCode, setMyHSCode] = useState(initialFormState);

    const initialLabelState = { mySelectHSLabel: "Wood in the rough, whether or not stripped of bark or sap- wood, or roughly squared" };
    const [myHSCodeLabel, setMyHSCodeLabel] = useState(initialLabelState);

    const updateForm = (value, label) => {
        setMyHSCode({ ...myHSCode, mySelectHS: value });
        setMyHSCodeLabel({ ...myHSCodeLabel, mySelectHSLabel: label });
    };


    function censusPromise(args) {
        return new Promise(function(resolve, reject) {
            census(args, function(err, json) {
                if (!err) {
                    resolve(json);
                } else {
                    reject(err);
                }
            });
        });
    }


    function getCensusExportsI() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statehs"], // required
            values: ["CTY_CODE", "CTY_NAME", "ALL_VAL_MO"],
            predicates: {STATE:"ME", time: "from+2013-04", E_COMMODITY: `${myHSCode.mySelectHS}`, CTY_CODE: "1XXX" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    function getCensusExportsII() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statehs"], // required
            values: ["CTY_CODE", "CTY_NAME", "ALL_VAL_MO"],
            predicates: {STATE:"ME", time: "from+2013-04", E_COMMODITY: `${myHSCode.mySelectHS}`, CTY_CODE: "3XXX" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    function getCensusExportsIII() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statehs"], // required
            values: ["CTY_CODE", "CTY_NAME", "ALL_VAL_MO"],
            predicates: {STATE:"ME", time: "from+2013-04", E_COMMODITY: `${myHSCode.mySelectHS}`, CTY_CODE: "4XXX" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    function getCensusExportsIV() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statehs"], // required
            values: ["CTY_CODE", "CTY_NAME", "ALL_VAL_MO"],
            predicates: {STATE:"ME", time: "from+2013-04", E_COMMODITY: `${myHSCode.mySelectHS}`, CTY_CODE: "5XXX" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    function getCensusExportsV() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statehs"], // required
            values: ["CTY_CODE", "CTY_NAME", "ALL_VAL_MO"],
            predicates: {STATE:"ME", time: "from+2013-04", E_COMMODITY: `${myHSCode.mySelectHS}`, CTY_CODE: "6XXX" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }



    function getAllExports() {
        return Promise.all([getCensusExportsI(), getCensusExportsII(), getCensusExportsIII(), getCensusExportsIV(), getCensusExportsV()])
            .then(data => data);
    }



    const { data } = useQuery(`${myHSCodeLabel.mySelectHSLabel}`, getAllExports);


    const [stateXI, setStateXI] = React.useState([])
    const [stateYI, setStateYI] = React.useState([])
    const setDataTableXI = [];
    const setDataTableYI = [];

    const [stateXII, setStateXII] = React.useState([])
    const [stateYII, setStateYII] = React.useState([])
    const setDataTableXII = [];
    const setDataTableYII = [];


    const [stateXIII, setStateXIII] = React.useState([])
    const [stateYIII, setStateYIII] = React.useState([])
    const setDataTableXIII = [];
    const setDataTableYIII = [];

    const [stateXIV, setStateXIV] = React.useState([])
    const [stateYIV, setStateYIV] = React.useState([])
    const setDataTableXIV = [];
    const setDataTableYIV = [];

    const [stateXV, setStateXV] = React.useState([])
    const [stateYV, setStateYV] = React.useState([])
    const setDataTableXV = [];
    const setDataTableYV = [];

    React.useEffect(() => {

        if (!data) {
        } else {
            const [I, II, III, IV, V] = data;

            if (data) {

                I.sort(function(a,b){
                    return new Date(b.time) - new Date(a.time);
                });

                for (var key in I) {
                    setDataTableYI.push(I[key].time);
                    setDataTableXI.push(I[key].ALL_VAL_MO);
                }
                setStateXI(setDataTableXI);
                setStateYI(setDataTableYI);


                II.sort(function(a,b){
                    return new Date(b.time) - new Date(a.time);
                });

                for (var key in II) {
                    setDataTableYII.push(II[key].time);
                    setDataTableXII.push(II[key].ALL_VAL_MO);

                }
                setStateXII(setDataTableXII);
                setStateYII(setDataTableYII);

                III.sort(function(a,b){
                    return new Date(b.time) - new Date(a.time);
                });

                for (var key in III) {
                    setDataTableYIII.push(III[key].time);
                    setDataTableXIII.push(III[key].ALL_VAL_MO);
                }
                setStateXIII(setDataTableXIII);
                setStateYIII(setDataTableYIII);

                IV.sort(function(a,b){
                    return new Date(b.time) - new Date(a.time);
                });

                for (var key in IV) {
                    setDataTableYIV.push(IV[key].time);
                    setDataTableXIV.push(IV[key].ALL_VAL_MO);

                }
                setStateXIV(setDataTableXIV);
                setStateYIV(setDataTableYIV);

                V.sort(function(a,b){
                    return new Date(b.time) - new Date(a.time);
                });

                for (var key in V) {
                    setDataTableYV.push(V[key].time);
                    setDataTableXV.push(V[key].ALL_VAL_MO);

                }
                setStateXV(setDataTableXV);
                setStateYV(setDataTableYV);



            }
        }
    }, [data])




    const chartData = [
        {
            x: stateYI,
            y: stateXI,
            type: 'line',
            name: 'North America',
            marker: {color: 'rgb(133, 178, 147)'},
            showlegend: true,
            hovertemplate: '%{y:$.2s}'

        },
        {
            x: stateYII,
            y: stateXII,
            type: 'line',
            name: 'South America',
            marker: {color: 'rgb(26, 64, 55)'},
            showlegend: true,
            hovertemplate: '%{y:$.2s}'

        },
        {
            x: stateYIII,
            y: stateXIII,
            type: 'line',
            name: 'Europe',
            marker: {color: 'rgb(59, 157, 60)'},
            showlegend: true,
            hovertemplate: '%{y:$.2s}'
        },
        {
            x: stateYIV,
            y: stateXIV,
            type: 'line',
            name: 'Asia',
            marker: {color: 'rgb(249, 209, 161)'},
            showlegend: true,
            hovertemplate: '%{y:$.2s}'
        },
        {
            x: stateYV,
            y: stateXV,
            type: 'line',
            name: 'Australia and Oceania',
            marker: {color: 'rgb(50, 43, 45)'},
            showlegend: true,
            hovertemplate: '%{y:$.2s}'
        }
    ];




    return (


        <div className={"PlotHSExports"}>


            <div className={"toggleContainer"} style={{width: '75vw'}}>
            <h1>Monthly Maine Manufacturing Exports</h1>
                <Select
                    className={"toggleHS"}
                    styles={customStyles}
                    name="mySelect"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={({ value, label }) => updateForm(value, label)}
                    options={groupedOptions}
                />
            </div>

            <Plot
                style={{height: '75vh', right: 0}}
                ref={dataChartNode}
                data={chartData}
                layout={{
                    autosize: true,
                    legend: {
                        orientation: "v",
                        title: { text: 'Export Destination' }
                    },
                    yaxis: {
                        title: "Export Sum (USD)",
                        rangemode: 'tozero'},

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
                        "hoverCompareCartesian"
                    ],
                    responsive: true,
                    // scrollZoom,
                    showTips: false
                }}
            />
        </div>


    );
}