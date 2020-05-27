import { func } from "prop-types";

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
const isFunction = (variable) => typeof variable === "function";
class MyPromise {
  custructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("参数必须是一个函数");
    }
    // 添加Promise的状态;
    this._status = PENDING;
    // 添加Promise的值
    this._value = undefined;
    // 添加成功回调函数的队列
    this_fulfilledQueues = [];
    //  添加失败回调函数队列
    this_rejectedQueues = [];
    // 执行handle函数;
    try {
      handle(this._resolve.bind(this), this._rejecte.bind(this));
    } catch (error) {
      this._rejecte(error);
    }
  }
  // 添加resolve时的执行的函数
  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return;
      this._status = FULFILLED;
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while ((cb = this._fulfilledQueues.shift())) {
          cb(value);
        }
      };
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while ((cb = this._rejectedQueues.shift())) {
          cb(error);
        }
      };
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
      if (val instanceof MyPromise) {
        val.then(
          (value) => {
            this._value = value;
            runFulfilled(value);
          },
          (err) => {
            this._value = err;
            runRejected(err);
          }
        );
      } else {
        this._value = val;
        runFulfilled(val);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }

  // 添加reject时执行的函数
  _rejecte(val) {
    if (this._status === PENDING) {
      // 状态如果已经改变了， 就不会在改变了
      return;
    } else {
      // 依次执行失败队列中的函数，并清空队列
      const run = () => {
        thius._status = REJECTED;
        this._value = val;
        let cb;
        while ((cb = this_rejectedQueues.shifi())) {
          cb(val);
        }
      };
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(() => run(), 0);
    }
  }

  // 添加then方法
  then(onFulfilled, onRejected) {
    const { _value, _status } = this;
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = (value) => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };
      // 封装一个失败时执行的函数
      let rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }
}

const promise = new MyPromise((resolve, rejecte) => {
  setTimeout(resolve("shuliqi"), 1000);
});
promise.then(
  (value) => {
    console.log("1111", value);
  },
  rejected((err) => {
    console.log(err);
  })
);

function add(a, ...rest) {
  console.log(a); // 1
  console.log(Array.isArray(rest)); // true
  console.log(rest); // 2,3,4,5,6,7,8
}
add(1, 2, 3, 4, 5, 6, 7, 8);

console.log(...[1, 2, 3, 4, 5, 6, 7]); // 1 2 3 4 5 6 7
const setArr = new Set([1, 1, 2, 2, 3, 3, 4]);
console.log(setArr.add(9));
console.log(setArr.delete(1));
console.log(setArr.has(2));
setArr.clear();
console.log(setArr);

const obj = { name: "shuliqi" };
const mapObj = new Map();
mapObj.set(obj, "hahah");
mapObj.set({ name: "haha" }, 11111);
mapObj.get(obj);
mapObj.delete(obj);
mapObj.has({ name: "haha" });
mapObj.clear();

console.log(mapObj);

{
  // obj instanceof 构造函数：
  //  判断的原理： 判断一个对象在它的原型链上是否构造函数的原型（prototype）
  function myInstnaceof(A, B) {
    var O = B.prototype; // 构造函数的prototype
    var A = A.__proto__; // 对象的隐原型
    while (true) {
      if (A === null) {
        // 原型链的顶点
        return false;
      }
      if (A === O) {
        // 对象的原型链上存在构造函数的prototype
        return true;
      }
      A = A.__proto_; // 不染继续递归
    }
  }

  console.log(myInstnaceof([1, 2], Array));
  console.log(myInstnaceof({}, Object));
}

{
  const arr = [1, 2, 3];
  for (let value of arr) {
    console.log(value);
  }
}
{
  console.log(Object.prototype.toString.call([1, 2]));
}

const obj1 = {
  name: "shulii",
};
const obj2 = obj1;
obj2.name = "haha";
console.log(obj1 == obj2, obj1 === obj2); // true, true

var name = "The Window";

var object = {
  name: "My Object",

  getNameFunc: function () {
    return function () {
      return this.name;
    };
  },
};

