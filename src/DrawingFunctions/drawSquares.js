const drawSquares = (
  svg,
  dataArray,
  x_start,
  y_start,
  container_height,
  container_width
) => {
  const squares = svg.selectAll(".squares").data(dataArray)
  console.log({ dataArray, x_start, y_start })

  const square_length = (container_height - y_start) / 15
  const x_end = x_start + container_width

  squares
    .enter()
    .append("rect")
    .attr("class", "square")
    .attr("width", square_length)
    .attr("height", square_length)
    .attr(
      "x",
      () => x_start + Math.random() * (x_end - x_start - square_length)
    )
    .attr(
      "y",
      () => y_start + Math.random() * (container_height - square_length)
    )
    .style("fill", (d) => d.color)
    .attr("id", (d) => `square-${d.i}`)
}

export default drawSquares
