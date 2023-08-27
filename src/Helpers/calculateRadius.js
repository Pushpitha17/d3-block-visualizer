const calculateRadius = (chordLength, centralAngleInRadians = Math.PI / 4) => {
  return (chordLength) / (2 * Math.sin(centralAngleInRadians / 2));
}

export default calculateRadius