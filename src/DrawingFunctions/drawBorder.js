const drawBorder = (
  svg,
  height,
  x_block_start,
  blocks_container_width,
  dataEnabled
) => {
  const br = 15 //border raidus
  const p = 20 //padding

  const start = x_block_start
  const end = x_block_start + blocks_container_width

  console.log({ start, end,height })

  const leftBorderPath = `M${start},${0} A${br} ${br} 0 0,0 ${
    start - p
  },${br}  V${height - br} A${br} ${br} 0 0,0 ${start},${height}`
  const rightBorderPath = `M${end},${0} A${br} ${br} 0 0,1 ${end + p},${br}  V${
    height - br
  } A${br} ${br} 0 0,1 ${end},${height}`

  const topBorderPath = `M${start - br},${height * 0.1 + br} A${br} ${br} 0 0,1 ${
    start
  },${height * 0.1}  H${end} A${br} ${br} 0 0,1 ${end + br},${height * 0.1 + br}`

  const bottomBorderPath = `M${start - br},${height - br} A${br} ${br} 0 0,0 ${
    start
  },${height}  H${end} A${br} ${br} 0 0,0 ${end + br},${height - br}`

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
