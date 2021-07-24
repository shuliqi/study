import * as sdf from '@SDFoundation';
const { reverse, resolve } = require("node:dns");

var arrayList = ['a','b','c','d','e','f'];
arrayList.splice(0, arrayList.length);
console.log(arrayList)

console.log(arrayList);
arrayList = []

arrayList.length = 0;
console.log(arrayList);





function mul (x) {
  return function(y) {
    return function(z) {
      return x * y * z
    }
  }
}

console.log(mul(2)(3)(4)); // output : 24 

function add(x,y,z) {
  return x + y + z;
}
function curry(fn, args = []) {
  return function() {
    const res = [...args, ...arguments];
    if (res.length <  fn.length) {
      return curry.call(null, fn, res)
    } else  {
      return fn.apply(null, res);
    }
  }
}

console.log(curry(add)(1)(2)(3))

var k = 1;
if (1) {
  eval(function foo() {});
  k += typeof foo;
}
console.log(k);
// 创建一个 symbol 变量
const s1 = Symbol();

// syn
const s2 = Symbol(1);
console.log(s1 === s2)


const name = Symbol();
const obj = {
  [name]: "shuliqi" ,
  age: 12,
}
console.log(Object.getOwnPropertyNames(obj))



const s1 = new String("shuliqi");
console.log(typeof s1)
let s2 = s1;
s2 = "哈哈哈"
console.log(s1, s2)


//字面量来生成一个字符串， 无法使用 instanceof 来判断类型的
const s1 = '1111';
console.log(s1 instanceof String)

const func = function() {};
console.log(func instanceof Function)


const obj = {};
console.log(obj instanceof Object)

const arr = [1, 2, 3];
console.log(arr instanceof Array)


const date = new Date();
console.log(date instanceof Date)


function MyInstanceof(A, B) {
  const p = B.prototype;
  A = A.__proto__;
  while(true) {
    if (A === null) {
      return false;
    } else if (A === p) {
      return true;
    }
    A = A.__proto__;
  }
}

const A = {};
console.log(A instanceof Date)
console.log(MyInstanceof(A, Date))




const obj = {
  name: "shuliqi",
  age:  12,
}
for (const value  of obj ) {
  console.log(value);
}

const a = [1, 2, 3];
A.forEach((item) => {
  if (item === 1) {
    continue;
  }
  
  console.log(item);

})


const b = new Date()
console.log(Object.prototype.toString.call(b));



const a = [1,3];


console.log(a.slice)



class People {
  constructor(name, age) {
    this.name = name;
    this.age = age
  }
  get name() {
    console.log("--", this.name);
    return this.name;
  }

  set name(newValue) {
    console.log(newValue);
    this.name = newValue;
  }
}
const people = new People('shuliqi', 12);
people.name;



const People = class MyPeople {
  constructor(age) {
    // MyPeople 只能在类的内部使用
    MyPeople.age = age;
  }
}

// 在外部只能使用类的引用名：People
const people = new People('shuliqi');
console.log(people)



class People {
  static name = "hahah"
  static getName() {
    console.log("shuliqi")
  }
}
People.getName();
console.log(People.name)
const people = new People();
people.getName();


class People {
  // 静态属性，只能People.name 这么使用
  static haha = "我是静态属性"

  // 构造函数
  constructor() {
    // this表示当前的实例， 也是即将被new 出来的那个实例
    this.name = "我是实例属性"
  }

  // 静态方法，只能People.getName()这个使用
  static getName() {
    console.log("我是静态方法");
  }

  // 静态方法名和 非静态方法名是可以一样的
  getName() {
    console.log("我是实例prototype上面的实例");
  }
}

class MyPeople extends People {
  constructor(age) {
    super(...arguments);
    this.age = age;
  }
}
// MyPeople.getName();
// console.log(MyPeople.haha)
const myPeople = new MyPeople(12);
// myPeople.getName();
console.log(myPeople.age)



class People {
  constructor() {
    console.log("父类的构造函数")
    this.name = "父类实例的属性";
  }
  getName() {
    console.log("父类的原型方法",  this.name);
  }
}
People.prototype.like = "11"
People.sex = "父类的属性";
People.getAge = function () {
  console.log("父类的方法", this.sex)
}

class MyPeople extends People{
  constructor() {
    super();
    this.name = "子类实例的属性";
    super.like = "dog";
    console.log(super.like);
  }
  // super 作为一个对象在普通方法中使用， 指的是父类的原型
  getName() {
    // 调用的方法的 this 指向的是 子类的实例
    super.getName();
  }

  static getAge() {
    super.getAge();
  }
}
const people = new MyPeople();
console.log(people.like)


const a = [1,2,3]
console.log(a.join(""), a);

// 会改变原数组
const arr = ["c", "B", "a", "f", "E"];
arr.sort((a, b) => a.toLowerCase() > b.toLowerCase() > 0 ? 1 : -1);
console.log(arr)


//  reverse 会改变
const arr = [1,2,3];
arr.reverse();
console.log(arr);

// concat 不会改变

const arr1 = [1,2], arr2 = [3,4];
const arr =  arr1.concat(arr2);
console.log(arr1, arr2, arr);

