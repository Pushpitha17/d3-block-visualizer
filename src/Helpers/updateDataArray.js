function updateDataArray(newNum, integerArray) {
  const previousNum = integerArray.length;
  if (newNum > previousNum) {
    for (let i = previousNum + 1; i <= newNum; i++) {
      integerArray.push(i);
    }
  } else if (newNum < previousNum) {
    const removeCount = previousNum - newNum;
    integerArray.splice(-removeCount);
  }
}

export default updateDataArray