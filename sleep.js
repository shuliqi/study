function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  })
}
sleep(1000)
.then(() => {
  console.log('saaa')
})







function sleep(time) {
  setTimeout(() => {}, time);
}
async function test() {
  await sleep(1000);
  console.log('111')
}

test()




function* sleep(time) {
  yield setTimeout(() => {
    
  }, time);
}

sleep(1000)
.next();
console.log('111')
