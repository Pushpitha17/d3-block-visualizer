import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
import { setWidth } from "../Logic/svgSlice";
import drawDocumentHeader from "../DrawingFunctions/drawDocumentHeader";
import updateDataArray from "../Helpers/updateDataArray";
import drawBlocks from "../DrawingFunctions/drawBlocks";
import { grey, colors, barsPerColumn, col_break_points, row_break_points, space_multiplier, color_change_duration, textboxHeight } from "../Data/blockParams";
import { calColsAndRows } from "../Helpers/CalculatePositions";
import { Box, Typography } from "@mui/material";
import DataSwitch from "./DataSwitch";
import drawBlockRight from "../DrawingFunctions/drawBlockRight";
import drawBorderRight from "../DrawingFunctions/drawBorderRight";
import determineColor from "../Helpers/determineColor";
import calculateRadius from "../Helpers/calculateRadius";
import generateArcPath from "../Helpers/generateAnimationArc";
import _ from 'lodash';
import drawSquare from "../DrawingFunctions/drawSquare";
import calHeaderValue from "../Helpers/CalheaderValue";
import drawTextBoxLeft from "../DrawingFunctions/drawTextBoxLeft";
import drawTextBoxRight from "../DrawingFunctions/drawTextBoxRight";
import drawMainBlockBorder from "../DrawingFunctions/drawMainBlockBorder";

