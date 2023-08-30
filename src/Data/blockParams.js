const grey = "#505050"

const colors = [
  "#ff0e14", // red
  "#2274A5", // black
  "#ff00fa", // pink
  "#00ff29", // Green
  "#01fcfc", // Teal
  "#ffff29", // Yellow
  "#0000f4", // Blue
]

const barsPerColumn = 10

const col_break_points = [0, 10, 20, 90, 160, 250, 360, 490, 640, 810, 1000]
const row_break_points = [0, 30, 60, 120, 200, 300, 420, 560, 720, 900, 1100]

const col_generate_point = 1000
const row_generate_point = 1100

let row_last_difference = 200
let col_last_difference = 190

let col_last_point = col_generate_point
let row_last_point = row_generate_point

for (let i = 1; i < 11; i++) {
  let col_next_point = col_last_point + col_last_difference + 20
  let row_next_point = row_last_point + row_last_difference + 20

  col_last_difference += 20
  row_last_difference += 20

  col_break_points.push(col_next_point)
  row_break_points.push(row_next_point)

  col_last_point = col_next_point
  row_last_point = row_next_point
}

const space_multiplier = 1.5
const color_change_duration = 10000

export {
  grey,
  colors,
  barsPerColumn,
  col_break_points,
  row_break_points,
  space_multiplier,
  color_change_duration,
}
