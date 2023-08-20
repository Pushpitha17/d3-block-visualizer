import { useEffect, useRef } from "react";
import * as d3 from "d3";
import drawBorder from "../DrawingFunctions/drawBorder";
import { useSelector } from "react-redux";
import drawDocumentHeader from "../DrawingFunctions/drawDocumentHeader";
import updateDataArray from "../Helpers/updateDataArray";
import drawBlocks from "../DrawingFunctions/drawBlocks";
import { grey, colors, barsPerColumn, col_break_points, row_break_points, space_multiplier, color_change_duration } from "../Data/blockParams";
import { calColsAndRows } from "../Helpers/CalculatePositions";
import { Box } from "@mui/material";
import DataSwitch from "./DataSwitch";

function AnimationArea() {

  const sliderValue = useSelector((state) => state.slider.sliderValue);
  const dataEnabled = useSelector((state) => state.switch.dataEnabled);
  const ref = useRef(null);

  const dataArray = Array.from(
    { length: sliderValue },
    (_, index) => index + 1
  );

  const setWidth = (element) => {
    if (element) {
      element.style.width = `${element.clientHeight * 2}px`
    }
  }

  // useEffect(() => {

  //   setWidth(ref.current)

  //   const height = ref.current.clientHeight;
  //   const width = ref.current.clientWidth;

  //   const container = d3.select("#svgContainer1");

  //   const blocks_container_height = height * 0.875
  //   const blocks_container_width = blocks_container_height * (5 / 7)

  //   const x_block_start = parseInt((width - blocks_container_width) / 2)

  // }, [])

  useEffect(() => {

    setWidth(ref.current)

    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    const container = d3.select("#svgContainer1");

    let blocks_container_height, blocks_container_width, x_block_start, y_block_start

    if (!dataEnabled) {
      blocks_container_height = height * 0.875
      blocks_container_width = blocks_container_height * (5 / 7)

      x_block_start = parseInt((width - blocks_container_width) / 2)
      y_block_start = height * 0.1

      drawDocumentHeader(container, sliderValue, x_block_start, 0, blocks_container_width, height * 0.1)
    } else {
      blocks_container_height = height * 0.9 * 0.875
      blocks_container_width = blocks_container_height * (5 / 7)

      x_block_start = 30
      y_block_start = (height * 0.1) + blocks_container_height * 0.1

      drawDocumentHeader(container, sliderValue, x_block_start, height * 0.1, blocks_container_width, blocks_container_height * 0.1, dataEnabled)
    }


    drawBorder(container, height, x_block_start, blocks_container_width, dataEnabled)

    console.log({ height, width, blocks_container_height, blocks_container_width })


    updateDataArray(sliderValue, dataArray);
    const [totalCols, totalRows] = calColsAndRows(
      sliderValue,
      col_break_points,
      row_break_points
    );

    const col_spacing = (blocks_container_width / totalCols) * 0.05;

    const rect_height = blocks_container_height / (totalRows * barsPerColumn);
    const rect_width =
      (blocks_container_width -
        (col_spacing * (totalCols - 1) +
          col_spacing * space_multiplier * Math.floor((totalCols - 1) / 3))) /
      totalCols;

    console.log({ x_block_start, y_block_start, rect_width, rect_height })
    drawBlocks(container, dataArray, x_block_start, y_block_start, blocks_container_height, totalRows, rect_width, rect_height, col_break_points, row_break_points, barsPerColumn, col_spacing, space_multiplier, grey, colors, color_change_duration)




  }, [sliderValue, dataEnabled])


  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div ref={ref} style={{ position: 'relative' }}>
        <svg
          style={{
            height: "100%",
            width: '100%',
          }}
          id="svgContainer1"
        >
          <text id="header"></text>
          <path id="border1"></path>
          <path id="border2"></path>
        </svg>
        <Box sx={{
          position: 'absolute',
          transformOrigin: "center center",
          right: dataEnabled ? '50%' : '50px',
          top: dataEnabled ? '0' : '48%',
          width: '100px',
        }}>
          <DataSwitch />
        </Box>
      </div>

    </div>

  )
}

export default AnimationArea