console.log(object.getNameFunc()());
{
  /**
   * call方法思想：改变this指向，让新的对象可以执行这个方法
   * 实现思路：
   * 1、给新的对象添加一个函数（方法），并让this（也就是当前绑定的函数）指向这个函数
   * 2、执行这个函数
   * 3、执行完以后删除这个方法
   * 4、可以将执行结果返回
   */

  Function.prototype.myCall = function (thisObj, ...args) {
    if (typeof this !== "function") {
      throw new Error("错误");
    }
    thisObj.fn = this; // (this就是当前调用的函数)
    const result = thisObj.fn(...args); // 执行新加的函数
    delete thisObj.fn;
    return result;
  };
  const obj = {
    name: "shuliqi",
  };
  function getPerosion(age) {
    console.log(this.name, age);
  }
  getPerosion.myCall(obj, 12); // shuliqi 12
}

{
  Function.prototype.myApply = function (thisObj, args) {
    if (typeof this !== "function") {
      throw new Error("错误");
    }
    thisObj.fn = this; // (this就是当前调用的函数)
    let result;
    if (args) {
      result = thisObj.fn(args);
    } else {
      result = thisObj.fn(); // 执行新加的函数
    }
    delete thisObj.fn;
    return result;
  };
  const obj = {
    name: "shuliqi",
  };
  function getPerosion(ages) {
    console.log(this.name, ages);
  }
  getPerosion.myApply(obj, [12, 23]); // shuliqi 12
}
{
  Function.prototype.myCall = function (thisObj, args) {
    if (typeof this !== "function") {
      throw new Error("错误");
    }
    thisObj.fn = this; // (this就是当前调用的函数)
    let result;
    if (args) {
      result = thisObj.fn(args);
    } else {
      result = thisObj.fn();
    }
    delete thisObj.fn;
    return result;
  };
  const obj = {
    name: "shuliqi",
  };
  function getPerosion(age) {
    console.log(this.name, age);
  }
  getPerosion.myCall(obj, [12, 13]); // shuliqi [ 12, 13 ]
}

{
  Function.prototype.myBind = function (thisArg, ...args1) {
    console.log(args1);
    if (typeof this !== "function") {
      throw new Error("错误");
    }
    const _this = this;
    return function F(...args2) {
      // 看是否是调用构造函数
      if (this instanceof F) {
        return _this(...args1, ...args2);
      } else {
        return _this.apply(thisArg, args1.concat(args2));
      }
    };
  };
  const obj = {
    name: "shuliqi",
  };
  function getPerosion(age1, age2) {
    console.log(this.name, age1, age2);
  }
  const shu = getPerosion.myBind(obj, 12, 13); // shuliqi [ 12, 13 ]
}
{
  Function.prototype.myBind = function (thisObj, ...args1) {
    if (typeof this !== "function") {
      throw new Error("错误");
    }
    const _this = this;
    return function F(...args2) {
      // 如果是构造函数
      if (this instanceof F) {
        return _this(...args1, ...args2);
      } else {
        return _this.apply(thisObj, args1.concat(args2));
      }
    };
  };
  const obj = {
    name: "shuliqi",
  };
  function getPerosion(age1, age2) {
    console.log(this.name, age1, age2);
  }
  const shu = getPerosion.myBind(obj, 12, 13); // shuliqi [ 12, 13 ]
  shu();
}

{
  function curry(fn, args = []) {
    return function () {
      const rest = [...arguments, ...args];
      if (rest.length < fn.length) {
        return curry.call(this, fn, rest);
      } else {
        return fn.apply(fn, rest);
      }
    };
  }
  function add(x, y, z) {
    console.log(x + y + z);
  }
  const curryAdd = curry(add);
  console.log(curryAdd(1)(2)(3));
}

{
  function debounce(fn, wait, immediate = true) {
    let args, context, timer;
    var later = () =>
      setTimeout(() => {
        //  延迟值执行函数
        timer = null;
        if (!immediate) {
          // 执行
          fn.apply(context, args);
          context = args = null;
        }
      }, wait);
    return function () {
      if (!timer) {
        // 首次进入
        timer = later();
        if (immediate) {
          fn.apply(this, arguments);
        } else {
          context = this;
          args = arguments;
        }
      } else {
        clearTimeout(timer);
        timer = later();
      }
    };
  }
  function handle() {
    console.log(111);
  }
  window.addEventListener("resize", debounce(handle, 1000, false));
}
{
  function throttle(fn, wait) {
    let args, context;
    let previous = 0;
    return function () {
      const now = new Date().getTime();
      if (!previous) {
        previous = now;
      } else {
        context = this;
        args = arguments;
        const remaining = wait - (now - previous);
        if (remaining <= 0) {
          fn.apply(context, args);
          previous = now;
          args = context = null;
        }
      }
    };
  }
  function handle() {
    console.log(111);
  }
  window.addEventListener("resize", throttle(handle, 2000, false));
}

