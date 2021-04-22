function People(name, age) {
  // 父类实例对象属性：name
  this.name = name;
   // 父类实例对象属性：age
  this.age = age;
}
// 父类原型方法
People.prototype.getAge = function() {
  console.log(this.age)
}
// 父类原型方法
People.prototype.getNane = function() {
  console.log(this.name)
}
// 通过new 操作符生成实例对象people
const people = new People('shuliqi', 18);
people.getAge();  // 18
people.getNane(); // shuliqi
console.log(people.prototype.constructor)




// 改成class
class People {
  // 构造函数
  constructor(name, age) {
     // 父类实例对象属性：name
    this.name = name;
     // 父类实例对象属性：age
    this.age = age
  }
  // 父类原型方法
  getNane() {
    console.log(this.name);
  }
  // 父类原型方法
  getAge() {
    console.log(this.age);
  }
}
// 通过new 操作符生成实例对象people
const people = new People('shuliqi', 18);
people.getAge();  // 18
people.getNane(); // shuliqi



// ES5
function People() {};
console.log(typeof People); // function
console.log(People.prototype.constructor === People); // true

// ES6
class People{}
console.log(typeof People); // function
console.log(People.prototype.constructor === People); // true


// ES5
function People() {};
People.prototype.getName = function() {};
People.prototype.getAge = function() {};
console.log(Object.keys(People.prototype)); // [ 'getName', 'getAge' ]

// ES6




class People{
 constructor() {
   console.log('使用new命令生成实例的时候， 会被自动调用');
 }
}
const people =  People();


function People(name, age) {
  this.name = name;
  this.age = age;
  console.log('调用')
}
const shu = People(); // 调用
console.log(shu)



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
}
const p1 = new People('shuliqi', 12);
const p2 = new People('shulina', 22);
console.log( p1.__proto__ ); // true




const people = new class {

  constructor(name) {
    this.name = name;
  }

  getName() {
    console.log(this.name)
  }

}('shuliqi')
people.getName();
// shuliqi


// 不存在提升， 在一个类定义好之前使用，直接报错
const people = new People();
class People {}
// ReferenceError: Cannot access 'People' before initialization



let People = class {};
class MyPeople extends People {}



class People {
  constructor (name) {
    this.name = name;
  }
  getName = () => {
    console.log(this.name);
  }
}
const people = new People('shuliqi');
people.getName();  // shuliqi
const { getName } = people;
getName(); // shuliqi


class People {
  // 静态方法
  static getAge() {
    console.log('子类可以继承父类的静态方法')
  }
}

class MyPeople extends People {}
MyPeople.getAge(); // 子类可以继承父类的静态方法




class People {
  constructor(name) {
    this.name = name;
  }
  get() {
    console.log(this.name,  this.age)
  }
}

class MyPeople extends People {
  constructor(name) {
    // 在调用super()之前使用this
    this.name = name
    super(...arguments)
  }
}
console.log(Object.getPrototypeOf(MyPeople) === People) // true





class People {
  constructor() { 
    this.age = '父类实例属性';
  }
  // 父类静态方法（只能 People.getName()调用）
  static getName() {
    console.log(this.age);
  }
}


class MyPeople extends People {
  constructor() {
    super();
    this.age = '子类实例属性';
  }
  // 子类静态方法（只能MyPeople.getName()调用）
  static getName() {
    super.getName();
  }
}
MyPeople.prototype.age = '子类原型属性';
MyPeople.age = '子类属性';

MyPeople.getName();  // 子类属性


