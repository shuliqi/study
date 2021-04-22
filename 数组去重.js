
const arr = [1,1,2,2,3,3,5,6,7];


function unique(arr) {
  // return [... new Set(arr)]
  return Array.from(new Set(arr))
}
console.log(unique(arr))



function unique(arr) {
  const result = [];
  arr.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item)
    }
  })
  return result;
}
console.log(unique(arr))
// indexOF实现也是一样的


