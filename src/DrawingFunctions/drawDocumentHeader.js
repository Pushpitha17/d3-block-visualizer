const drawDocumentHeader = (svg, value, x, y, width, height, dataEnabled = false) => {
  let headerElement = svg.select("#header")

  console.log({ value, x, y, width, height})

  headerElement
    .attr("x", x + width / 2)
    .attr("y", y + height / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "black")
    .style("font-size", "1.5rem")
    .style("font", "Roboto", "Helvetica", "Arial")
  
  if (dataEnabled) {
    headerElement.style("font-size", "1.2rem")
  }

  headerElement.text(`${value} Documents`)
}

export default drawDocumentHeader
