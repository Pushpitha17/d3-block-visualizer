function wrapText(element, width) {
  let words = element.text().split(/\s+/).reverse()
  let word
  let line = []
  let lineNumber = 0
  let lineHeight = 0.9 // ems
  let y = element.attr("y")
  // let dy = parseFloat(element.attr("dy"))
  let dy = 10
  let tspan = element
    .text(null)
    .append("tspan")
    .attr("x", width / 2)
    .attr("y", y)
    // .attr("dy", dy + "em")
  while ((word = words.pop())) {
    line.push(word)
    tspan.text(line.join(" "))
    if (tspan.node().getComputedTextLength() > width) {
      // this part plays big role
      line.pop()
      tspan.text(line.join(" "))
      line = [word]
      // tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      tspan = element
        .append("tspan")
        .attr("x", width / 2)
        .attr("y", y + lineHeight * lineNumber)
        // .attr("dy", lineHeight + dy + "em")
        .text(word)

      lineNumber += 1
    }
  }
  element.attr("y", -(((lineNumber - 1) / 2) * lineHeight) + "em")
}

export default wrapText