{
  // 冒泡排序： 比较相邻的数， 大的数和小的数进行交换未知
  function bubbleSort(a) {
    const len = a.length;
    for (let i = len - 1; i > 0; i--) {
      for (let j = 1; j <= len; j++) {
        if (a[j - 1] > a[j]) {
          const temp = a[j - 1];
          a[j - 1] = a[j];
          a[j] = temp;
        }
      }
    }
    return a;
  }
  console.log(bubbleSort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}

{
  // 快排序: 随机取一个数，然后根据这个基数分为左右两个数组， 依次递归快拍
  function quickSort(a) {
    if (a.length <= 1) {
      return a;
    } else {
      var leftArr = [];
      var rightArr = [];
      var base = a[0];
      for (let i = 1, len = a.length; i < len; i++) {
        if (a[i] >= base) {
          rightArr.push(a[i]);
        } else {
          leftArr.push(a[i]);
        }
      }
      return quickSort(leftArr).concat(base, quickSort(rightArr));
    }
  }
  console.log(quickSort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}

{
  function mergeSort(a) {
    if (a.length <= 1) {
      return a;
    } else {
      var mid = Math.ceil(a.length / 2);
      var leftArr = a.slice(0, mid);
      var rightArr = a.slice(mid);
      return merge(mergeSort(leftArr), mergeSort(rightArr));
    }
  }
  function merge(leftArr, rightArr) {
    const result = [];
    while (leftArr.length > 0 && rightArr.length > 0) {
      if (leftArr[0] < rightArr[0]) {
        result.push(leftArr.shift());
      } else {
        result.push(rightArr.shift());
      }
    }
    return result.concat(leftArr, rightArr);
  }

  console.log(mergeSort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}
{
  // 插入排序， 默认第一项是排好了的数
  function insertSort(a) {
    const len = a.length;
    for (let i = 1; i < len; i++) {
      const key = a[i];
      let j = i - 1;
      while (j >= 0) {
        if (a[j] > key) {
          a[j + 1] = a[j];
        } else {
          break;
        }
        j--;
      }
      a[j + 1] = key;
    }
    return a;
  }
  console.log(insertSort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}

{
  // 选择排序
  function selectSort(a) {
    const len = a.length;
    for (let i = 0; i < len; i++) {
      let min = a[i];
      let index = i;
      for (let j = i + 1; j < len; j++) {
        if (a[j] < min) {
          min = a[j];
          index = j;
        }
      }
      if (index !== i) {
        const temp = a[i];
        a[i] = a[index];
        a[index] = temp;
      }
    }
    return a;
  }
  console.log(selectSort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}

function curry(fn, args = []) {
  return function () {
    const rest = [...args, ...arguments];
    if (rest.length < fn.length) {
      return curry.call(this, fn, rest);
    } else {
      return fn.apply(fn, rest);
    }
  };
}
const add = function (x, y) {
  return x + y;
};
console.log(curry(add)(1)(2));

function loop(n) {
  if (n < 1) {
    return false;
  }

  setTimeout(() => {
    loop.call(null, n - 1);
  }, 1000);
  console.log(n);
}
loop(3);

// var a = 10;
// function f() {
//   var b = 20;
//   console.log(b + this.a);
// }
// function f1() {
//   var a = -6;
//   console.log(a + this.a);
//   f.call(this);
// }
// f1.call({ a: 150 });
// Function.prototype.myCall = function(obj) {
//     const addfn = symbol();
//     const myObj[addfn]  = this;
//     myObj.addFn();
//     delete myObj.addFn;
// };

// var test = {
//   name: 'test',
// };

// var test1 = {
//   name: 'test1',
//   fn: function() {
//     console.log(this.name);·
//   },
// };

// test1.fn.myCall(test);

// // flatten([[-1], 1,[2], [3,4, 7, [7]]])   //  [-1, 1, 2, 3, 4, 7, 7]
// function flatten(arr) {
//   let result = [];

//   for (let i = 0; i < arr.length; i++) {
//     result = result.concat(Array.isArray(arr[i]) ? flatten(arr[i]) : arr[i]);
//   }

//   return result;
// }
// console.log(flatten([[-1], 1, [2], [3, 4, 7, [7]]]));

// {
//   function flatten(arr) {
//     const result = [];
//     // for (let index = 0; index < array.length; index++) {
//     //     const element = array[index];

//     // }
//     while (arr.some((item) => Array.isArray(item))) {
//       result.push(item.split());
//     }
//     // return arr.reduce((old, new) => {
//     //     return old.concat(Array.isArray(new) ? )
//     // })
//     return;
//   }
//   console.log(flatten([[-1], 1, [2], [3, 4, 7, [7]]]));
// }

// {
//   function flatten(arr) {
//     const result = [];
//     let stack = arr.slice(0);
//     while (stack.length > 0) {
//       const last = stack.pop();
//       if (Array.isArray(last)) {
//         stack = stack.concat(last);
//       } else {
//         result.unshift(last);
//       }
//     }
//     return result;
//   }
// }

{
  function f() {
    setTimeout(() => {
      console.log(1);
    });

    new Promise((resolve, reject) => {
      console.log(2);
      resolve(3);
    }).then((data) => {
      console.log(data);
    });

    setTimeout(() => {
      console.log(4);
    });
    console.log(5);
  }
  f();
  // 2 5 3 1 4
}

{
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
  // 2 10 1 3 6 4 7 8 9
}

{
  function f() {
    setTimeout(() => {
      console.log(5);
      Promise.resolve().then(() => {
        console.log(6);
      });
    });

    new Promise((resolve, reject) => {
      console.log(1);
      resolve(1);
    }).then(() => {
      console.log(2);
      Promise.resolve().then(() => {
        console.log(3);
      });
      setTimeout(() => {
        console.log(4);
      });
      Promise.resolve().then(() => {
        console.log(7);
      });
    });
  }
  f();
  // 1 2 3 7  5 6 4
}

{
  // 实现instance_of
  // function A() {}
  // var a = new A()
  // instance_of(a, A) // true
  // instance_of(A, Object) // true
  // function B() {}
  // instance_of(a, B) // false

  // a instanceof A
  // a.__proto__ === A.prototype
  function instance_of(a, A) {
    const APrototype = A.prototype;
    let aProto = a.__proto__;
    while (aProto) {
      if (aProto === null) {
        return false;
      }
      if (aProto === APrototype) {
        return true;
      }
      aProto = aProto.__proto__;
    }
  }
}

// tried
//

{
  function componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);

    setTimeout((_) => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
    }, 0);
  }
}

{
  function unique(arr) {
    const result = [];
    arr.forEach((a) => {
      if (!result.includes(a)) {
        result.push(a);
      }
    });
    return result;
  }
  console.log(unique([1, "1", 2, 3, 3, 5, 5, 6, 6])); // [ 1, '1', 2, 3, 5, 6 ]
}

{
  function unique(arr) {
    const map = new Map();
    return arr.filter((item) => {
      if (!map.has(item)) {
        return map.set(item, 1);
      }
    });
  }
  console.log(unique([1, "1", 2, 3, 3, 5, 5, 6, 6])); // [ 1, '1', 2, 3, 5, 6 ]
}

// 实现 n!
function A(n) {
  if (n === 1) {
    return 1;
  }

  return n * A(n - 1);
}

function phone(str) {
  const phoneStr = "" + str;
  const phoneArr = phoneStr.split("");
  phoneArr.splice(3, 4, "****").join("");
  return phoneArr.join("");
}
console.log(phone(17885251632));

{
  Function.prototype.myCall = function (thisObj, ...args) {
    if (typeof this !== "function") {
      throw Error("调用的必须是一个函数");
    }
    const addFn = Symbol();
    thisObj[addFn] = this;
    thisObj[addFn](...args);
    delete thisObj[addFn];
  };
  const obj = {
    name: "shuliqi",
  };
  function test(age) {
    console.log(this.name, age);
  }
  test.myCall(obj, "122");
}

{
  Function.prototype.myApply = function (thisObj, args) {
    if (typeof this !== "function") {
      throw Error("调用的必须是一个函数");
    }
    const addFn = Symbol();
    thisObj[addFn] = this;
    thisObj[addFn](args);
    delete thisObj[addFn];
  };
  const obj = {
    name: "shuliqi",
  };
  function test(age) {
    console.log(this.name, age);
  }
  test.myApply(obj, [111, 123]);
}

{
  Function.prototype.myBind = function (thisObj, ...args1) {
    if (typeof this !== "function") {
      throw Error("调用的应该是一个函数");
    }
    const _this = this;
    function Fn() {}
    Fn.prototype = this.prototype;
    let bound = function (...args2) {
      _this.apply(this instanceof Fn ? this : thisObj, args1.concat(args2));
    };
    bound.prototype = new Fn();
    return bound;
  };
  const obj = {
    name: "shuliqi",
  };
  function test(name) {
    console.log("my is name:", this.name);
    this.age = 12;
    this.getPerson = function () {
      console.log(name, this.age);
    };
  }
  const newTest = test.myBind(obj, "shuliqi");
  newTest(); // my is test
  const myNewTest = new newTest();
  myNewTest.getPerson(); // shuliqi 12
}

const ajax = function (method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        if (xhr.status === 404) {
          return reject(xhr.status);
        }
      }
    };
    xhr.open(method, url);
    xhr.send(data);
  });
};

