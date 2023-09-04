const drawBorderRight = (
  svg,
  x_block_start,
  y_block_start,
  blocks_container_width,
  blocks_container_height,
  header_height,
  header_padding,
  dataEnabled
) => {
  const br = 8 //border raidus
  const padding = 16 

  const rect = svg.select("#border_right") 

  if (dataEnabled) {
    rect.attr("display", "block")
    rect
      .attr("width", blocks_container_width + 2 * padding)
      .attr(
        "height",
        padding*2 + blocks_container_height + (header_height + header_padding)
      )
      .attr("x", x_block_start - padding)
      .attr("y", y_block_start - (header_height + header_padding + padding))
      .attr("fill", "rgba(100%, 100%, 100%, 0.6)")
      .attr("rx", br)
      .attr("ry", br)
      .style("stroke", "black")
      .style("stroke-width", 0.6)
  } else {
    rect.attr("display", "none")
  }

  // const fullBorder = `M ${start_x},${
  //   start_y + br
  // } H${end_x} A${br} ${br} 0 0 1 ${end_x + br},${height * 0.1 + br}  V${
  //   height - br
  // } A ${br} ${br} 0 0 1  ${end_x},${
  //   height
  // } H${start_x} A ${br} ${br} 0 0 1  ${start_x - br},${height - br} V${
  //   height * 0.1 + br
  // } A ${br} ${br} 0 0 1 ${start_x},${height * 0.1}`

  // let border_r = svg.select("#full-border")

  // border_r
  //   .attr("d", fullBorder) // Set the path data
  //   .attr("fill", "rgba(100%, 100%, 100%, 0.6)")
  //   .attr("stroke", "black")
  //   .attr("stroke-width", 0.6)
  //   .style("display","block")

  return
}

export default drawBorderRight
