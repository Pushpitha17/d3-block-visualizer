import { Typography } from "@mui/material";
import React, { useEffect, useRef, useContext } from "react";
import * as d3 from "d3";
import { AppContext } from "../Context/AppContext";
import { calColsAndRows, CalX, CalY } from "../Helpers/CalculatePositions";

function Documents() {
  const { sliderValue } = useContext(AppContext);
  const ref = useRef(null);

  useEffect(() => {
    const generate = (sliderValue) => {
      const colors = [
        "#000", // black
        "#2274A5", // Blue
        "#4CAF50", // Green
        "#FFC107", // Yellow
        "#E74C3C", // Dark Red
        "#00A8E8", // Light Blue
        "#8E44AD", // Purple
        "#27AE60", // Bright Green
        "#F39C12", // Orange
        "#3498DB", // Royal Blue
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

      const height = ref.current.clientHeight;
      const width = ref.current.clientWidth;

      const rect_height = height / (totalRows * barsPerColumn);
      const rect_width = width / totalCols;

      const data = Array.from({ length: sliderValue }, (_, i) => i + 1);

      const rectangles = container.selectAll(".item").data(data);

      rectangles
        .enter()
        .append("rect")
        .merge(rectangles)
        .attr("class", "item")
        .attr("x", (d, i) => {
          return CalX(
            i,
            rect_width,
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
        .attr("width", rect_width * 0.95)
        .attr("height", rect_height * 0.9)
        .style("fill", (d, i) => colors[i % 10]);

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
          padding : '0 16px',
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