// slice 不会改变
const arr = [1,2,3,4];
console.log(arr.slice(0,3), arr)


// splice 会改变
const arr = [1,2,3,4];
const newArr = arr.splice(1, 2,5);
console.log(newArr, arr);

// shift 头部删除， 会改变
const arr = [1,2,3,4];
const deleteItem = arr.shift();
console.log(deleteItem, arr);

// unshift 会改变，头部添加
const arr = [1,2,3,4];
const len = arr.unshift(0); // 5
console.log(len, arr)

// push pop 会改变，
//  forEach
// map
some()
indexOf()
includes()


var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
console.log(a[1]());



var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log("111")
    console.log(i);
  };
}
console.log(a[1]());


for(let  i = 0; i <  5; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000)
}

//  默认绑定： 其他绑定规则不能使用的时候，一般表现为：函数单独调用
let name = "shuliqi"
function getName() {
  console.log(this.name)
};
getName();


//  隐式绑定： 一般表现为： 一个函数在某个对象上被调用， 那么this就是这个对象

// const obj = {
//   name: "SHULIQI",
//   getName: 
// }


function setName() {
  var name = "shuliqi";
  return function() {
    return name;
  }
}
const getName = setName();
console.log('111', getName());
// ReferenceError: name is not defined



var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){
    return scope;
  }
  return f();
}
console.log(checkscope());


var a = "global";
function foo() {
  console.log(a);
}
function bar() {
  var a = "local";
  foo();
}
bar();


var a = 10;
function foo () {
  var a = 20;
  console.log(a);
}
foo();

function foo(){
  var a = 2;
  function bar(){
      console.log(a); 
  }
  bar();
}
foo();



const obj1= {};
const obj2= new Object();
const obj3 = new f1();
console.log(typeof obj1); // object --> 普通对象
console.log(typeof obj2); // object --> 普通对象
console.log(typeof obj3)  // object --> 普通对象

function f1() {}
const f2 = function() {};
const f3 = new Function();
console.log(typeof Object);   // function --> 函数对象
console.log(typeof Function); // function --> 函数对象
console.log(typeof f1); // function --> 函数对象
console.log(typeof f2); // function --> 函数对象
console.log(typeof f3); // function --> 函数对象


function f1() {}
const f2 = function() {};
console.log(f1 instanceof Function)
console.log(f2 instanceof Function)



function MyPerson(name, age) {
  this.name = name; // 这个this 指的是 new 出来的实例
  this.age = age; // 这个this 指的是 new 出来的实例
}
MyPerson.prototype = {
  getName: function() {
    return this.name;
  }
}
const person1 = new MyPerson("舒丽琦", 18);
console.log(person1.getName()); // 舒丽琦


// 定义了一个对象 MyPerson
function MyPerson(name, age) {
  this.name = name;
  this.age = age;
}
// MyPerson 的实例 person1
const person1 = new MyPerson("舒丽琦", 18);

console.log(person1.__proto__ === MyPerson.prototype); // true
console.log(person1.constructor === MyPerson); // true
console.log(MyPerson.prototype.constructor === MyPerson); // true


const obj = {}
console.log(obj.constructor === Object); // true
console.log(obj.__proto__ === Object.prototype); // true

const obj = new Object();
console.log(obj.constructor === Object); // true
console.log(obj.__proto__ === Object.prototype); // true

const a = new Array();
console.log(a.constructor === Array);  // true
console.log(a.__proto__ === Array.prototype);  // true

const s = new String();
console.log(s.constructor === String);  // true
console.log(s.__proto__ === String.prototype); // true

const d = new Date();
console.log(d.constructor === Date); // true
console.log(d.__proto__ === Date.prototype); // true

const f = new Function();
console.log(f.constructor === Function); // true
console.log(f.__proto__ === Function.prototype);  // true

const n = new Number();
console.log(n.constructor === Number);  // true
console.log(n.__proto__ === Number.prototype);  // true

const b = new Boolean();
console.log(b.constructor === Boolean);  // true
console.log(b.__proto__ === Boolean.prototype);  // true


function Person() {};
const person1 = new Person();

console.log(typeof person1); // true
console.log(Person.__proto__ === Function.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.__proto__ === Function.prototype); // true
console.log(Object.prototype.__proto__  === null); // true



function MyPerson() {}
console.log(typeof MyPerson.prototype ); // object


function f1() {}
console.log(f1.__proto__ === Function.prototype)



var obj = {name: 'jack'}
var arr = [1,2,3]
var reg = /hello/g
var date = new Date
var err = new Error('exception')
 
console.log(obj.__proto__ === Object.prototype) // true
console.log(arr.__proto__ === Array.prototype)  // true
console.log(reg.__proto__ === RegExp.prototype) // true
console.log(RegExp.prototype === Object)
console.log(date.__proto__ === Data)  // true
console.log(err.__proto__ === )  // true


function Person(){}
var person1 = new Person();
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype) //true
console.log(Object.prototype.__proto__) //null

Person.__proto__ == Function.prototype; //true
console.log(Function.prototype)// function(){} (空函数)





var num = new Array()
console.log(num.__proto__ == Array.prototype) // true
console.log( Array.prototype.__proto__ == Object.prototype) // true
console.log(Array.prototype) // [] (空数组)
console.log(Object.prototype.__proto__) //null


