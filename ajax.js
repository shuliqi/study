const { reject } = require("async");
const { resolve } = require("path");

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log('成功拿到数据：', this.responseText)
    } else {
      console.log('获取数据失败')
    }
  }
}
xhr.open('get', 'https://www.fastmock.site/mock/d867c364f89208a7672e9e9d0a822417/qixiao/getFileDetail', true);
xhr.send(null);
// readyState的状态值得意思：
// 0: 表示为初始化，为调用open方法
// 1: 为调用send()方法
// 2： 调用了send（）方式，但是还没有相应
// 3: 接受部分数据
// 4: 已接收到全部的一个响应



// 使用promise 封装 ajax

const ajax = function(method, url, type, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 ){
        if (xhr.status === 200 ) {
          resolve(this.responseText)
        } else {
          reject(status)
        }
      }
    }
    xhr.open(method, url, type);
    xhr.send(data)
  })
}
ajax('get', 'https://www.fastmock.site/mock/d867c364f89208a7672e9e9d0a822417/qixiao/getFileDetail', true, null)
.then((responseText) => {
  console.log('成功拿到值', responseText)
})
.catch((err) => {
  console.log(err)
})



const XMR = new XMLHttpRequest();
XMR.onreadystatechange = function() {
  if (XMR.readyState === 4) {
    if (XMR.status === 200) {
      console.log("请求成功",XMR.responseText)
    } else {
      console.log("请求失败", XMR.error)
    }
  }
}
XMR.open('get',  'https://www.fastmock.site/mock/d867c364f89208a7672e9e9d0a822417/qixiao/getFileDetail', true);
XMR.send(null);

//readyState = 0 表示初始化， 还没调用open
// 1 表示调用了 open 但是还没调用send
// 2 表示调用了send 但是还没返回数据
// 3 接收到部分相应
// 4 接受到全部的响应


const ajax = (methods, url, type, data) => {
  return new Promise((resolve, reject) => {
    const XMR = new XMLHttpRequest();
    XMR.onreadystatechange = function() {
      if (XMR.readyState === 4) {
        if (XMR.status === 200) {
          resolve(XMR.responseText)
        } else {
          reject(XMR.status)
        }
      }
    }
    XMR.open(methods,  url, type);
    XMR.send(data);
  })
}
ajax('get', 'https://www.fastmock.site/mock/d867c364f89208a7672e9e9d0a822417/qixiao/getFileDetail', true, null)
.then((data) => {
  console.log(data);
})



const obj = {
  name: "shuliqi"
}
Object.defineProperty(obj,'name', {
  configurable: true, // 是否可通过delete 删除
  enumerable: true, // 是否可枚举
  get: function () {
    console.log("获取我");
    return "asds"
  }, 
  set: function(newValue) {
    console.log("设置值", newValue)
  }
})

console.log(obj.name)


const obj = {
  name: "shuliqi",
  age: 12
}

function People(sex) {
  this.sex = sex;
}
const proxy = new Proxy(People, {
  apply(fun, context, args) {
    console.log("----", fun, context, args);
  }
});
const shu = proxy.call(obj,"女");
console.log(shu)


const a = [1,2,3];
const proxy = new Proxy(a, {
  set(target, key, value) {
      console.log(key);
  }
});
proxy.splice(0,1);
console.log(proxy)



const a = [1, "1", 2, 3, 3, 5, 5, 6, 6];
const s = 'aaadddss'
const unique = [...new Set(s)];
console.log(unique);


let set = new Set(["1234", '12432', 32134]);
for( let key of set.keys()) {
  console.log(key)
}

for(let value of set.values()) {
  console.log(value);
}

for(let item of set.entries()) {
  console.log(item);
}

const ws = new WeakSet([1]);

const a = {};
const ws = new WeakSet(a);


const map = new Map();
map.set(function () {
  
}, "sjhi");
map.set("shu", 12);
console.log(map.size)


map.forEach((item) => {
  console.log(item)
})


// for(let key of  map.keys()) {
//   console.log(key);
// }
for(let key of  map.values()) {
  console.log(key);
}




function unocp(arr) {
  // return [...new Set(arr)]
  // return Array.from(new Set(arr));
  const result  = [];
  for(let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}
const a = [1, "1", 2, 3, 3, 5, 5, 6, 6];
console.log(unocp(a));


function name(arr) {
  // return arr.flat(Infinity)  

  let  result = [];
  for(let i = 0; i <  arr.length; i++ ) {
    if (Array.isArray(arr[i])) {
      result = result.concat(name(arr[i]));
    } else {
      result.push(arr[i])
    }
  }
  return result;
}
const a = [1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14];
console.log(name(a));


function once(fn) {
  let isOnce = true;
  return function () {
    if (isOnce) {
      fn.apply(null);
      isOnce = false;
    }
  }
}
function test() {
  console.log('111');
}
const onceTest = once(test);
onceTest();
onceTest();
onceTest();
onceTest();


// sleep(1000)

function sleep(time) {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log("111")
  //     resolve();
  //   }, time);
  // })
  setTimeout(() => {
      console.log("1111")
  }, time);
}

async function name(params) {
  await sleep(1000);
  console.log("22")
}
name();


function* sleep(time) {
  yield  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("111");
      resolve()
    }, time)
  })
}
sleep(100000).next().value.then(() => {
  console.log("执行完了")
})


async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0);
async1()
new Promise(resolve => {
    console.log('promise1')
    resolve()
  })
  .then(() => {
    console.log('promise2')
  })
console.log('script end')








