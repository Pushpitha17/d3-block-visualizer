const calColsAndRows = (numofItems, col_break_points, row_break_points) => {
  function findBreakPoint(array, sliderValue) {
    let left = 0;
    let right = array.length - 1;

    const middle = Math.floor((left + right) / 2);

    if (array[middle] === sliderValue) {
      return middle;
    }

    while (left <= right) {
      if (array[left] < sliderValue) {
        left = left + 1;
      } else {
        right = right - 1;
      }
    }
    return left;
  }

  const numOfCols = findBreakPoint(col_break_points, numofItems);
  const numOfRows = findBreakPoint(row_break_points, numofItems);
  return [numOfCols, numOfRows];
};

const last_break_point = (item_num, col_break_points, row_break_points) => {
  const [col, row] = calColsAndRows(
    item_num,
    col_break_points,
    row_break_points
  );

  if (col_break_points[col - 1] == row_break_points[row - 1]) {
    return "Col";
  }

  return col_break_points[col - 1] < row_break_points[row - 1] ? "Row" : "Col";
};

const CalX = (
  i, //index
  rect_width,
  col_spacing,
  space_multiplier,
  col_break_points,
  row_break_points,
  barsPerColumn
) => {
  let x;
  i = i + 1;
  let [col, row] = calColsAndRows(i, col_break_points, row_break_points);

  if (last_break_point(i, col_break_points, row_break_points) == "Row") {
    col = Math.floor((i - 1 - row_break_points[row - 1]) / barsPerColumn) + 1;
  }

  x = rect_width * (col - 1);
  if (col > 1) {
    x =
      x +
      (col_spacing * (col - 1) +
        col_spacing * space_multiplier * Math.floor((col - 1) / 3));
  }

  return x;
};

const CalY = (
  i,
  rect_height,
  rect_width,
  col_break_points,
  row_break_points,
  height,
  totalRows
) => {
  i = i + 1;
  let y;
  const [col, row] = calColsAndRows(i, col_break_points, row_break_points);

  if (last_break_point(i, col_break_points, row_break_points) == "Row") {
    const y_at_col_start = (height / totalRows) * (row - 1);
    y = y_at_col_start + rect_height * ((i - 1) % 10);
  }

  if (last_break_point(i, col_break_points, row_break_points) == "Col") {
    y = rect_height * (i - col_break_points[col - 1] - 1);
  }

  y = y + rect_height * 0.05;
  return y;
};

export { CalX, CalY, calColsAndRows };