console.log(Array.__proto__ == )// true



//  实现 call
Function.prototype.myCall = function(obj, ...args) {
  if (typeof this !== 'function') {
    throw new Error("当前调用的不是函数");
  }
  const fn = Symbol();
  obj[fn] = this;
  obj[fn](...args);
};
const obj = {
  name: "shuliqi",
  age: 12,
}
function people(name, sex) {
  this.name = name;
  this.sex = sex;
  console.log(this.age, this.sex, this.name)
}
obj.myCall(obj, "shuliqi", "女");


Function.prototype.myApply = function(obj, args) {
  if (typeof this !== 'function') {
    throw new Error("错误")
  }
  const fn =Symbol();
  obj[fn] = this;
  obj[fn](...args);
}


const obj = {
  name: "shuliqi",
  age: 12,
}
function people(name, sex) {
  this.name = name;
  this.sex = sex;
  console.log(this.age, this.sex, this.name)
}
people.myApply(obj, ["shuliqi", "女"])


Function.prototype.myBind = function(obj, argArr) {
  if (typeof this !== 'function') {
    throw new Error("错误")
  }
  const self  = this;
  const fbound = function() {
    const args = [...argArr, ...arguments];
    // 作为构造函数：this 是指当前实例（testObj），self 是指绑定函数（people）。因为下面有一句： fbound.prototype = this.prototype;
    // 已经修改了返回函数的prototype 为 绑定函数的 prototype。那么此时结果为true，this 应该指向实例

    // 作为普通函数：this 指向 window，self 为绑定函数，此时：fbound.prototype 为  prototype
    self.apply(this instanceof self ? this : obj, args);
  }
  
  fbound.prototype = this.prototype;
  return fbound
}
Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fbound = function () {

      var bindArgs = Array.prototype.slice.call(arguments);
      console.log("this:", this)
      console.log("----");
      console.log("self:", self);
      debugger
      console.log("=====", this.prototype)
      // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，
      // 已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
      // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
      self.apply(this instanceof self ? this : context, args.concat(bindArgs));
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
  // 这里的this， 是指people（因为不是在return 函数里面）
  fbound.prototype = this.prototype;
  return fbound;
}




Function.prototype.MyBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw Error("错误");
  }
  const that = this;
  const bound = function() {
    // 使用apply 修改作用域

    // 作为构造函数。this 指向实例， that 指向绑定的函数，因为下面有一句：bound.prototype = this.prototype; 所以结果为 true、 this 指向实例
    // 作为普通函数，this 指向window, that 指向绑定的函数，此时为 false， this 指向 context
    that.apply(this instanceof that ? this : context, [...args, ...arguments] )
  }
  // 修改返回函数的 prototype 为 绑定函数 prototype.
  // 这里的 this 是绑定函数
  bound.prototype = this.prototype;

  // 使用闭包： 使得这个函数的引用在当前的词法作用域之外执行也持有这个词法作用域的引用
  return bound;
}
const obj = {
  name: "shuliqi",
  age: 12,
}
function people(name, sex, job) {
  this.name = name;
  this.sex = sex;
  this.job = job;
  console.log("age:", this.age, this)
}
people.prototype.lastNmae = "舒";

const test  = people.MyBind(obj, "shuliqi", "女");
const testObj = new test("高级开发工程师");


// sum(1)(2)(3)


function sum(x) {
  return function(y) {
    return function(z) {
      return x + y + z;
    }
  }
}
// 采用闭包，将函数返回，使其持有多当前词法作用域的引用
console.log(sum(1)(2)(3)); // 6

function curry(fn, args = []) {
  return function () {
    const rest = [...args, ...arguments];
    if (rest.length < fn.length) {
      return curry(fn, rest);
    } else {
      return fn.apply(null, rest);
    }
  }
}

function sum(x,y,z) {
  return x +y + z;
};
const addCurry = curry(sum);
console.log(addCurry(1)(2)(3)); // 6




Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    return;
  }
  const that = this;
  // 使用闭包
  const bound = function() {
    // 作为构造函数， this 表示实例。that 表示绑定函数。这时候 this instanceof that 为true。那么执行的函数的 this 应该指向 实例（）。
    // 作为普调函数，this 表示 window， that 表示绑定函数，这时候 this instanceof that 为false，那么执行的函数的 this 应该指向 我们传进来的context。
    that.apply(this instanceof that ? this : context, [ ...args, ...arguments])
  }
  // this表示 绑定的函数; 修改返回的函数的 prototype  为绑定安函数的 prototype
  bound.prototype = this.prototype;
  return bound;
}

const obj = {
  name: "shulioqi",
  age: 12
}

function people(name, sex, job) {
  this.job = job
}

const test = people.myBind(obj, "舒丽琦", "女");
const shu = new test("高级开发");
console.log("---", shu.name)














