const drawBorder = (
  svg,
  height,
  x_block_start,
  y_block_start,
  blocks_container_width,
  dataEnabled
) => {
  const br = 15 //border raidus
  const p = 20 //padding

  const start_x = x_block_start
  const end_x = x_block_start + blocks_container_width

  const start_y = y_block_start - (32 + p) //32 = text height
  const end_y = start_y - p + height

  const leftBorderPath = `M${start_x},${0} A${br} ${br} 0 0,0 ${
    start_x - p
  },${br}  V${height - br} A${br} ${br} 0 0,0 ${start_x},${height}`
  const rightBorderPath = `M${end_x},${0} A${br} ${br} 0 0,1 ${
    end_x + p
  },${br}  V${height - br} A${br} ${br} 0 0,1 ${end_x},${height}`

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

  let border_1 = svg.select("#border1")
  let border_2 = svg.select("#border2")

  let border1Path, border2Path

  if (dataEnabled) {
    border1Path = topBorderPath
    border2Path = bottomBorderPath
  } else {
    border1Path = leftBorderPath
    border2Path = rightBorderPath
  }

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

  return
}

export default drawBorder
