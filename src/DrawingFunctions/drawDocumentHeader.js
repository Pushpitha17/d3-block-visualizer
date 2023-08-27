const drawDocumentHeader = (
  textElement,
  text,
  x,
  y,
  width,
  height,
  dataEnabled = false
) => {
  textElement
    .attr("x", x + width / 2)
    .attr("y", y + height / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "black")
    .style("font-size", "1.5rem")
    .style("font", "Roboto", "Helvetica", "Arial")
    .style("display","block")

  if (dataEnabled) {
    textElement.style("font-size", "1rem")
  }

  textElement.text(`${text}`)
}

export default drawDocumentHeader
