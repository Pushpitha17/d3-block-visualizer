import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import styled from "@emotion/styled";
import { marks, min, max, width_of_section } from "../Data/marks";
import { slide } from "../Logic/sliderSlice";
import { useDispatch, useSelector } from "react-redux";
import calHeaderValue from "../Helpers/CalheaderValue";



const CustomSlider = styled(Slider)({
  ".MuiSlider-thumb": {
    width: "30px",
    height: "30px",
    margin: "0 0",
    border: "5px solid rgb(67, 158, 242)",
    borderRadius: "50%",
    background: "#ecf0f1",
    cursor: "pointer",
  },
  ".MuiSlider-markLabel": {
    textAlign: 'center',
    transform: "translate(-90%, 30px ) rotate(-30deg)",
  },
  ".MuiSlider-mark": {
    backgroundColor: "black",
    opacity: 0.3,
    height: "16px",
    width: "1.5px",
    transform: "translate(0, 20% )",
  },
});

const scale = (value) => {
  const previousMarkIndex = Math.floor(value / width_of_section);
  const previousMark = marks[previousMarkIndex];
  const remainder = value % width_of_section;
  if (remainder === 0) {
    return previousMark.scaledValue;
  }
  const nextMark = marks[previousMarkIndex + 1];
  const increment =
    (nextMark.scaledValue - previousMark.scaledValue) / width_of_section;
  // console.log( {value : remainder * increment + previousMark.scaledValue, previous :previousMark.scaledValue, remainder, increment})
  return remainder * increment + previousMark.scaledValue;
};

function FormatNumber(num) {
  return calHeaderValue(parseInt(num));
}

function SliderComponent() {
  const [unscaledVal, setUnscaledVal] = useState(0);
  const dataEnabled = useSelector((state) => state.switch.dataEnabled);
  const width = useSelector((state) => state.svg.width);

  const dispatch = useDispatch()

  useEffect(() => {
    const head = document.head || document.getElementsByTagName("head")[0];

    const generateCSs = (text, index) => {
      const stylesData = {
        selector: `#slider .MuiSlider-markLabel:nth-child(${4 + index*2})`,
        pseduoClass: "after",
        pseudoProperties: {
          "white-space": "pre-wrap",
          "font-size": "0.8em",
          content: `"${String(text)}"`,
          display: "block",
          width: "20ch",
          "text-align": "center",
        },
      };

      const pseudoProperties = Object.entries(stylesData.pseudoProperties)
        .map(([prop, value]) => `${prop}:${value}`)
        .join(";");

      return `${stylesData.selector}::${stylesData.pseduoClass}{${pseudoProperties}}\n`;
    };

    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    let cssText = "";

    for (let i = 0; i < marks.length; i++) {
      cssText += generateCSs(marks[i].lable_secondary, i);
    }

    //fix alignment of last label
    cssText += `#slider .MuiSlider-markLabel:nth-child(${2 + marks.length*2})::after{ width : 100%}`

    styleElement.appendChild(document.createTextNode(cssText));
    head.appendChild(styleElement);
  }, []);

  const handleChange = (e, newVal) => {
    setUnscaledVal(newVal);
    dispatch(slide(parseInt(scale(newVal))))
  };

  return (
    <CustomSlider
      aria-label="Always visible"
      id="slider"
      defaultValue={0}
      value={unscaledVal}
      onChange={handleChange}
      step={1}
      min={min}
      max={max}
      marks={marks}
      scale={scale}
      disabled={dataEnabled}
      valueLabelDisplay="on"
      valueLabelFormat={FormatNumber}
      sx={{
        width : `${width}px`
      }}
    />
  );
}

export default SliderComponent;
