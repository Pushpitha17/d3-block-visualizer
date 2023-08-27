const generateArcPath = (start_x, start_y, end_x, end_y, radius, height) => {
  let direction = 0

  if (start_y > height / 2) {
    direction = 1
  }

  let path = `M${start_x},${start_y} A${radius} ${radius} 0 0,${direction} ${end_x},${end_y}`

  return path
}

export default generateArcPath
