import { CalX, CalY } from "../Helpers/CalculatePositions"

const drawBlockRight = (
  svg,
  dataArray,
  x_start,
  y_start,
  height,
  totalRows,
  rect_width,
  rect_height,
  col_break_points,
  row_break_points,
  barsPerColumn,
  col_spacing,
  space_multiplier,
  grey,
  colors,
  color_change_duration,
) => {

  let rectangles = svg.selectAll(".r-item").data(dataArray)


  rectangles
    .attr("width", rect_width)
    .attr("height", rect_height * 0.9)
    .attr("x", (d, i) => {
      return CalX(
        i,
        x_start,
        rect_width,
        col_spacing,
        space_multiplier,
        col_break_points,
        row_break_points,
        barsPerColumn
      )
    })
    .attr("y", (d, i) => {
      return CalY(
        i,
        y_start,
        rect_height,
        col_break_points,
        row_break_points,
        height,
        totalRows
      )
    })

  rectangles
    .enter()
    .append("rect")
    .attr("class", "r-item")
    .attr("x", (d, i) => {
      return CalX(
        i,
        x_start,
        rect_width,
        col_spacing,
        space_multiplier,
        col_break_points,
        row_break_points,
        barsPerColumn
      )
    })
    .attr("y", (d, i) => {
      return CalY(
        i,
        y_start,
        rect_height,
        col_break_points,
        row_break_points,
        height,
        totalRows
      )
    })
    .attr("width", rect_width)
    .attr("height", rect_height * 0.9)
    .style("fill", (d) => d.color)
    .attr("id", (d) => `r-${d.i}`)
    // .transition()
    // .duration(color_change_duration)
    // .style("fill", grey)

  rectangles.exit().remove()
}

export default drawBlockRight