function AnimationArea() {

  const sliderValue = useSelector((state) => state.slider.sliderValue);
  const dataEnabled = useSelector((state) => state.switch.dataEnabled);
  const svgWidth = useSelector((state) => state.svg.width);
  const ref = useRef(null);
  const dispatch = useDispatch()


  const header_height = 26
  const header_height_sm = 21
  const header_padding = 16

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

  const [mainCordinates, setMainCordinates] = useState({
    height: null,
    blocks_container_height: null,
    blocks_container_width: null,
    x_block_start: null,
    y_block_start: null,
    scaled_x_block_start: null,
    scaled_y_block_start: null
  })

  const calWidth = (element) => {
    if (element) {
      const width = element.clientHeight * 16 / 9
      if (width > 880) {
        element.style.width = `${width}px`
        dispatch(setWidth(width))
      } else {
        element.style.width = `880px`
        dispatch(setWidth(880))
      }
    }
  }

  useEffect(() => {
    calWidth(ref.current)
  }, [])


  useEffect(() => {


    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;
    const container = d3.select("#svgContainer1");

    let blocks_container_height, blocks_container_width, x_block_start, y_block_start, scaled_x_block_start, scaled_y_block_start

    if (!dataEnabled) {
      blocks_container_height = height * 0.8
      blocks_container_width = blocks_container_height * (5 / 7)

      x_block_start = parseInt((width - blocks_container_width) / 2)
      y_block_start = (height - blocks_container_height) / 2 + header_height
      let headerElement = container.select("#header")

      drawDocumentHeader(headerElement, `${calHeaderValue(sliderValue)} Documents`, x_block_start, y_block_start - header_height - header_padding, blocks_container_width, header_height)
      setMainCordinates({
        height, width, blocks_container_height, blocks_container_width, x_block_start, y_block_start, scaled_x_block_start, scaled_y_block_start
      })
    } else {
      blocks_container_height = height * 0.65
      blocks_container_width = blocks_container_height * (5 / 7)

      x_block_start = 30
      y_block_start = (height - blocks_container_height) / 2 + 50

      let headerElement = container.select("#header")
      drawDocumentHeader(headerElement, `${calHeaderValue(sliderValue)} Documents`, x_block_start, y_block_start - header_height_sm - header_padding, blocks_container_width, header_height_sm / 2, dataEnabled)

      scaled_x_block_start = width - (blocks_container_width + 30)
      scaled_y_block_start = y_block_start
      setMainCordinates({
        height, width, blocks_container_height, blocks_container_width, x_block_start, y_block_start, scaled_x_block_start, scaled_y_block_start
      })
    }


    drawMainBlockBorder(container, x_block_start, y_block_start, blocks_container_width, blocks_container_height, header_height, header_padding, dataEnabled)

    setDataArray(prevState => updateDataArray(sliderValue, prevState))

  }, [sliderValue, dataEnabled])


  useEffect(() => {

    const { height, blocks_container_height, blocks_container_width, x_block_start, y_block_start, scaled_x_block_start, scaled_y_block_start, width } = mainCordinates
    const container = d3.select("#svgContainer1");
    container.select("#text_box_left").style("display", "block")
    container.select("#text_box_right").style("display", "block")

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

    const textBoxLeft = container.select("#text_box_left")
    const textBoxRight = container.select("#text_box_right")

    drawTextBoxLeft(textBoxLeft, width, x_block_start, height, blocks_container_width, textboxHeight)
    drawTextBoxRight(textBoxRight, width, height, x_block_start, blocks_container_width, textboxHeight)


    //scaled block
    if (dataEnabled) {

      container.select("#text_box_left").style("display", "none")
      container.select("#text_box_right").style("display", "none")
      container.select("#border_right").style("display", "block")
      const squaresContainer = d3.select("#squares");

      //make 15% opacity
      container.selectAll(".item").style("opacity", "0.15")
      squaresContainer.style("display", "block");


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
      drawBorderRight(container, scaled_x_block_start, scaled_y_block_start, blocks_container_width, blocks_container_height, header_height, header_padding / 2, dataEnabled)

      let headerElement = container.select("#header_right")
      drawDocumentHeader(headerElement, "2.5% Original Size", scaled_x_block_start, scaled_y_block_start - header_height_sm - header_padding, blocks_container_width, header_height_sm, dataEnabled)

      const squareAnimation = async () => {

        while (true) {

          const colors = _.map(dataBlockRight, 'color')
          const uniqColors = _.uniq(colors)
          const randomColor = uniqColors[Math.floor(Math.random() * uniqColors.length)]

          const square = drawSquare(squaresContainer, x_block_start, y_block_start, blocks_container_height, blocks_container_width, randomColor)

          const matchingIndices = []

          dataBlockRight.forEach((d, i) => {
            if (randomColor == d.color) {
              matchingIndices.push(i + 1)
            }
          })
          const randomIndex = matchingIndices[Math.floor(Math.random() * matchingIndices.length)];

          addAnimation(square, `r-${randomIndex}`, height, x_block_start, y_block_start)

          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      const runAnimateFunctions = async () => {
        for (let i = 0; i < 2; i++) {
          squareAnimation()
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      runAnimateFunctions()

    } else {
      drawBlockRight(container, [], scaled_x_block_start, scaled_y_block_start, blocks_container_height, totalRows, rect_width, rect_height, col_break_points, row_break_points, barsPerColumn, col_spacing, space_multiplier, grey, colors, color_change_duration, true)
      container.select("#header_right").style("display", "none")
      container.select("#border_right").style("display", "none")
      container.selectAll(".item").style("opacity", "1")
      d3.select("#squares").style("display", "none");
    }

  }, [dataArray])


  const addAnimation = (element, targetID, height) => {

    const target = d3.select(`[id="${targetID}"]`)
    const container = d3.select("#squares");


    const element_width = element.node().getBBox().width
    const element_height = element.node().getBBox().height

    const start_x = +element.attr("x")
    const start_y = +element.attr("y")
    const end_x = +target.attr("x") + element_width / 2
    const end_y = +target.attr("y") + element_height / 2

    // console.log({ start_x, x: +element.attr("x"), width: element.node().getBBox().width })

    const chordLength = end_x - start_x
    const radius = calculateRadius(chordLength)

    const pathData = generateArcPath(start_x, start_y, end_x, end_y, radius, height)

    const path = container.append("path")
      .attr("class", `square-animationpath`)
      .attr("d", pathData)
      .attr("fill", "none")
      .attr("stroke", "none");

    const pathLength = path.node().getTotalLength();

    const animate = () => {
      element
        .style("transition-timing-function", "linear")
        .transition()
        .duration(2500)
        .delay(500)
        .attrTween("transform", function () {
          return function (t) {
            const point = path.node().getPointAtLength(t * pathLength);
            return `translate(${(point.x - start_x)},${(point.y - start_y)})`;
          };
        })
        .remove()
    }

    animate()
  }


  console.log({ mainCordinates })

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          maxHeight: '800px',
          margin: '0 auto'
        }}
      >

        <div ref={ref} style={{
          position: 'relative', height: "100%",
          width: "100%",
        }}>
          <svg
            style={{
              height: "100%",
              width: `${svgWidth}px`,
            }}
            id="svgContainer1"
          >
            <rect id="block_border"></rect>
            <text id="header"></text>
            <g id="text_box_left">
              <rect id="rect_left"></rect>
              <text id="text_left"></text>
              <svg xmlns="http://www.w3.org/2000/svg" id="warning_sign" viewBox="0 0 148.749 130.48">
                <g id="_4737783_notice_sign_warning_alert" data-name="4737783_notice_sign_warning_alert" transform="translate(-8.017 -9.925)">
                  <path id="Path_77" data-name="Path 77" d="M77.119,12.949,8.895,131.1a6.188,6.188,0,0,0,5.272,9.3h136.45a6.188,6.188,0,0,0,5.272-9.3L87.663,12.949A6.108,6.108,0,0,0,77.119,12.949Z" transform="translate(0 0)" fill="#db6500" />
                  <circle id="Ellipse_8" data-name="Ellipse 8" cx="6.202" cy="6.202" r="6.202" transform="translate(76.189 112.495)" fill="#fff" />
                  <g id="Group_82" data-name="Group 82" transform="translate(73.945 53.5)">
                    <path id="Path_78" data-name="Path 78" d="M34,73.667,29.349,33.353A8.425,8.425,0,1,1,46.1,31.492v1.861L41.444,73.667a3.993,3.993,0,0,1-4.031,3.411A4.3,4.3,0,0,1,34,73.667Z" transform="translate(-29.276 -23.976)" fill="#fff" />
                  </g>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" id="arrow_1" viewBox="0 0 49 292">
                <defs>
                  <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#cbcbcb" />
                    <stop offset="1" stop-color="#a0a0a0" />
                  </linearGradient>
                </defs>
                <path id="Polygon_1" data-name="Polygon 1" d="M146,0,292,49H0Z" transform="translate(49) rotate(90)" fill="url(#linear-gradient)" />
              </svg>
            </g>
            <g id="text_box_right">
              <rect id="rect_right"></rect>
              <text id="text_right_1"></text>
              <text id="text_right_2"></text>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" id="arrow_2" viewBox="0 0 49 292">
                <defs>
                  <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#cbcbcb" />
                    <stop offset="1" stop-color="#a0a0a0" />
                  </linearGradient>
                </defs>
                <path id="Polygon_1" data-name="Polygon 1" d="M146,0,292,49H0Z" transform="translate(49) rotate(90)" fill="url(#linear-gradient)" />
              </svg>
            </g>
            <g id="squares"></g>
            <rect id="border_right"></rect>
            <text id="header_right"></text>
            <path id="border1"></path>
            <path id="border2"></path>
          </svg>
          {!dataEnabled && <Box sx={{
            maxWidth: (mainCordinates.x_block_start - 20) * 0.6,
            height: textboxHeight / 2,
            p: "10px",
            position: 'absolute',
            display: 'flex',
            alignItems: 'top',
            top: (mainCordinates.height - textboxHeight) / 2
          }}>
            <Typography
              sx={{
                wordBreak: "break-word",
                overflow: 'hidden'
              }}

            >The more documents and data, the more opportunities for duplicate, out-dated information, and AI failure.</Typography>
          </Box>}
          {!dataEnabled && <Box sx={{
            maxWidth: (mainCordinates.x_block_start - 20) * 0.6,
            height: 190,
            p: "10px",
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            top: (mainCordinates.height - textboxHeight) / 2,
            left: (mainCordinates.width - ((mainCordinates.x_block_start - 20) * 0.65)),
          }}>
            <Typography
              sx={{
                wordBreak: "break-word",
                overflow: 'hidden',
                flex: "0 0 auto"
              }}

            >Over time, your documents and content will become outdated. Training your AI on outdated information creates business risk.</Typography>
            <Box sx={{ flex: "1 0 0", display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  maxWidth: (mainCordinates.x_block_start - 20) * 0.65,
                  fontSize: '0.7rem',
                  wordBreak: "break-word",
                  overflow: 'hidden',
                }}

              >Click to see how we solved the problem.</Typography>
            </Box>

          </Box>}

          <Box sx={{
            position: 'absolute',
            transformOrigin: "center center",
            right: dataEnabled ? (svgWidth / 2 - 75) : (mainCordinates.x_block_start - 20) * 0.65 / 2 - 75,
            top: dataEnabled ? '20px' : (mainCordinates.height - (textboxHeight)) / 2 + textboxHeight * 0.75,
            width: '150px',
          }}>
            <DataSwitch />
          </Box>
        </div></div>


    </div>

  )
}

export default AnimationArea