function debounce(fn, wait, immadiate) {
   let timer = null; 
   let context, args;
   const later = function() {
     if (!immadiate) {
        timer = setTimeout(() => {
          fn.apply(context, args);
          context = args = null;
        }, wait)
     }
   }

  return function() {
    if (timer) {
      // 不是首次进入
      clearTimeout(timer);
      later();
    } else {
      // 首次进入
      if (immadiate) {
        // 如果immadiate: true, 那么立即执行函数
        fn.apply(this, [...arguments]);
      } else {
        context = this;
        args = [...arguments];
        later();
      }
    }
  }
}



function throttle(fn, wait) {
  let context = null, args, start = 0;
  return function () {
    const now = (new Date()).getTime();
    if (!start) {
      start = now
    } else {
      const remainning = wait - (now - start);
      if (remainning <= 0) {
        // 执行函数
        fn.apply(context, args);
        start = now;
        context = args = null;
      } else {
        context = this;
        args = arguments;
      }
    }

  }
}

// function throttle(func, wait) {
//   let context, args;
//   // 设置前一个函数调用的时间戳
//   let previous = 0;
//   return function() {
//     let now = new Date().getTime();
//     if (!previous) {
//       // 首次进入
//       previous = now;
     
//     } else {
//       context = this;
//       args = arguments;
//       let remaining = wait - (now - previous);
//       if (remaining <= 0) {
//         func.apply(context, args);
//         previous = now;
//         context = args = null;
//       }
//     }
//   }
// }

function throttle(fn, wait) {
  let context = null, args, start = 0;
  return function () {
    const now = (new Date()).getTime();
    if (!start) {
      start = now
    } else {
      const remainning = wait - (now - start);
      if (remainning <= 0) {
        // 执行函数
        fn.apply(context, args);
        start = now;
        context = args = null;
      } else {
        context = this;
        args = arguments;
      }
    }

  }
}

function handle() {
  console.log("111");
}
window.addEventListener('resize', throttle(handle, 1000))



var spiralOrder = function(matrix) {
  if (matrix.length <= 0  && matrix[0].length <= 0 ) {
    return;
  }
  // 行数
  let rows = matrix.length;
  // 列数
  let columns = matrix[0].length;

  const order = [];

  let left = 0, top = 0, right = columns - 1, bottom = rows - 1;
  console.log('111')

  while( left <= right && top <= bottom) {
    // 上边变的数据
    for (let colums = left; colums <=  right; colums++) {
      order.push(matrix[top][colums]);
    }

    // 左边的数据
    for (let row = top; row <=  bottom; row++) {
      order.push(matrix[row][right]);
    }
    if (left <  right && top < bottom) {
          // 下边的数据
        for (let columns = right - 1; columns > left; columns--) {
          order.push(matrix[bottom][columns]);
        }


        // 左边的数据
        for (let row = bottom; row > left; row--) {
          order.push(matrix[row][left]);
        }
    }

    [left, right, top, bottom ] = [ left + 1, right - 1, top + 1, bottom - 1];
  }

  return order;
};

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))

// 原型链继承：将子类的 prototype 属性指向 父类的实例
// 实例和原型都继承到了
// 但是子类无法向父类传递参数
function Parent(name) {
  this.name = name;
  this.getName = function() {
    console.log(this.name);
  }
}

Parent.prototype = {
  age: 12,
  getAge: function() {
    console.log(this.age)
  }
}

function Child() {};
Child.prototype = new Parent("shuliqi")

const myChild = new Child();
myChild.getName(), 
myChild.getAge();


// 构造方法继承
// 上一种方法 子类无法向父类提供参数，那么我们可以在子类的构造函数里面继承在执行一次构造函数，是不是就可以传递过去了？
// 但是这种方式继承有一个缺点：就是无法继承父类的原型
function Parent(name) {
  this.name = name;
  this.getName = function() {
    console.log(this.name);
  }
}

Parent.prototype = {
  age: 12,
  getAge: function() {
    console.log(this.age)
  }
}

function Child(name) {
  //  执行父类的构造函数， 并且可以子类的参数传递过去
  Parent.call(this, name);
};

// 子类的 prototype 属性 指向 Parent 的实例
const myChild = new Child("舒小花");
myChild.getName(), 
myChild.getAge(); // 会报错， 没有集成到


// 组合式
//  为了解决上面的 不能继承父类的原型， 我们可以第一种方式和第二种方式结合起来
// 但是这种的方式有一个缺点：那就是实例执行了两次， 属性和方法被构造了两次，暂用内存
function Parent(name) {
  this.name = name;
  this.getName = function() {
    console.log(this.name);
  }
}

Parent.prototype = {
  age: 12,
  getAge: function() {
    console.log(this.age)
  }
}

function Child(name) {
  //  执行父类的构造函数， 并且可以子类的参数传递过去
  Parent.call(this, name);
};
// 子类的 prototype 属性指向父类的实例
Child.prototype = new Parent();

const myChild = new Child("舒小花");
myChild.getName(),  // 舒小花  实例也集成到了
myChild.getAge();   // 12 原型继承到了


// 寄生式继承
// 为了解决上面的这个问题： 既然是 子类的 prototype 属性指向父类的实例 的时候， 父类的构造函数有构造的。那么
// 假如 我们 是 子类的 prototype 属性 指向一个构造函数没有任何东西， 只是继承了父类的原型的构造函数，是不是实例就不会有两份了
function Parent(name) {
  this.name = name;
  this.getName = function() {
    console.log(this.name);
  }
}

