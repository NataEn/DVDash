

// const combineObjects = (objList, combineKey, diffKey) => {
//   const combinedList = [];
//   for (let i = 0; i < objList.length; i++) {
//     //filter objects based on common value
//     const commonVal = objList[i][combineKey];
//     const commonObjs = objList.filter((obj) => obj[combineKey] === commonVal);
//     //combine all objects to one
//     const combinedObj = {};
//     combinedObj[combinedObj] = commonVal;
//     for (let j = 0; j < commonObjs.length; j++) {
//       const diffVal = commonObjs[diffKey];
//       for (let key in commonObjs[i]) {
//         combinedObj[`${diffVal}_${key}`] = commonObjs[i][key];
//       }
//     }
//     combinedList.push(combinedObj);
//   }

//   return combinedList;
// };
//combines an obj to an accummulative obj according to common key-val pair

const combineObj = (identifierVal, identifierKey, uiqueId, accuObj, obj) => {
  if (obj[identifierKey] === identifierVal) {
    for (const [key, val] of Object.entries(obj)) {
      if (key !== identifierKey) {
        accuObj[`${key}_${uiqueId}`] = val;
      }
    }
  }
  return accuObj;
};
const get_vals_of_common_key = (objectsList, commonKey) => {
  const commonKeyValPairs = [];
  for (let object of objectsList) {
    if (!commonKeyValPairs.includes(object[commonKey])) {
      commonKeyValPairs.push(object[commonKey]);
    }
  }
  return commonKeyValPairs;
};
const combine_objects_list = (list, commonKey, diffKey) => {
  const commonVals = get_vals_of_common_key(list, commonKey);
  const new_combined_list = [];
  for (let commonVal of commonVals) {
    const accumulative_obj = {};
    for (let obj of list) {
      const newObj = combineObj(
        commonVal,
        commonKey,
        obj[diffKey],
        accumulative_obj,
        obj
      );
    }
    accumulative_obj[commonKey] = commonVal;
    new_combined_list.push(accumulative_obj);
  }
  return new_combined_list;
};

// const sampleList = [
//   { a: "1234", b: 1, c: "aaa" },
//   { a: "1234", b: 2, c: "bbbb" },
//   { a: "567", b: 1, c: "ccc" },
//   { a: "567", b: 2, c: "dddd" },
// ];

// combined_objects_list(sampleList, "a", "b");
module.exports{
  combine_objects_list
}