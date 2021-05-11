// typeof 判断基本数据类型:都可以判断， 除了null 意外
typeof(undefined) // "undefined"
typeof("shuliqi") // "string"
typeof(false) // "boolean"
typeof(12) // "number"
typeof(Symbol()) // "symbol"
typeof(null)  // "object"

// typeof 判断复杂数据类型: 不能判断复杂数据类型， 除了typeof 函数是 “function”之外， 其他的都是返回“object”
typeof(Array())  // "object"
typeof(new Date()) //  "object"
typeof({}) // "object"
typeof(function() {}) // "function"

// instanceof 是用来检车一个对象在它的原型链上是有一个构造函数的prototype属性
// object instanceof constructor
// 参数：object(要检测的对象)， constructor（某个构造函数）

// 1.如果通过 字面量 的方式创建字符串，那么无法通过 instanceof 判断某个变量是否是字符串
let str2 = 'aaaa'
console.log(str2 instanceof String) // false
console.log(str2 instanceof Object) // false

// 2. 通过 new 方式，是可以使用 instanceof 判断 变量是否是字符串。
let str1 = new String('aaa')
console.log(str1 instanceof String) // true
console.log(str1 instanceof Object) // true
console.log(str1.__proto__ === String.prototype) // true
// 3. 复杂数据类型
const date = new Date();
console.log(date instanceof Date) // // true

const obj1 = new Object({ shu: 'asa' });
console.log(obj1 instanceof Object)  // true
const obj2 = { age: 12 };
console.log(obj2 instanceof Object) // true
const myFun1 = new Function();
console.log(myFun1 instanceof Function) //  true
const myFun2 = function() {};
console.log(myFun2 instanceof Function) //  true

// instanceof 的实现原理, A instanceof B
function instanceOf(A, B) {
    const O = B.prototype; // 取 B 的显性原型
    let A  = A.__proto__; // 取 A 的隐形原型
    while(true) {
        if(A === null) { //已经找到顶层
            return false;
        }
        if (A === O ) { //当 O 严格等于 L 时，返回 true
            return true;
        } 
        A = A.__proto__; //继续向上一层原型链查找
    }
}

// for...of
{
  let arr = ["shuliqi","name"];
  for (let item of arr) {
    console.log(item); // "shuliqi","name" 遍历的是属性值
  }
  arr.age = 12;
  for (let item of arr) {
    console.log(item); // "shuliqi","name"  输出的是属性值(age不是数字索引，不会被遍历)
  }
  for (let item of arr) {
    if (item === "name") {
      break;
    }
    console.log(item); // 最后只返回了“shuliqi”， 表示可以中断循环
  }
  let obj = { name: 'shu', age: 12};
  try{
    for (const item of obj) {
      console.log(item);   
      // Uncaught TypeError: obj is not iterable, 抛错，因为普通对象没有 Iterator 接口
    }
  }catch(e) {
    console.log(e);
  }
  const str = 'shu';
  for(let item of str) {
    console.log(item); // "s", "h", "u" // 表明可以遍历字符串
  }
}

// for ..in
{
  let arr = ['shu', "li", 12];
  for(let key in arr) {
    console.log(key); // 0， 1， 2 遍历的属性名
  }
  arr.foo = 1000;
  for(let key in arr) {
    console.log(key); // 0， 1， 2, foo 遍历的属性名
  }

  let arr = ['shu', "li", 12];
  for(let key in arr) {
    if (key === 2) {
      break;
    }
    console.log(key); // 0， 1， 2 遍历的属性名 , 表示可以中断循环
  }
  //  注意:(因为for in 可以遍历自身和继承的属性名，所以hasOwnProperty 是用来判断一个属性名是否是自身的属性)
  let object = { name:"shu", age: 12 };
  for (const key in object) {
    console.log(key); // name, age
  }
}

// forEach 
{
  let arr = ["shu", "li"];
  const result = arr.forEach((item, index) => {
    console.log(item, index); //  shu ，0 li, 1
    item = item + 1;
  });
  console.log(result, arr); // undefined ,  arr = ["shu", "li"];
  // 表明没有改变原数组除非我们手动操作改变数组， 没有返回值。

  arr.forEach((item, index) => {
    console.log(item, index);   //  shu ，0 li, 1, 表明不能中断循环
    if (index === 1) {
      return;
    }
  })
}

