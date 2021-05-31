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