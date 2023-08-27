import { colors, grey } from "../Data/blockParams"

const determineColor = () => {
  const rand = Math.floor(Math.random() * 100) + 1
  if (rand <= 25) {
    return grey
  } else {
    return colors[Math.floor((rand - 25) / (75 / colors.length+1))]
  }
}

export default determineColor