Parent.prototype = {
  age: 12,
  getAge: function() {
    console.log(this.age)
  }
}

function Child(name) {
  //  执行父类的构造函数， 并且可以子类的参数传递过去
  Parent.call(this, name);
};
const fn = function() {};
fn.prototype = Parent.prototype;
Child.prototype = new fn();

const myChild = new Child("舒小花");
myChild.getName(),  // 舒小花  实例也集成到了
myChild.getAge();   // 12 原型继承到了


// 实例继承: 最简单的方式
function Parent(name) {
  this.name = name;
  this.getName = function() {
    console.log(this.name);
  }
}

Parent.prototype = {
  age: 12,
  getAge: function() {
    console.log(this.age)
  }
}

function Child(name) {
  const instance = new Parent(name);
  instance.job = "高级开发";
  return instance;
}


const myChild = new Child("舒小花");
myChild.getName(),  // 舒小花  实例也集成到了
myChild.getAge();   // 12 原型继承到了
console.log(myChild.job);


const p1 = new Promise((resolve, reject) => {
  console.log("立即执行")
})









function MyPromise(executor) {
  const self = this;
  // 默认状态
  self.status = "pending";
  self.value;
  self.reason;

  // 为了实现异步， 需要要把成功回调和失败回调保存起来
  // 用来保存then 方法中，第一个参数
  self.onResolveCallBack = [];

  // 用来保存then 方法中，第二个参数
   self.onRejectCallback = [];

  function resolve(value) {
    // 状态一旦改变，则不会再改变了
    if ( self.status  === 'pending') {

      // 修改状态
      self.status = "fulfilled";

      // 置值
      self.value = value;

      // 当置值器置值之后， 我们就应该把把保存起来的成功回调执行
      self.onResolveCallBack.forEach((fn) => {
        fn();
      })
    }
  }

  function reject(reason) {
    // 状态一旦改变，则不会再改变了
    if ( self.status  === 'pending') {
      
      // 修改状态
       self.status = "rejected";

       // 置值
       self.reason = reason;

        // 当置值器置值之后， 我们就应该把把保存起来的成功回调执行
      self.onRejectCallback.forEach((fn) => {
        fn();
      })
    }
  }

  executor(resolve, reject)
}


MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this;

      // 因为链式可以一直链下去， 是因为返回的也是promise
      return new Promise((resolve, reject) => {

      /**
       * 如果在resove，reject置值器是在异步任务中，那么调 
       * .then的时候是没办法知道要执行成功回调还是失败回调，所以将回调保存起来， 供之后再调用
      */
      if (self.status === 'pending') {
        self.onResolveCallBack.push(() => {
          try {
             const result = onFulfilled(self.value);
             resolve(result)
          } catch (error) {
            reject(error);
          }
        });
        self.onRejectCallback.push(() => {
          try {
            const result = onRejected(self.value);
            resolve(result);
          } catch (error) {
            reject(error);
          } 
        });
      }

      // 成功回调
      if (self.status === 'fulfilled') {
        try {
          const result =  onFulfilled(self.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }

      if (self.status === 'rejected') {
        try {
          const result = onRejected(self.reason);
          resolve(result);
        } catch (error) {
          reject(error);
        }
        
      }
  })


}


MyPromise.prototype.catch = function() {

}


MyPromise.prototype.finally = function() {
}




let p = new MyPromise(function (resolve, reject) {
  console.log('start')
  setTimeout(function(){
    resolve('data1')
  },500)
})
p.then(
  (v) => {
  console.log('success： ' + v)
  // return v // 1 返回 v
  // return 100 // 2 返回常量
  // return {a : 100} // 3 返回对象
  // return undefined // 4 返回 undefined
  // 5 不写return
  },
  (v) => {
  console.log('error： ' + v)
  }
)
.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
   console.log('error： ' + v)
  }
)
console.log('end')




console.log(1);

let  b = new Promise((resolve, reject) =>{
  console.log(2);
}).then(() => {
  console.log(3);
})
console.log("111");
setTimeout(() => {
  console.log(4);
}, 100);
setTimeout(() => {
  console.log(5);
}, 0);

let c = async() => {
  setTimeout(() => {
    new Promise((resolve, reject) => {
      console.log(6);
    })
  }, 0);
  let x=  await new Promise((resolve, reject) =>{
    console.log(5);
    resolve(7)
  })
  console.log(x);
  console.log(8);
}

console.log(9);

c();

1 2 9 5 7 8 4 6






class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
  zhang = "hahah";
}

const people = new People("shuliqi", 12);
console.log(people.zhang)


Function.prototype.myBind = function(contenxt, ...arg) {
  const self = this;

  const bound = function () {
    // 如何是new 使用，那么this 指  就是值当前的对象
    // 普调调用的话， 那么this 就是我们需要改变的context
    self.apply(this instanceof self ? this : contenxt, [...arg, ...arguments]);
  }
  // this 指当前的构造函数
  bound.prototype = this.prototype;
  return bound
}


function debounce(fn, wait, immadiate =  false) {
  let con
  return function (params) {
    
  }
}


var a = new String('123')
var b = String('123')
var c = '123'