{
  const obj = {
    name: "shuliqi",
    age: 12,
  };
  Object.defineProperty(obj, "name", {
    get() {
      console.log("get");
    },
    set() {
      console.log("set");
    },
  });
  obj.name = "ahah ";
  console.log(obj.name);
}
{
  const obj = { name: "shuliqi" };
  const proxy = new Proxy(obj, {
    get(target, key, proxy) {
      console.log(target, key);
    },
    set(target, key, value, proxy) {
      console.log(target, key, value);
    },
  });
  proxy.name = "hahah";
  console.log(proxy.name);
}

{
  const person = function () {
    name = "shuliqi";
  };
  const myPerson = new person();
  console.log(myPerson.name);
}

{
  //  数组去重
  function unique(arr) {
    return [...new Set(arr)];
  }
  console.log(unique([1, 1, "1", 2]));
}
{
  //  数组去重
  function unique(arr) {
    const map = new Map();
    return arr.filter((a) => {
      if (!map.has(a)) {
        return map.set(a, "1");
      }
    });
  }
  console.log(unique([1, 1, "1", 2]));
}

{
  // 数组展开
  function flatArr(arr) {
    return arr.flat(Infinity);
  }
  console.log(flatArr([1, 2, [3, [4, 5]], 6, [7, 8, [9]]]));
}

