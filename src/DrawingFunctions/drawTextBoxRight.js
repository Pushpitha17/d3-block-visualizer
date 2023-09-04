const drawTextBoxRight = (
  g,
  width,
  height,
  x_block_start,
  blocks_container_width,
  textboxHeight
) => {
  const rect = g.select("#rect_right")

  const arrow = g.select("#arrow_2")

  const textBox_width = (x_block_start - 20) * 0.65
  const textBox_height = textboxHeight

  const borderRadius = 8

  console.log({ g, width, x_block_start, height })

  rect
    .attr("width", textBox_width)
    .attr("height", textBox_height)
    .attr("x", width - textBox_width)

    .attr("y", (height - textBox_height) / 2)
    .style("fill", "none")
    .attr("rx", borderRadius) // rx attribute controls the x-axis radius
    .attr("ry", borderRadius)
    .style("stroke", "#439EFF") // Set the border color
    .style("stroke-width", 0.75) // Set the border width

  const arr_x =
    blocks_container_width / 2 + 20 + (x_block_start - 20 - textBox_width) / 2

  arrow
    .attr("height", textBox_height * 0.75)
    // .attr("x", -(x_block_start - textBox_width)/2)
    .attr("x", arr_x)
    .attr("y", (height - textBox_height) / 2 + (textBox_height * 0.25) / 2)
}

export default drawTextBoxRight