// map
{
  const arr = ["shu", 'li'];
  const result = arr.map((item, index) => {
    return item + 'haha';
  });
  console.log(arr, result); // ["shu", "li"], ["shuhaha", "lihaha"]
  // 说明： 愿数组没有改变，返回改变之后的数组
}

// Object.keys()
{
  const arr = ["shu", "li"];
  const result = Object.keys(arr);
  console.log(result); // ["0", "1"]

  const obj = {
    name: "shuliqi",
    age: 12,
  }
  const result2 = Object.keys(obj);
  console.log(result2); //  ["name", "age"]
}

{
  const arr = ['shu', 'li'];
  console.log(Array.isArray(arr)); // true
  console.log(arr instanceof Array); // true
  console.log(Object.prototype.toString.call(arr) === "[object Array]"); // true
  console.log(arr.constructor === Array) // true 
  // constructor  不是很准确， 因为有时候我们可以设置一个对象的constructor属性
  const obj = {};
  console.log(obj.constructor === Array); // false
  obj.constructor = Array;
  console.log(obj.constructor === Array); // true
}

{
  function test() {
    const arg = arguments
    console.log(arg)
  }
  test(1,4,5)
}


// 类似数组对象传承数组的方法
{
  function test() {
    const likeArr = arguments;
    const arr1 = Array.prototype.slice.call(likeArr);
    const arr2 = [...likeArr];
    const arr3 = Array.from(likeArr);
    console.log(likeArr instanceof Array); // false
    console.log(arr1 instanceof Array); // true
    console.log(arr2 instanceof Array); // true
    console.log(arr3 instanceof Array); // true
  }
  test()
}

{
// == 隐形转换
  {
    // 1.对象和布尔值进行比较时，对象先转换为字符串，然后再转换为数字，布尔值直接转换为数字
    console.log([] == true); // 结果：false
    // 转换流程
    String([]); // ""
    Number(""); // 0
    Number(true); // 1
    console.log(0 == 1); // false
  }
  {
    // 2.对象和字符串进行比较时，对象转换为字符串，然后两者进行比较
    console.log([1,2,3] == "1,2,3") // 结果：true
    // 转换流程
    String([1,2,3]); // '1,2,3'
    console.log("1,2,3" == "1,2,3"); //  true
  }
  {
    // 3.对象和数字比较时，对象转化为字符串,然后转换为数字，再和数字进行比较
    console.log([1] == 1);  // 结果为true
    // 转换规则：
    String([1]); // "1"
    Number("1"); // 1
    console.log(1 == 1); //  true
  }
  {
    // 4.字符串和数字比较时，字符串转换为数字
    console.log('1' == 1); // true
    //  转换流程：
    String([1]); // "1"
    Number("1"); // 1
  }

  {
    // 5.字符串和布尔值进行比较时，二者全部转换成数值再比较
    console.log('1' == true) // true
    Number("1"); // 1
    Number(true); //  1
  }
  {
    // 6.布尔值和数字进行比较时，布尔转换为数字
    console.log(true == 1); // true
  }
  {
    // 7.特殊的比较
    console.log(undefined == undefined); // true
    console.log(null == null); // true
    console.log(null == undefined); // true
    console.log(Number(null)); // 0
    console.log(Number(undefined)); // NaN
  }
  {
    // 思考: [] == ![]
    console.log([] == ![]); 
    String([]); // ""
    Number(""); // 0
    // ![] 引用数据类型专程布尔值都是true， 因此 ![] 是false
    // false 转成Number 是0
    // 因此 0 == 0; tru

  }
  {
    //  7.复杂数据类型的比较， 比较的是引用地址
    const obj1 = {
      name: 'shulii',
    }
    const obj2 = obj1;
    obj2.name = 'haha';
    console.log(obj1 == obj2, obj1 === obj2 ); // true, true
  }
}


