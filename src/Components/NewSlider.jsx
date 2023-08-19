import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { marks, min, max, width_of_section } from "../Data/marks";
import { scale } from "../Helpers/sliderHelpers";
import { slide } from "../Logic/sliderSlice";
import "../css/slider.css";

function NewSlider() {
  const [unscaledVal, setUnscaledVal] = useState("0");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newVal = e.target.value;
    console.log(e);
    setUnscaledVal(newVal);
    dispatch(slide(parseInt(scale(parseInt(newVal), width_of_section, marks))));
  };

  useEffect(() => {
    const head = document.head || document.getElementsByTagName("head")[0];

    const generateCSs = (text, index) => {
      const stylesData = {
        selector: `.label-${index}`,
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

      return `${stylesData.selector}:${stylesData.pseduoClass}{${pseudoProperties}}\n`;
    };

    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    let cssText = "";

    for (let i = 0; i < marks.length; i++) {
      cssText += generateCSs(marks[i].lable_secondary, i);
    }

    console.log(cssText);

    styleElement.appendChild(document.createTextNode(cssText));
    head.appendChild(styleElement);
  }, []);

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        value={unscaledVal}
        onChange={handleChange}
        id="slider"
        list="temperature"
        step="1"
      />

      <datalist id="temperature">
        {marks.map((mark, index) => (
          <option
            value={mark.value}
            key={mark.value}
            label={mark.lable_primary}
            className={`label-${index}`}
          ></option>
        ))}
      </datalist>
    </div>
  );
}

export default NewSlider;
