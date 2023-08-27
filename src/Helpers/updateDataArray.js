import determineColor from "./determineColor";

// function updateDataArray(newNum, dataArray) {
//   const previousNum = dataArray.length;
//   if (newNum > previousNum) {
//     for (let i = previousNum + 1; i <= newNum; i++) {
//       dataArray.push({
//         i: i,
//         color : determineColor()
//       });
//     }
//   } else if (newNum < previousNum) {
//     const removeCount = previousNum - newNum;
//     dataArray.splice(-removeCount);
//   }
// }

function updateDataArray(newNum, dataArray) {
  const newArrray = dataArray
  const previousNum = dataArray.length;
  if (newNum > previousNum) {
    for (let i = previousNum + 1; i <= newNum; i++) {
      newArrray.push({
        i: i,
        color : determineColor()
      });
    }
  } else if (newNum < previousNum) {
    const removeCount = previousNum - newNum;
    newArrray.splice(-removeCount);
  }
  return [...newArrray]
}

export default updateDataArray