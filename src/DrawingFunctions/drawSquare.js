const drawSquare = (
  svg,
  x_start,
  y_start,
  container_height,
  container_width,
  color
) => {
  const square_length = (container_height - y_start) / 12
  const x_end = x_start + container_width

  const square = svg
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
    .style("fill", color)

  return square
}

export default drawSquare
