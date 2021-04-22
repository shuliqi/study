function once(fn) {
  let done = false;
  return () => {
    if (!done) {
      fn.apply(null, arguments);
      done = true;
    }
  }
}
function test() {
  console.log('1111');
}
const myTest = once(test);
myTest();
myTest();
myTest();
myTest();
myTest();
myTest();