{
  // 数组的方法
  {
    // join()
    const arr = [ 6, 5, 9];
    console.log(arr); //  [6, 5, 9] 原数组不会改变
    console.log(arr.join());  // "6,5,9" 
    console.log(arr.join('-')) // "6-5-9"
    //  与之相反的是： split()： 将字符串转成数组
    const str = '6-5-9';
    console.log(str.split('-')); // [ 6, 5, 9]
  }
  {
    // sort()
    {
      const arr = [ 6, 5, 9];
      const result = arr.sort();
      console.log(arr); //  [5, 6, 9] // 会改变原数组
      console.log(result); // [5, 6, 9] // 进行排序了
    }

    {
      // 按照从小到大排序
      const arr = [ 6, 5, 9];
      const result = arr.sort((a, b) => a - b);
      console.log(result)
    }
    
    {
      // 按照从大到小排序
      const arr = [ 6, 5, 9];
      const result = arr.sort((a, b) => b - a); // [9, 6, 5]
      console.log(result)
    }
    
    {
      // 不区分字母大小排序
      const arr = [ "c", "B", "a", "f", "E"];
      const result = arr.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);
      // toLowerCase(): 将字母转换成小写
      // toUpCase(): 将字母转换成大写
      console.log(result); //  ["a", "B", "c", "E", "f"] 
    }
  }

  {
    // reverse()
    const arr = [5, 4, 3, 2, 1];
    const result = arr.reverse();
    console.log(arr); // [1, 2, 3, 4, 5] 说明会改变原数组
    console.log(result); // [1, 2, 3, 4, 5]
  }

 {
   // concat()
   const arr1 = [1, 2, 3];
   const arr2 = [4, 5, 6];
   const result = arr1.concat(arr2);
   console.log(arr1); // [1, 2, 3] 说明不会改变旧数组
   console.log(arr2); // [4, 5, 6] 说明不会改变旧数组
   console.log(result); // [1, 2, 3, 4, 5, 6]
 }

 {
  // slice()
  const arr = [1, 2, 3, 4, 5];
  const result = arr.slice(1, 2);
  const result2 = arr.slice(1, -1)
  console.log(arr); // [1, 2, 3, 4, 5]; //  不会改变原数组
  console.log(result); // [2]
  console.log(result2); // [2, 3, 4]
 }
 {
  // splice()
  const arr = [1, 2, 3, 4, 5];
  const result = arr.splice(1,2, 3);
  console.log(arr); // [1, 3, 4, 5]
  console.log(result); // [2, 3]
 }

 {
  // shift()
  const arr = [1, 2, 3, 4, 5];
  const result = arr.shift();
  console.log(arr); // [2, 3, 4, 5]
  console.log(result); // 1
 }

 {
  // shift()
  const arr = [1, 2, 3, 4, 5];
  const result = arr.unshift(5);
  console.log(arr); // [5, 1, 2, 3, 4, 5]
  console.log(result); // 6
 }

 {
   // pop
   const arr = [1, 2, 3, 4, 5];
   const result = arr.pop();
   console.log(arr); // [1, 2, 3, 4]
   console.log(result); // 5
 }

 {
   // push
   const arr = [1, 2, 3, 4, 5];
   const result = arr.push(6);
   console.log(arr); // [1, 2, 3, 4, 5, 6]
   console.log(result); // 6
 }

 {
   // forEach
   const arr = [1, 2, 3, 4, 5];
   const result = arr.forEach((item, index, shelf) => {
     console.log("item", item);
     console.log("index", index);
     console.log("index", shelf);
   })
   console.log(result); // undefined  表示没有返回值
 }

 {
  // map
  const arr = [1, 2, 3, 4, 5];
  const result = arr.map((item, index, shelf) => {
   return item + 1;
  })
  console.log(arr); // [1, 2, 3, 4, 5]; 表示原数组没有改变
  console.log(result); // [2, 3, 4, 5, 6]; 表示有返回值
}

{
  // filter
  const arr = [1, 2, 3, 4, 5];
  const result = arr.filter((item) => {
   return item  > 2;
  })
  console.log(arr); // [1, 2, 3, 4, 5]; 表示原数组没有改变
  console.log(result); // [3, 4, 5]; 表示有返回值
}

}



const obj = {
  name: "11111",
}
const myObj = obj;
myObj.name = "22222";
console.log(obj.name)


const name = Symbol();
console.log(typeof name)


console.log(typeof "111"); 
console.log(typeof null);
console.log(typeof undefined); 
console.log(typeof false);  
console.log(typeof 12312); 
console.log(typeof Symbol("2222")); 
console.log(typeof function(){});  
console.log(typeof new Date());
console.log(typeof [1,2,3]);  
console.log(typeof new Object());


