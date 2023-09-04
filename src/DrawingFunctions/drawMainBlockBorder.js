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
    rect.attr("display", "none")
    border_1.attr("display", "block")
    border_2.attr("display", "block")
  

    padding = 16

    const start_x = x_block_start
    const end_x = x_block_start + blocks_container_width

    const start_y = y_block_start - (header_height + header_padding + padding)
    const end_y = start_y + padding*2 + blocks_container_height + (header_height + header_padding)

    const topBorderPath = `M${start_x - br},${
      start_y + br
    } A${br} ${br} 0 0,1 ${start_x},${start_y}  H${end_x} A${br} ${br} 0 0,1 ${
      end_x + br
    },${start_y + br}`

    const bottomBorderPath = `M${start_x - br},${
      end_y - br
    } A${br} ${br} 0 0,0 ${start_x},${end_y}  H${end_x} A${br} ${br} 0 0,0 ${
      end_x + br
    },${end_y - br}`

    let border1Path = topBorderPath
    let border2Path = bottomBorderPath

    border_1
      .attr("d", border1Path) // Set the path data
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.6)

    border_2
      .attr("d", border2Path)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.6)
  }
}

export default drawMainBlockBorder
