import * as sdf from '@SDFoundation';
const { reverse } = require("node:dns");

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
  if (!matrix.length || !matrix[0].length) {
      return [];
  }

  const rows = matrix.length, columns = matrix[0].length;
  const order = [];
  let left = 0, right = columns - 1, top = 0, bottom = rows - 1;
  while (left <= right && top <= bottom) {
      for (let column = left; column <= right; column++) {
          order.push(matrix[top][column]);
      }
      for (let row = top + 1; row <= bottom; row++) {
          order.push(matrix[row][right]);
      }
      console.log(left, right, top, bottom)
      if (left < right && top < bottom) {
          for (let column = right - 1; column > left; column--) {
              order.push(matrix[bottom][column]);
          }
          for (let row = bottom; row > top; row--) {
              order.push(matrix[row][left]);
          }
      }
      [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
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