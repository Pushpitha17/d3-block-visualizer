import { Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { calColsAndRows, CalX, CalY } from "../Helpers/CalculatePositions";
import { useSelector } from "react-redux";

function Documents() {
  const sliderValue = useSelector((state) => state.slider.sliderValue);
  const ref = useRef(null);

  const dataArray = Array.from(
    { length: sliderValue },
    (_, index) => index + 1
  );

  function updateArray(newNum, integerArray) {
    const previousNum = dataArray.length;
    if (newNum > previousNum) {
      for (let i = previousNum + 1; i <= newNum; i++) {
        integerArray.push(i);
      }
    } else if (newNum < previousNum) {
      const removeCount = previousNum - newNum;
      integerArray.splice(-removeCount);
    }
  }
  console.log(sliderValue);

  useEffect(() => {
    const generate = (sliderValue) => {
      const grey = "#505050";
      const colors = [
        "#ff0e14", // red
        "#2274A5", // black
        "#ff00fa", // pink
        "#00ff29", // Green
        "#01fcfc", // Teal
        "#ffff29", // Yellow
        "#0000f4", // Blue
      ];
      const barsPerColumn = 10;

      const col_break_points = [0, 10, 20, 90, 160, 250, 360, 490, 640, 810];
      const row_break_points = [0, 30, 60, 120, 200, 300, 420, 560, 720, 900];

      const container = d3.select("#svgContainer");

      const [totalCols, totalRows] = calColsAndRows(
        sliderValue,
        col_break_points,
        row_break_points
      );

      //parameters 
      const height = ref.current.clientHeight;
      const width = ref.current.clientWidth;

      const col_spacing = (width / totalCols) * 0.05;
      const space_multiplier = 1.5;
      const color_change_duration = 2500

      const rect_height = height / (totalRows * barsPerColumn);
      const rect_width =
        (width -
          (col_spacing * (totalCols - 1) +
            col_spacing * space_multiplier * Math.floor((totalCols - 1) / 3))) /
        totalCols;
      //

      updateArray(sliderValue, dataArray);
      const rectangles = container.selectAll(".item").data(dataArray);

      rectangles
        .attr("width", rect_width)
        .attr("height", rect_height * 0.9)
        .attr("x", (d, i) => {
          return CalX(
            i,
            rect_width,
            col_spacing,
            space_multiplier,
            col_break_points,
            row_break_points,
            barsPerColumn
          );
        })
        .attr("y", (d, i) => {
          return CalY(
            i,
            rect_height,
            rect_width,
            col_break_points,
            row_break_points,
            height,
            totalRows
          );
        });

      rectangles
        .enter()
        .append("rect")
        .attr("class", "item")
        .attr("x", (d, i) => {
          return CalX(
            i,
            rect_width,
            col_spacing,
            space_multiplier,
            col_break_points,
            row_break_points,
            barsPerColumn
          );
        })
        .attr("y", (d, i) => {
          return CalY(
            i,
            rect_height,
            rect_width,
            col_break_points,
            row_break_points,
            height,
            totalRows
          );
        })
        .attr("width", rect_width)
        .attr("height", rect_height * 0.9)
        .style("fill", () => {
          const rand = Math.floor(Math.random() * 100) + 1;
          if (rand <= 25) {
            return grey;
          } else {
            return colors[Math.floor((rand - 25) / 8)];
          }
        })
        .transition()
        .duration(color_change_duration)
        .style("fill", grey);

      rectangles.exit().remove();
    };

    generate(sliderValue);
  }, [sliderValue]);

  return (
    <div
      style={{
        width: "100%",
        margin: "20px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          borderRadius: "5%",
          width: "400px",
          height: "450px",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="h5" align="center">
            {sliderValue} Documents
          </Typography>
          <div
            style={{
              borderRadius: "5%",
              height: "90%",
              width: "100%",
            }}
          >
            <svg
              height={"100%"}
              width={"100%"}
              id="svgContainer"
              ref={ref}
            ></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
