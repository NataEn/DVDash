//first version to combine two objects
//  const combinedObj = objList.reduce((acc, curr) => {
//     if (acc[combineKey] === curr[combineKey]) {
//       const diffValAcc = curr[diffKey];
//       const diffValCurr = acc[diffKey];
//       for (let [key, value] of Object.entries(curr)) {
//         if (key !== combineKey) {
//           acc[`${diffValAcc}_${key}`] = acc[key];
//           acc[`${diffValCurr}_${key}`] = curr[key];
//         }
//       }
//     }
//     return acc;
//   });

const combineObjects = (objList, combineKey, diffKey) => {
  const combinedList = [];
  for (let i = 0; i < objList.length; i++) {
    //filter objects based on common value
    const commonVal = objList[i][combineKey];
    const commonObjs = objList.filter((obj) => obj[combineKey] === commonVal);
    //combine all objects to one
    const combinedObj = {};
    combinedObj[combinedObj] = commonVal;
    for (let j = 0; j < commonObjs.length; j++) {
      const diffVal = commonObjs[diffKey];
      for (let key in commonObjs[i]) {
        combinedObj[`${diffVal}_${key}`] = commonObjs[i][key];
      }
    }
    combinedList.push(combinedObj);
  }

  return combinedList;
};
