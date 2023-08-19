const scale = (value, width_of_section, marks) => {
  const previousMarkIndex = Math.floor(value / width_of_section);
  const previousMark = marks[previousMarkIndex];
  const remainder = value % width_of_section;
  if (remainder === 0) {
    return previousMark.scaledValue;
  }
  const nextMark = marks[previousMarkIndex + 1];
  const increment =
    (nextMark.scaledValue - previousMark.scaledValue) / width_of_section;
  return remainder * increment + previousMark.scaledValue;
};

function FormatNumber(num) {
  return parseInt(num);
}

export { scale, FormatNumber };
