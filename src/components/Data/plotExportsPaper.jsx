import React, {useRef, useState, useEffect, setState} from "react";
import Plotly from "plotly.js"

import createPlotlyComponent from 'react-plotly.js/factory';
import {useQuery} from "react-query";
import census from "citysdk";

const Plot = createPlotlyComponent(Plotly);



export const PlotExportsPaper = ({
                            heightP,
                            widthP,
                            barColorInput,
                            onClick
                        }) => {



    const dataChartNode = useRef();


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


    function getCensusExportsA() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statenaics"], // required
            values: ["NAICS", "ALL_VAL_YR"],
            predicates: {STATE:"ME", time: "from+2013-04", NAICS: "3222" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    function getCensusExportsB() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statenaics"], // required
            values: ["NAICS", "ALL_VAL_MO"],
            predicates: {STATE:"ME", time: "from+2013-04", NAICS: "3221" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }


    function getAllExports() {
        return Promise.all([getCensusExportsA(), getCensusExportsB()])
            .then(data => data);
    }



    const { data } = useQuery('Exports', getAllExports);

    const [stateXConverted, setStateXConverted] = React.useState([])
    const [stateYConverted, setStateYConverted] = React.useState([])
    const setDataTableXConverted = [];
    const setDataTableYConverted = [];

    const [stateXPulp, setStateXPulp] = React.useState([])
    const [stateYPulp, setStateYPulp] = React.useState([])
    const setDataTableXPulp = [];
    const setDataTableYPulp = [];


    React.useEffect(() => {

        if (!data) {
        } else {
            const [Converted, Pulp] = data;

            if (data) {

                for (var key in Converted) {
                    setDataTableYConverted.push(Converted[key].time);
                    setDataTableXConverted.push(Converted[key].ALL_VAL_MO);

                }
                setStateXConverted(setDataTableXConverted);
                setStateYConverted(setDataTableYConverted);

                for (var key in Pulp) {
                    setDataTableYPulp.push(Pulp[key].time);
                    setDataTableXPulp.push(Pulp[key].ALL_VAL_MO);

                }

                setStateXPulp(setDataTableXPulp);
                setStateYPulp(setDataTableYPulp);

            }
        }
    }, [data])




    const chartData = [
        {
            x: stateYConverted,
            y: stateXConverted,
            type: 'line',
            name: 'Converted paper product<br>manufacturing',
            marker: {color: 'rgb(133, 178, 147)'},
            showlegend: true,
            hovertemplate: '%{y:$.2s}'

        },
        {
            x: stateYPulp,
            y: stateXPulp,
            type: 'line',
            name: 'Pulp, paper and<br>paperboard mills',
            marker: {color: 'rgb(59, 157, 60)'},
            showlegend: true,
            hovertemplate: '%{y:$.2s}'

        }
    ];





    return (


        <div className={"plotExportsPaper"}
             style={{flexGrow: 1}}>
            <Plot
                style={{height: '75vh', right: 0}}
                ref={dataChartNode}
                data={chartData}
                layout={{
                    autosize: true,
                    title: 'Monthly Paper Manufacturing Exports',
                    legend: {
                        orientation: "v"
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
                    showTips: false,
                    toImageButtonOptions: {
                        format: 'svg', // one of png, svg, jpeg, webp
                        filename: 'custom_image',
                        height: 500,
                        width: 700,
                        scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                    }
                }}
            />
        </div>


    );
}