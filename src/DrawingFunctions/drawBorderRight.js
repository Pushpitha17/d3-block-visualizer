const drawBorderRight = (
  svg,
  height,
  x_block_start,
  blocks_container_width,
) => {
  const br = 15 //border raidus
  // const p = 20 //padding

  const start = x_block_start
  const end = x_block_start + blocks_container_width

  const fullBorder = `M ${start},${
    height * 0.1
  } H${end} A${br} ${br} 0 0 1 ${end + br},${height * 0.1 + br}  V${
    height - br
  } A ${br} ${br} 0 0 1  ${end},${
    height
  } H${start} A ${br} ${br} 0 0 1  ${start - br},${height - br} V${
    height * 0.1 + br
  } A ${br} ${br} 0 0 1 ${start},${height * 0.1}`

  let border_r = svg.select("#full-border")

  border_r
    .attr("d", fullBorder) // Set the path data
    .attr("fill", "rgba(100%, 100%, 100%, 0.6)")
    .attr("stroke", "black")
    .attr("stroke-width", 0.6)
    .style("display","block")

  return
}

export default drawBorderRight
