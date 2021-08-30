```javascript

// js
console.log(1);
setTimeout(() => {
  console.log(2);
  Promise.resolve()
  .then((data) => {
    console.log(3);
  })
  .then((data) => {
    console.log(4)
  });
  Promise.reject()
  .catch((data) => {
    console.log(5);
  })
})

new Promise((resolve) => {
  resolve();
  console.log(6);
})
.then(() => {
  console.log(7);
  setTimeout(() => {
    console.log(8)
  })
})
.then(() => {
  console.log(9);
});
console.log(10);

// 1
// 6
// 10
// 7
// 9
// 2
// 3
// 5
// 4
// 8


// 闭包
for (var i = 1; i<5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i*1000);
}

//  每隔1s输出4个5
// 如何输出12345
for (var i=1; i<=5; i++){
  (function(j) {
    setTimeout(function(){
      console.log(j);
      },j*1000);
  })(i)
}
for (let i=1; i <= 5; i++){
  setTimeout(function(){
    console.log(i);
    },i*1000);
}



// 原型




// 计算机网络
// 说说 HTTP1.0/1.1/2.0 的区别?
// 如何理解UDP 和 TCP? 区别? 应用场景?
```