console.log(typeof new String('123')) // Object
console.log(typeof String('123')) // String
console.log(typeof '123') // String
console.log(new String('123') instanceof String) // true
console.log(String('123') instanceof String) // false
console.log('123' instanceof String) // false


console.log( typeof 123 );  // Number
console.log( typeof Number(123)) // Number
console.log( typeof new Number(123) ) // Object

console.log( 123 instanceof Number); // false
console.log( Number(123) instanceof Number) // false
console.log( new Number(123) instanceof Number) // true



console.log(typeof undefined);
console.log(typeof 'string');
console.log(typeof 123)
console.log(typeof false);
console.log(typeof Symbol("我是独一无二的值"))
console.log(typeof null)

console.log(typeof function() {});
console.log(typeof {});
console.log(typeof new Date())
console.log(typeof [1,2,3]);

// undefined
// string
// number
// boolean
// symbol
// object
// function
// object
// object
// object


// instanceof： 判断当前的对象在它的原型链上是否存在 这个构造函数的prototype

console.log(undefined instanceof undefined); // 报错
console.log('string' instanceof String);
console.log(123 instanceof Number)
console.log(false instanceof Boolean);
console.log(Symbol("我是独一无二的值") instanceof Symbol)
console.log(null instanceof Object)
// false
// false
// false
// false
console.log(function() {} instanceof Object);
console.log({} instanceof Object);
console.log(new Date() instanceof Object)
console.log([1,2,3] instanceof Object);
// true
// true
// true
// true


function MyInstanceof(A, B) {
  const B_Prototype = B.prototype;
  A = A.__proto__;
  while(true) {
    if (A === B_Prototype) {
      return true;
    } else if (A === 'null') {
      return false;
    }
    A = A.__proto__;
  }
}

console.log(MyInstanceof(function(){}, Object));
console.log(MyInstanceof({}, Object));
console.log(MyInstanceof(new Date(), Object))
console.log(MyInstanceof([1,2,3], Object));

// true
// true
// true
// true


const obj = {
  name: "shu",
  age: 12
}
for( const key in obj) {
  console.log(key)
}


const arr = ["shuliqi", 23, "age"];
for(const value  of arr) {
  console.log(value)
}
for(const key  in arr) {
  console.log(key)
}


const a = [1,2];
console.log(Object.prototype.toString.call(a) === "[object Array]"); 
console.log(Array.isArray(a));
console.log(a instanceof  Array);
// true
// true
// true


function name() {
  // const arg = Array.from(arguments)
  // const arg = [...arguments]
  const arg = Array.prototype.slice.call(arguments);
  console.log(arg);
}

name(1,2,3,4)

console.log([] == true);
console.log(String([]))""0 


console.log([1, 2, 3] == "1,2,3");
String([1,2,3]) "1,2,3"



{
  class People {
    constructor() {
      this.age = 38;
    }
  }
  class MyPeople extends People {
    constructor() {
      super();
    }
    static get() {
      this.age = 10;
      super.age = 20;
      console.log(super.age);
      console.log(this.age);
    }
  }
  MyPeople.get();
  MyPeople.age;

  // undefined 20
  // super 作为对象使用， 如果是赋值操作， 在静态方法中， 就表示给当前的类的字段赋值， 如果在普调的方法， 就是给当前的实例赋值
  // super 作为对象使用，
}

class People {
  constructor() {
    this.age = 38;
  }
}
People.age = 30;

class MyPeople extends People {
  constructor() {
    super();
    this.age = 10;
    super.age = 20;
    console.log(super.age);
    console.log(this.age);
  }
}
const people = new MyPeople();



class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
console.log(b.m);


class People {
  constructor(name) {
    this.name = name;
  }
  get() {
    console.log(this.name,  this.age)
  }
}

class MyPeople extends People {
  constructor() {
     // super(...arguments)
  }
  getName() {
    console.log(super.name)
  }
}
const people = new MyPeople('shuliqi');
// ReferenceError:: Must call super constructor in derived class before accessing 'this' or returning from derived constructor


class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
console.log(b.m);

let name = "as";
let  name = "11";
console.log(name)


let  name

function name() {
  const name = "asda";
  function getName() {
    console.log(name);
  }
  bar(getName)
}
function bar(fn) {
  console.log("1111");
  fn();
}


function foo() {
  var a = 1;
  function getValue () {
    console.log(a);
  }
  bar(getValue);
}
function bar(fn) {
 fn(); // 1
}
foo()



function message(message) {
  setTimeout(function timer() {
    console.log(message)
  }, 1000)
}
message("shuliqi")

for (var i=1; i<=5; i++){
  (function (j) {
    setTimeout(function(){
      console.log(j);
    },i*1000);
  })(i)
}

for (let i=1; i<=5; i++){
    setTimeout(function(){
      console.log(i);
    },i*1000);
}


function person() {
  
}


function num() {
  var num = 0;
  return function() {
    num++;
    console.log(num);
  };
}
var fn = num();
fn();
fn();
fn();
fn();
fn();
fn();
fn = null;
fn = num();
fn();
fn();
fn();


