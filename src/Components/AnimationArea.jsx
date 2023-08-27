import { useDebugValue, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import drawBorder from "../DrawingFunctions/drawBorder";
import { useSelector } from "react-redux";
import drawDocumentHeader from "../DrawingFunctions/drawDocumentHeader";
import updateDataArray from "../Helpers/updateDataArray";
import drawBlocks from "../DrawingFunctions/drawBlocks";
import { grey, colors, barsPerColumn, col_break_points, row_break_points, space_multiplier, color_change_duration } from "../Data/blockParams";
import { calColsAndRows } from "../Helpers/CalculatePositions";
import { Box, duration } from "@mui/material";
import DataSwitch from "./DataSwitch";
import drawBlockRight from "../DrawingFunctions/drawBlockRight";
import drawBorderRight from "../DrawingFunctions/drawBorderRight";
import determineColor from "../Helpers/determineColor";
import calculateRadius from "../Helpers/calculateRadius";
import generateArcPath from "../Helpers/generateAnimationArc";
import _ from 'lodash';
import drawSquares from "../DrawingFunctions/drawSquares";

function AnimationArea() {

  const sliderValue = useSelector((state) => state.slider.sliderValue);
  const dataEnabled = useSelector((state) => state.switch.dataEnabled);
  const ref = useRef(null);

  const [dataArray, setDataArray] = useState(Array.from(
    { length: sliderValue },
    (_, index) => ({
      i: index + 1,
      color: determineColor()
    })
  ))

  const [dataBlockRight, setDataBlockRight] = useState(Array.from(
    { length: 10 },
    (_, index) => ({
      i: index + 1,
      color: determineColor()
    })
  ))

  const [squares, setSquares] = useState([])

  useEffect(() => {
    const colors = _.map(dataBlockRight, 'color')
    const uniqColors = _.uniq(colors)

    const num_of_squares = 50

    const objectArray = []

    for (let i = 1; i <= num_of_squares; i++) {

      const randomIndex = Math.floor(Math.random() * uniqColors.length);
      const obj = {
        i,
        color: uniqColors[randomIndex]
      }

      objectArray.push(obj);
    }

    setSquares(objectArray)

  }, [])

  console.log({ squares })


  const [mainCordinates, setMainCordinates] = useState({
    blocks_container_height: null,
    blocks_container_width: null,
    x_block_start: null,
    y_block_start: null,
    scaled_x_block_start: null,
    scaled_y_block_start: null
  })


  const setWidth = (element) => {
    if (element) {
      // element.style.width = `${element.clientHeight * 2}px`
      element.style.width = `95%`
    }
  }

  useEffect(() => {

    setWidth(ref.current)

    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    const container = d3.select("#svgContainer1");

    let blocks_container_height, blocks_container_width, x_block_start, y_block_start, scaled_x_block_start, scaled_y_block_start

    if (!dataEnabled) {
      blocks_container_height = height * 0.875
      blocks_container_width = blocks_container_height * (5 / 7)

      x_block_start = parseInt((width - blocks_container_width) / 2)
      y_block_start = height * 0.1

      let headerElement = container.select("#header")

      drawDocumentHeader(headerElement, `${sliderValue} Documentes`, x_block_start, 0, blocks_container_width, height * 0.1)
      setMainCordinates({
        height, width, blocks_container_height, blocks_container_width, x_block_start, y_block_start, scaled_x_block_start, scaled_y_block_start
      })
    } else {
      blocks_container_height = height * 0.9 * 0.875
      blocks_container_width = blocks_container_height * (5 / 7)

      x_block_start = 30
      y_block_start = (height * 0.1) + blocks_container_height * 0.1

      let headerElement = container.select("#header")
      drawDocumentHeader(headerElement, `${sliderValue} Documentes`, x_block_start, height * 0.1, blocks_container_width, blocks_container_height * 0.1, dataEnabled)

      scaled_x_block_start = width - (blocks_container_width + 30)
      scaled_y_block_start = y_block_start
      setMainCordinates({
        height, width, blocks_container_height, blocks_container_width, x_block_start, y_block_start, scaled_x_block_start, scaled_y_block_start
      })
    }


    drawBorder(container, height, x_block_start, blocks_container_width, dataEnabled)

    setDataArray(prevState => updateDataArray(sliderValue, prevState))

  }, [sliderValue, dataEnabled])


  useEffect(() => {

    const { height, blocks_container_height, blocks_container_width, x_block_start, y_block_start, scaled_x_block_start, scaled_y_block_start, width } = mainCordinates
    const container = d3.select("#svgContainer1");

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

    drawBlocks(container, dataArray, x_block_start, y_block_start, blocks_container_height, totalRows, rect_width, rect_height, col_break_points, row_break_points, barsPerColumn, col_spacing, space_multiplier, grey, colors, color_change_duration)

    //scaled block
    if (dataEnabled) {

      //make 15% opacity
      container.selectAll(".item").style("opacity", "0.15")

      const [totalCols, totalRows] = calColsAndRows(
        10,
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


      drawBlockRight(container, dataBlockRight, scaled_x_block_start, scaled_y_block_start, blocks_container_height, totalRows, rect_width, rect_height, col_break_points, row_break_points, barsPerColumn, col_spacing, space_multiplier, grey, colors, color_change_duration, true)
      drawBorderRight(container, height, scaled_x_block_start, blocks_container_width, dataEnabled, true)

      let headerElement = container.select("#header_right")
      drawDocumentHeader(headerElement, "2.5% Original Size", scaled_x_block_start, height * 0.1, blocks_container_width, blocks_container_height * 0.1, dataEnabled)


      drawSquares(container, squares, x_block_start, y_block_start, blocks_container_height, blocks_container_width)

      const triggerAnimation = async () => {
        for (const object of squares) {
          const color = object.color

          const matchingIndices = []

          dataBlockRight.forEach((d, i) => {
            if (d.color == color) {
              matchingIndices.push(i + 1)
            }
          })
          console.log(matchingIndices)
          const randomIndex = matchingIndices[Math.floor(Math.random() * matchingIndices.length)];

          addAnimation(object.i, `r-${randomIndex}`, height, x_block_start, y_block_start)
          await new Promise(resolve => setTimeout(resolve, 150));
        }
      }

      triggerAnimation()


    } else {
      drawBlockRight(container, [], scaled_x_block_start, scaled_y_block_start, blocks_container_height, totalRows, rect_width, rect_height, col_break_points, row_break_points, barsPerColumn, col_spacing, space_multiplier, grey, colors, color_change_duration, true)
      container.select("#header_right").style("display", "none")
      container.select("#full-border").style("display", "none")
      container.selectAll(".item").style("opacity", "1")
      container.selectAll(".square").remove();
    }

  }, [dataArray])



  const addAnimation = (elementID, targetID, height, x_block_start, y_block_start) => {

    const element = d3.select(`[id="square-${elementID}"]`)
    const target = d3.select(`[id="${targetID}"]`)

    const container = d3.select("#svgContainer1");

    const start_x = +element.attr("x")
    const start_y = +element.attr("y")
    const end_x = +target.attr("x") + 30
    const end_y = +target.attr("y") + 20


    const element_width = element.node().getBBox().width

    console.log({ start_x, x: +element.attr("x"), width: element.node().getBBox().width })

    const chordLength = end_x - start_x
    const radius = calculateRadius(chordLength)

    const pathData = generateArcPath(start_x, start_y, end_x, end_y, radius, height)

    const el = element.node().getBoundingClientRect();
    const svgOriginX = el.left;
    const svgOriginY = el.top;

    const transformX = start_x - svgOriginX
    const transfromY = start_y - svgOriginY
    console.log({ elementID, start_x, start_y, svgOriginX, svgOriginY })


    const path = container.append("path")
      .attr("id", `${elementID}-animationpath`)
      .attr("d", pathData)
      .attr("fill", "none")
      .attr("stroke", "none");

    const pathLength = path.node().getTotalLength();

    const animate = () => {
      element
        .style("transition-timing-function","linear")
        .transition()
        .duration(2000)
        .attrTween("transform", function () {
          return function (t) {
            const point = path.node().getPointAtLength(t * pathLength);
            console.log({ x: transformX + point.x, y: transfromY + point.y })
            return `translate(${transfromY + point.x - (start_x - x_block_start - 30 - element_width)},${transfromY + point.y - (start_y - y_block_start)})`;
          };
        })
        .remove()
    }

    animate()
  }

  useEffect(() => { })

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
          <text id="header_right"></text>
          <path id="border1"></path>
          <path id="border2"></path>
          <path id="full-border"></path>
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