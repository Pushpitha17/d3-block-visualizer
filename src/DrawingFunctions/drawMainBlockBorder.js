const drawMainBlockBorder = (
  svg,
  x_block_start,
  y_block_start,
  blocks_container_width,
  blocks_container_height,
  header_height,
  header_padding,
  dataEnabled
) => {
  const rect = svg.select("#block_border")
  const border_1 = svg.select("#border1")
  const border_2 = svg.select("#border2")
  let padding = 20

  let br = 8

  if (!dataEnabled) {
    rect.attr("display", "block")
    border_1.attr("display", "none")
    border_2.attr("display", "none")

    rect
      .attr("width", blocks_container_width + 2 * padding)
      .attr(
        "height",
        blocks_container_height + header_height + header_padding + 2 * padding
      )
      .attr("x", x_block_start - padding)
      .attr("y", y_block_start - (header_height + padding + header_padding))
      .style("fill", "none")
      .attr("rx", br)
      .attr("ry", br)
      .style("stroke", "#439EFF")
      .style("stroke-width", 0.75)
  } else {
    padding = 16

    rect
      .attr("width", blocks_container_width + 2 * padding)
      .attr(
        "height",
        padding * 2 +
          blocks_container_height +
          (header_height + header_padding / 2)
      )
      .attr("x", x_block_start - padding)
      .attr("y", y_block_start - (header_height + header_padding / 2 + padding))
      .style("fill", "none")
      .attr("rx", br)
      .attr("ry", br)
      .style("stroke", "#439EFF")
      .style("stroke-width", 0.75)
  }
}

export default drawMainBlockBorder
