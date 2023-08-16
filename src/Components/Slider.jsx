import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import styled from "@emotion/styled";
import { marks, min, max, width_of_section } from "../Data/marks";
import { slide } from "../Logic/sliderSlice";
import { useDispatch } from "react-redux";

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
  return remainder * increment + previousMark.scaledValue;
};

function FormatNumber(num) {
  return parseInt(num);
}

function SliderComponent() {
  const [unscaledVal, setUnscaledVal] = useState(0);

  const dispatch = useDispatch()

  useEffect(() => {
    const labels = document.querySelectorAll(".MuiSlider-markLabel");
    console.log(labels);
  }, []);

  const handleChange = (e, newVal) => {
    setUnscaledVal(newVal);
    dispatch(slide(parseInt(scale(newVal))))
  };

  return (
    <CustomSlider
      aria-label="Always visible"
      defaultValue={0}
      value={unscaledVal}
      onChange={handleChange}
      step={1}
      min={min}
      max={max}
      marks={marks}
      scale={scale}
      valueLabelDisplay="on"
      valueLabelFormat={FormatNumber}
    />
  );
}

export default SliderComponent;