{
  // 数组展开
  function flatArr(arr) {
    let result = [];
    arr.forEach((a) => {
      if (Array.isArray(a)) {
        result = result.concat(flatArr(a));
      } else {
        result = result.concat(a);
      }
    });
    return result;
  }
  console.log(flatArr([1, 2, [3, [4, 5]], 6, [7, 8, [9]]]));
}

{
  {
    // 数组展开
    function flatArr(arr) {
      while (arr.some((a) => Array.isArray(a))) {
        arr = [].concat(...arr);
      }
      return arr;
    }
    console.log(flatArr([1, 2, [3, [4, 5]], 6, [7, 8, [9]]]));
  }
}

{
  {
    // 数组展开
    function flatArr(arr) {
      return arr.reduce((pre, next) => {
        return pre.concat(Array.isArray(next) ? flatArr(next) : next);
      }, []);
    }
    console.log(flatArr([1, 2, [3, [4, 5]], 6, [7, 8, [9]]]));
  }
}
const once = function (fn) {
  let once = false;
  return () => {
    if (!once) {
      once = true;
      fn.call(null);
    }
  };
};
const test = function () {
  console.log("aaa");
};
const shu = once(test);
shu();
shu();

{
  function sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("我完成了");
      }, time);
    });
  }
  sleep(1000).then((data) => {
    console.log(data);
  });
}
{
  {
    function sleep(time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
    }
  }
  async function test() {
    await sleep(1000);
    console.log("完成了");
  }
  test();
}

{
  function* sleep(time) {
    yield new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }
  sleep(1000)
    .next()
    .value.then(() => {
      console.log("我完好吃呢个了");
    });
}

console.log("1");
setTimeout(function () {
  console.log("2");
});
console.log("3");

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

{
  function f() {
    setTimeout(() => {
      console.log(5);
      Promise.resolve().then(() => {
        console.log(6);
      });
    });

    new Promise((resolve, reject) => {
      console.log(1);
      resolve(1);
    }).then(() => {
      console.log(2);
      Promise.resolve().then(() => {
        console.log(3);
      });
      setTimeout(() => {
        console.log(4);
      });
      Promise.resolve().then(() => {
        console.log(7);
      });
    });
  }
  f();
}