function MyPeople() {};
const person1 = new MyPeople();
console.log(person1.__proto__ === MyPeople.prototype);
console.log(MyPeople.__proto__ === Function.prototype);
console.log(MyPeople.prototype.__proto__ === Object.prototype);
console.log(Object.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ ===  Object.prototype)
console.log(Object.prototype.__proto__ === null)


// true
// true
// true
// true
// true
// true

function getName(age, sex) {
  console.log(this.name, age, sex)
}
const obj = {
  name: "shuliqi"
}

Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== 'function') {
    console.log("调用的对象不是一个函数");
    return false;
  }
  const fnName = Symbol();
  context[fnName] = this;
  context[fnName](...args);
  delete  context[Symbol()]
}
getName.myCall(obj, "23", "女")



function getName(params) {
  console.log(this.name, params[0], params[1])
}
const obj = {
  name: "shuliqi"
}
Function.prototype.myApply = function(context, ...args) {
  if (typeof this !== 'function') {
    console.log("调用的对象不是一个函数");
    return false;
  }
  const fnName = Symbol();
  context[fnName] = this;
  context[fnName](args);
  delete  context[fnName];
}

getName.myApply(obj, "23", "女")


---------------------
---------------------

---------------------

---------------------


function getName(params) {
  this.age = 12;
  console.log(this.name, params[0], params[1])
}
const obj = {
  name: "shuliqi"
}
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    console.log("调用的对象不是一个函数");
    return false;
  }
  const self = this;
  function bound () {
    self.call(this instanceof self ? this : context, [...args, ...arguments]);
  }
  bound.prototype = self.prototype;
  return bound;
}

const test = getName.myBind(obj, "2113", "女");
const my = new test("asda");
console.log(my);

// sum(1)(2)(3) 返回结果是 1,2,3 之和
function sum(x) {
  return function(y) {
    return function(z) {
      return x + y + z
    }
  }
}

console.log(sum(1)(2)(3))


function curry(fn, arg = []) {
  return function() {
    const rest = [...arguments, ...arg];
    if (rest.length < fn.length) {
      return curry(fn, rest);
    } else {
      return fn.apply(null, rest);
    }
  }
}

const add =  function(a, b, c) {
    return a + b + c;
}
const curryAdd = curry(add);
console.log(curryAdd(1)(2)(3))



function debounce(fn, wait, immediate = true) {
  let context;
  let args
  let timer;
  let later = () => {
    timer =  setTimeout(() => {
      if (!immediate) {
        fn.apply(context, args);
        timer = context = args = null;
      }
    }, wait)
  }

  return function () {
    if (timer) {
      // 不是首次进入
      clearTimeout(timer);
      later();
    } else {
      if (immediate) {
        // 如果是立即执行的
        fn.apply(this, [...arguments]);
      } else {
        context = this;
        args = arguments;
        later();
      }
    }
  }
}
function handle() {
  console.log("111");
}
window.addEventListener('resize', debounce(handle, 1000, false))




function throttle(fn, wait) {
  let previous = 0;
  let context = null;
  let args;
  return function() {
    const now = new Date().getTime();
    if (!previous) {
      // 首次进入
      previous = now;
    } else {
      context = this;
      args =  arguments;
      if (wait - (now - previous) <= 0 ) {
        fn.apply(context, args);
        previous = now;
        context = args = null;
      }
    }
  }
}
function handle() {
  console.log("111");
}
window.addEventListener('resize', throttle(handle, 1000));



// 求数组所有子集 [1,2,3]-->[1] 、[2]、[1,2]、[3]、[1,2,3]、[1,3]、[2,3]



// function 



// // 传入一个promise生成器
// Promise.retry = async (promiseFunc, maxTimes = 3) => {
//   let result;
//   while (maxTimes > 0) {
//     --maxTimes;
//     // 新建一个promise接管目标promise的resolve以及reject
//     await new Promise((res, rej) => {
//       promiseFunc()
//         .then((result1) => {
//           // 成功即可终端循环
//           maxTimes = 0;
//           result = result1;
//           res();
//         })
//         .catch((e) => {
//           // 失败检测是否还有重试次数
//           if (maxTimes === 0) {
//             rej(e);
//           } else {
//             res();
//           }
//         });
//     });
//   }
//   return result;
// };

// Promise.retry = function (promiseFn, times = 3) {
//   return new Promise(async (resolve, reject) => {
//     while (times--) {
//       try {
//         var ret = await promiseFn();
//         resolve(ret);
//         break;
//       } catch (error) {
//         if (!times) reject(error);
//       }
//     }
//   });
// };
// function getProm() {
//     const n = Math.random();
//     return new Promise((resolve, reject) => {
//         setTimeout(() =>  n > 0.9 ? resolve(n) : reject(n), 1000);
//     });
// }
// Promise.retry(getProm);




Promise.retry = (promiseFn, time) => {
  return new Promise(async(resolve, reject) => {
    while(time--) {
      console.log("333", time)
      try {
        console.log("444", `还剩${time}次重试`)
        const result = await promiseFn();
        resolve(result);
        break;
      } catch (error) {
        if (!time) {
          console.log("5555")
          reject(error)
        }
      }
    }
  })
}

