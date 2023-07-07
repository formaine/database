import React, {useRef, useState, useEffect, setState} from "react";
import Plotly from "plotly.js"
import Select from 'react-select'

import createPlotlyComponent from 'react-plotly.js/factory';
import {useQuery} from "react-query";

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

export const PlotEIA = ({
                                 barColorInput,
                                 onClick
                             }) => {



    const dataChartNode = useRef();

    const options = [
        { value: 'NG.N3035ME3.A' , label:'Natural Gas'},
        { value: 'ELEC.PRICE.ME-IND.Q', label:  'Electricity'}
    ];

    const initialFormState = { mySelectKey: "ELEC.PRICE.ME-IND.Q" };
    const [myForm, setMyForm] = useState(initialFormState);

    const initialLabelState = { mySelectLabel: "Electricity" };
    const [myLabel, setMyLabel] = useState(initialLabelState);

    const updateForm = (value, label) => {
        setMyForm({ ...myForm, mySelectKey: value });
        setMyLabel({ ...myLabel, mySelectLabel: label });
    };

    const getMaine = () => fetch(`https://api.eia.gov/series/?api_key=2227d28e3508a5f8ab4744b1bd3517a2&series_id=${myForm.mySelectKey}`);
    const getNE = () => fetch('https://api.eia.gov/series/?api_key=2227d28e3508a5f8ab4744b1bd3517a2&series_id=ELEC.PRICE.NEW-IND.Q');

    function getFavorites() {
        return Promise.all([getMaine(), getNE()])
            .then(responses => {
                return Promise.all(
                    responses.map(response => {
                        return response.json();
                    })
                );
            })
            .then(data => data);
    }

    const { data } = useQuery(`${myForm.mySelectKey}`, getFavorites);



    const [stateX, setStateX] = React.useState([])
    const [stateX2, setStateX2] = React.useState([])


    React.useEffect(() => {

        if (!data) {
        } else {
            const [ME, NE] = data;


            if (data) {

                //Reverse required for EIA data with YYYYQ# System
                setStateX(ME.series[0].data.map(x => x[1]).reverse())
                setStateX2(NE.series[0].data.map(x => x[1]).reverse())


            }
        }
    }, [data])



    const [stateY, setStateY] = React.useState([])
    const [stateY2, setStateY2] = React.useState([])

    React.useEffect(() => {
            if (!data) {
            } else {
                const [ME, NE] = data;

                if (data) {

                    //Reverse required for EIA data with YYYYQ# System
                    setStateY(ME.series[0].data.map(x => x[0]).reverse())
                    setStateY2(NE.series[0].data.map(x => x[0]).reverse())


                }
            }
    }, [data])


    const chartData = [
        {
            x: stateY,
            y: stateX,
            type: 'line',
            name: 'Maine',
            marker: {color: 'rgb(26, 64, 55)'},
            showlegend: true,
            xaxis: "Average retail price of electricity",
            yaxis: "cents per kilowatthour"
        },
        {
            x: stateY2,
            y: stateX2,
            type: 'line',
            name: 'New England',
            marker: {color: 'rgb(59, 157, 60)'},
            showlegend: true,
            xaxis: "Average retail price of electricity",
            yaxis: "cents per kilowatthour"
        }
    ];



    return (


    <div className={"plotEIA"} >

           <div className={"toggleContainer"}  style={{width: '75vw'}}
           >
               <Select
                   className={"toggleEIA"}
                   styles={customStyles}
                   name="mySelect"
                   value={options.filter(({ value }) => value === myForm.mySelectKey)}
                   getOptionLabel={({ label }) => label}
                   getOptionValue={({ value }) => value}
                   onChange={({ value, label }) => updateForm(value, label)
                   }
                   options={options}
               />
           </div>


        <Plot
            style={{height: '75vh', right: 0}}
            ref={dataChartNode}
            data={chartData}
            layout={{
                autosize: true,
                title: `Average Industrial Delivered Price of ${myLabel.mySelectLabel}`,
                legend: {
                    orientation: "v"
                },
                yaxis: {
                    title: "Cents per Kilowatthour",
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
/*
            onClick={onClick}
*/
        />
        </div>


    );
}