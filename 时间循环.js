console.log("1");
setTimeout(function() {
   console.log('2')
});
console.log('3');

// 1 3 2



process.nextTick(function () {
  console.log("1");
});

new Promise(function (resolve) {
  console.log("2");
  resolve();
}).then(function () {
  console.log("3");
  setTimeout(function () {
    console.log("4");
  });
});

new Promise(function (resolve) {
  setTimeout(function () {
    console.log("6");
  });
  resolve();
}).then(function () {
  setTimeout(function () {
    console.log("7");
    new Promise(function (resolve) {
      setTimeout(function () {
        console.log("8");
      });
      resolve(); 
    }).then(function () {
      setTimeout(function () {
        console.log("9");
      });
    });
  });
});
console.log("10");
// 同步宏任务： 2 10 
// 异步微任务： 1 
// 异步宏任务： 3 6 4 7 8 9







console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');


// script start 
// script end
// promise1
// promise2
// setTimeout