const  getData = () => {
  const n  = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      if (n < 10) {
        reject("获取数据失败");
      } else {
        resolve("获取成功的数据");
      }
    }, 1000)
  })
};
Promise.retry(getData, 3)
.then((result) => {
  console.log("成功", result)
})
.catch((err) => {
  console.log("失败", err)
})


const data = [
  {
    name: '11',
    children: [
      {
        name: '12',
        children: [
          {
            name: '13'
          }
        ]
      }
    ]
  },
  {
    name: '21',
    children: [
      {
        name: '22',
        children: [
          {
            name: '13',
            shu: [
              { 
                name: "hahaha"
              }
            ]
          }
        ]
      }
    ]
  }    
]
// 写个方法 getAllNames 获取所有的 name 值, 返回数组，可以用 递归 和 非递归

function getAllNames(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (Array.isArray(data[i])) {
      result = result.concat(getAllNames(arr[i]));
    } else {
      for (let key in data[i]) {
        if (Array.isArray(data[i][key])) {
          result = result.concat(getAllNames(data[i][key]));
        }
        if (key ===  "name") {
          result.push(data[i][key])
        }
      }
    }
  }
  return result;
}
console.log(getAllNames(data));


const arr = [1,2,3];
// reduce((acucumulator, currentValue, currentIndex, array) => {

// }, initValue)
const sum  = arr.reduce((accumulator, currentValue,  currentIndex, array) => {
  return accumulator + currentValue
});
console.log(sum)


const arr = [1,2,3];
Array.prototype.myReduce = function (fn, initValue) {
  for (let i = 0; i < this.length; i++) {
    if (initValue !== 'undefined') {
      initValue = fn(initValue, this[i], i, this);
    } else {
      initValue = fn(this[i], this[i + 1 ], i+1 , this);
    }
  }
  return initValue;
}

/* reduce reduce方法有两个参数
  * 第一个参数：回调函数 --> 每个参数都会调用回调函数
  * 第二个参数： 初始值  --> 如果没有值，那么就是数组的第一个数 
  * 回调函数有四个参数： accumulator-> 累计回调返回值， currentVlaue: 当前值， currentIdex： 当前下标，  最后是原数组
*/

const sum = arr.myReduce((accumulator, currentValue,  currentIndex, array) => {
  return accumulator + currentValue
}, 0);
console.log(sum);


const arr = [1,2,3];
const result = arr.map((value, index, array) => {
   return value  + 1;
})
console.log(result);
Array.prototype.myMap = function (fn, context) {
  const result = [];
  const self = context || this;
  for (let i = 0; i < self.length; i++) {
    result.push(fn(self[i], i, self));    
  }
  return result;
}
const arr = [1,2,3];
const arr2 = [2,3,4]

const result = arr.myMap((value) => {
  return value + 1;
}, arr2);
console.log(result);



// 实现 多个 promise [p1, p2, p3], 并行执行，前一个promise执行完，才能执行下一个promise



Promise.myAll = async function (PromiseArr) {
    let i = 0 ;
    while(i < PromiseArr.length) {
      await PromiseArr[i];
      i--;
    }

}

async function promise_queue(list) {
  let index = 0
  while (index >= 0 && index < list.length) {
      await list[index]()
      index++
  }
}



function fn1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1)
      resolve(1);
    }, 2000)
  })
}

function fn2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(2)
      resolve(2);
    }, 3000)
  })
}

function  promise_queue(list) {
  const result = [];
  // 这个需要解释下，遍历数组，每次都把数组包在一个Promise.then()中，相当于list[0]().then(list[1]().then(list[2]().then(...))),
  // 这样内层Promise依赖外层Promise的状态改变，从而实现逐个顺序执行的效果
  return new Promise((resolve, reject) => {
    let p = Promise.resolve();
    list.forEach((promise) => {
      p = p.then(promise).then((data) => {
        result.push(data);
        return result;
      })
    })
    resolve(p);
  })
}
promise_queue([fn1, fn2])
.then((data) => {
  console.log("完成", data)
})









async function promise_queue(list) {
  const result = [];
  return new Promise(async(resolve, reject) => {
    let i = 0;
    while(i < list.length) {
      const res = await list[i]();
      result.push(res);
      i++
    }
    resolve(result);
  })
}
promise_queue([fn1, fn2])
.then((data) => {
  console.log("完成", data)
})



// 实现一个方法 deepKey(obj, fn) 转换 obj 的key为大写

  const obj = {
    'name': 111,
    'children': [
      {
        name: 1111
      },
      {
        shu: 2222
      }
    ],
    eat: ['apple']
  }

function deepKey(obj) {

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      deepKey(obj[i])
    }
  } else if (typeof obj !== "string") {
    for (const key in obj) {
      obj[key.toUpperCase()] = obj[key];
      delete obj[key];
      if (Array.isArray(obj[key.toUpperCase()])) {
        deepKey(obj[key.toUpperCase()])
      }
    }
  }
  return obj;
}
console.log(deepKey(obj))


  // deepKey(obj, key => key.toLocaleUpperCase())
  // 转化后为
  const newObj = {
    'NANME': 111,
    'CHILDREN': [
      {
        'NAME': 1111
      }
    ],
    'EAT': ['apple']
  }