function myInstanceof(A, B) {
  const O = B.prototype; // 构造函数B的prototype属性
  A = A.__proto__;       // 取 A 的隐形原型
  while(true) {
    if (A === 'null' ) {  //已经找到顶层
      return false;
    }
    if ( A === O) {  //当 O 严格等于 L 时，返回 true
      return true;
    }
    A = A.__proto__;
  }
}

console.log(myInstanceof('111', Object))

if(undefined) {
  console.log("1231")
}


var salary = "1111";
(function () {
    console.log(salary);
    salary = "222222";
    console.log(salary);
})();

console.log(foo)
console.log(bar)
var foo = function(){ 
    // Some code
}; 
function bar(){ 
    // Some code
};

const obj = {
  name: "shuliqi",
  age: 12
};
function get(sex, size) {
  console.log(this.name, this.age, sex, size);
}
get.call(obj, "女", "成年");




const obj = {
  name: "shuliqi",
  age: 12
};
function get(sex, big) {
  console.log(this.name, this.age, sex, big);
}
get.apply(obj, ["女", "成年"]);



const obj = {
  name: "shuliqi",
  age: 12
};
function get(sex, big) {
  console.log(this.name, this.age, sex, big);
}
const test = get.bind(obj, "女", "成年");
test()

// call 的一个实现方式
Function.prototype.myCall = function( thisObj, ...arg) {
  if (typeof this !== 'function') return false;
  const fn = Symbol();
  thisObj[fn] = this;
  thisObj[fn](...arg);
  delete thisObj[fn];
}
const obj = {
  name: "shuliqi",
  age: 12
};
function get(sex, big) {
  console.log(this.name, this.age, sex, big);
}
get.call(obj, "女", "成年");



// apply



Function.prototype.myApply = function(thisObj, arg) {
  if (typeof this !== "function") return false;
  const fn = Symbol();
  thisObj[fn] = this;
  thisObj[fn](...arg);
  delete thisObj[fn];
}

const obj = {
  name: "shuliqi",
  age: 12
};
function get(sex, big) {
  console.log(this.name, this.age, sex, big);
}
get.myApply(obj,[ "女", "成年"]);

// sum(1)(2)(3)  相加

function curry(fn, args = []) {
  return function() {
      const rest = [...args, ...arguments];
      if (rest.length < fn.length) {
          // 如果传入的参数的个数没有等于 fn 函数的参数的个数，则递归返回
          return curry.call(this, fn,  rest);
      }
      else {
          // 执行fn
          return fn.apply(fn, rest);
      }
  }
}
function add(x, y, z) {
  return x + y + z
} 
var curryAdd = curry(add);
console.log(curryAdd(1)(1)(1)); // 3


const add  = function(x, y ,z) {
  return x + y + z;
}
const  curry = function(fn, arg = []) {
  return function() {
    const rest = [...arguments, ...arg]
    if ( rest.length < fn.length ) {
      return curry.call(this, fn, rest);
    } else {
      return fn.apply(null, rest);
    }
  }
}

const curryAdd = curry(add);
console.log(curryAdd(1)(2)(3));


const debounce = function(fn, wait, immediate = true) {
  let timer, context, args;
  const later = ()=> setTimeout(() => {
    timer = null;
    if (!immediate) {
      fn.apply(context, fn, args);
      context = args = null;
    }
  }, wait)
  return function() {
    if (!timer) {
      timer = later();
      if (immediate) {
        timer.apply(this, arguments);
      } else {
        context = this;
        args = arguments;
      }
    } else {
      clearTimeout(timer);
      timer = later();
    }
  }
};
const  handle = function() {
  console.log("111");
}
window.addEventListener('resize', debounce(handle, 1000, false))



setTimeout(function(){
  console.log("a");
},0)
new Promise(function(resolve){
  console.log("b");
  resolve()
}).then(function(){
  console.log("c");
})
console.log("d");

dbca



const p1 = new Promise((resolve, reject) => {
  console.log("1")
  resolve("2");
  console.log("3");
});
p1.then((value) => {
  console.log(value)
})
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

sleep(1000)

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