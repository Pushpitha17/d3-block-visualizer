const calHeaderValue = (sliderValue) => {
  const marks = [0, 1000, 1900, 2800, 3800]
  const increment = [1, 10, 100, 900]

  let index = 0
  let value = 0

  for (let i = 1; i < marks.length; i++) {
    index = i - 1
    if (sliderValue - marks[i] <= 0) {
      break
    }
  }

  for (let j = 1; j < index + 1; j++) {
    value += (marks[j] - marks[j - 1]) * increment[j - 1]
  }

  value += (sliderValue - marks[index]) * increment[index]
  return value
}

export default calHeaderValue
