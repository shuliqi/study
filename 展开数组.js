const arr = [1,[1,[2,3, [4,5]]]]

function flatArr(arr) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flatArr(item))
    } else {
      result.push(item)
    }
  })
  return result;
}
console.log(flatArr(arr))


function flatArr(arr) {
  while(arr.some((item) => Array.isArray(item))) {
    arr = [].concat(arr);
  }
  return arr
}
console.log(flatArr(arr))

function flatArr(arr) {
  return arr.flat(Infinity);
}
console.log(flatArr(arr))