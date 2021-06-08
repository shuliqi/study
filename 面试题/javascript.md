# JavaScript

### 1. 基本类型有哪几种？

基本数据类型：`undefined`, `null`, `string`,`number`,`bool`,`symbol(es6新增)`。

symbol 的作用：

symbol 是 ES6 新加的一种新的基本数据类型。 表示独一无二的。

[ES6学习笔记-Symbol的使用](https://shuliqi.github.io/2020/02/23/ES6%E4%B8%ADSymbol%E7%9A%84%E4%BD%BF%E7%94%A8/)

[ES6---Symbol](https://es6.ruanyifeng.com/?search=rest&x=0&y=0#docs/symbol)



### 3. 复杂(引用)数据有哪几种？

引用数据类型：`Function`, `Object`, `Array`, `Date`

### 4. 基本数据类型和复杂数据类型存储有什么区别？

基本数据类型存储在`栈内存`，存的是值。

引用数据类型的值是存在`堆内存`， 地址(就是只想这个堆的地址)存在`栈内存`。当我们把对象赋值给另外一个变量的时候，复制的是地址，指向同一块内存空间，当其中一个对象改变时，另一个对象也会变化。

**_栈内存_**主要用于存储各种**_基本类型_**的变量，包括 Boolean、Number、String、Undefined、Null...以及**_对象变量的指针_**，这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等，栈内存中的变量一般都是已知大小或者有范围上限的，算作一种简单存储.

而**_堆内存_**主要负责像对象 Object 这种变量类型的存储，堆内存存储的对象类型数据对于大小这方面，一般都是未知的，（所以这大概也是为什么 null 作为一个 object 类型的变量却存储在栈内存中的原因。

使用 new 关键字初始化的之后是不存储在栈内存中的。为什么呢？new 大家都知道，根据构造函数生成新实例，这个时候生成的是**对象**，而不是基本类型。再看一个例子

```javascript
var a = new String('123')
var b = String('123')
var c = '123'
console.log(a==b, a===b, b==c, b===c, a==c, a===c)
>>> true false true true true false
console.log(typeof a)
>>> 'object'
```

我们可以看到 new 一个 String，出来的是对象，而直接字面量赋值和工厂模式出来的都是字符串。但是根据我们上面的分析大小相对固定可预期的即便是对象也可以存储在栈内存的，比如 null，为啥这个不是呢？再继续看

```javascript
var a = new String('123')
var b = new String('123')
console.log(a==b, a===b)
>>> false false
```

很明显，如果 a，b 是存储在栈内存中的话，两者应该是明显相等的，就像 null === null 是 true 一样，但结果两者并不相等，说明两者都是存储在堆内存中的，指针指向不一致。

### 5.null 是对象吗？

null 其实不是一个对象，尽管`typeof null` 输出的是`object`,但是这其实是一个 bug。在 js 最初的版本中使用的是 32 位系统，为了性能考虑地位存储变量的类型信息，`000`开头表示为对象类型，然而`null`为全 0，故而`null`被判断为对象类型。编程语言最后的形式都是二进制，所以 JavaScript 中的对象在底层肯定也是以二进制表示的。如果底层有前三位都是零的二进制，就会被判定为对象。底层中 null 的二进制表示都是零。所以在对 null 的类型判定时，发现其二进制前三位都是零，因此判定为 object。

### 6. typeof 是否正确判断类型? instanceof 呢？ instanceof 的实现原理是什么？

- typeof 是一个一元运算，放在一个运算数之前，运算数可以是任意类型。**它返回值是一个字符串，该字符串说明运算数的类型。**

```javascript
// typeof 判断基本数据类型:都可以判断， 除了null 意外
typeof undefined; // "undefined"
typeof "shuliqi"; // "string"
typeof false; // "boolean"
typeof 12; // "number"
typeof Symbol(); // "symbol"
typeof null; // "object"

// typeof 判断复杂数据类型: 不能判断复杂数据类型
// 除了typeof 函数是 “function”之外， 其他的都是返回“object”
typeof Array(); // "object"
typeof new Date(); //  "object"
typeof {}; // "object"
typeof function() {}; // "function"
```

- **instanceof** 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。

  语法：`object instanceof constructor` 看这个 object(对象)是否有构造函数的 prototype 属性

  参数：`object（`要检测的对象.）`constructor（`某个构造函数）

```javascript
// instanceof 是用来检车一个对象在它的原型链上是有一个构造函数的prototype属性
// object instanceof constructor
// 参数：object(要检测的对象)， constructor（某个构造函数）

// 1.如果通过 字面量 的方式创建字符串，那么无法通过 instanceof 判断某个变量是否是字符串
let str2 = "aaaa";
console.log(str2 instanceof String); // false
console.log(str2 instanceof Object); // false

// 2. 通过 new 方式，是可以使用 instanceof 判断 变量是否是字符串。
let str1 = new String("aaa");
console.log(str1 instanceof String); // true
console.log(str1 instanceof Object); // true
console.log(str1.__proto__ === String.prototype); // true
// 3. 复杂数据类型
const date = new Date();
console.log(date instanceof Date); // // true

const obj1 = new Object({ shu: "asa" });
console.log(obj1 instanceof Object); // true

const obj2 = { age: 12 };
console.log(obj2 instanceof Object); // true

const myFun1 = new Function();
console.log(myFun1 instanceof Function); //  true

const myFun2 = function() {};
console.log(myFun2 instanceof Function); //  true
```

- instanceof 的实现原理

```javascript
// instanceof 的实现原理, A instanceof B
function myInstanceof(A, B) {
  const O = B.prototype; // 构造函数B的prototype属性
  A = A.__proto__; // 取 A 的隐形原型
  while (true) {
    if (A === "null") {
      //已经找到顶层
      return false;
    }
    if (A === O) {
      //当 O 严格等于 L 时，返回 true
      return true;
    }
    A = A.__proto__;
  }
}

const a = [1, 2];
console.log(myInstanceof(a, Array)); // true

```

### 7. for of , for in 和 forEach,map 的区别。

- **for ... of**: 只要具有 interator 接口， 就可以使用 for...of 遍历他的属性值。

  - 数组的遍历器接口只返回具有数字索引的属性(数组原生具备 iterator 接口, 默认部署了 Symbol.iterator 属性)

  - 对于普通的对象, for...of 结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。

  - 可以中断循环

  - 可以使用 for ...of 遍历的数据结构：数组，Map 和 Set 接口，类似数组的对象。Generator 对象, 字符串。

    [Iterator 和 for...of 循环](https://es6.ruanyifeng.com/?search=Iterator&x=0&y=0#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF)

  ```javascript
  {
    let arr = ["shuliqi", "name"];
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
    let obj = { name: "shu", age: 12 };
    try {
      for (const item of obj) {
        console.log(item);
        // Uncaught TypeError: obj is not iterable, 抛错，因为普通对象没有 Iterator 接口
      }
    } catch (e) {
      console.log(e);
    }
  }
  ```

- **for...in:**遍历对象自身和继承的可枚举的属性，遍历的是属性名，可以中断循环

  ```javascript
  {
    let arr = ["shu", "li", 12];
    for (let key in arr) {
      console.log(key); // 0， 1， 2 遍历的属性名
    }
    arr.foo = 1000;
    for (let key in arr) {
      console.log(key); // 0， 1， 2, foo 遍历的属性名
    }

    let arr = ["shu", "li", 12];
    for (let key in arr) {
      if (key === 2) {
        break;
      }
      console.log(key); // 0， 1， 2 遍历的属性名 , 表示可以中断循环
    }
    //  注意:(因为for in 可以遍历自身和继承的属性名，所以hasOwnProperty 是用来判断一个属性名是否是自身的属性)
    let object = { name: "shu", age: 12 };
    for (const key in object) {
      console.log(key); // name, age
    }
  }
  ```

- **forEach：**只能遍历数组， 没有返回值（或认为返回值是 undefined)）,不能中断

  ```javascript
  {
    let arr = ["shu", "li"];
    const result = arr.forEach((item, index) => {
      console.log(item, index); //  shu ，0 li, 1
      item = item + 1;
    });
    console.log(result, arr); // undefined ,  arr = ["shu", "li"];
    // 表明没有改变原数组除非我们手动操作改变数组， 没有返回值。
  
    arr.forEach((item, index) => {
      console.log(item, index); //  shu ，0 li, 1, 表明不能中断循环
      if (index === 1) {
        return;
      }
    });
  }
  ```

- **map:** 只能遍历数组， 返回修改后的数组， 不能中断

  ```javascript
  {
    const arr = ["shu", "li"];
    const result = arr.map((item, index) => {
      return item + "haha";
    });
    console.log(arr, result); // ["shu", "li"], ["shuhaha", "lihaha"]
    // 说明： 愿数组没有改变，返回改变之后的数组
  }
  ```

- **Object.keys：**返回指定对象的的自身的可枚举属性的字符串数组

  ```javascript
  // Object.keys()
  {
    const arr = ["shu", "li"];
    const result = Object.keys(arr);
    console.log(result); // ["0", "1"]
  
    const obj = {
      name: "shuliqi",
      age: 12,
    };
    const result2 = Object.keys(obj);
    console.log(result2); //  ["name", "age"]
  }
  ```



---

以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是`for`循环。

```javascript
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
```

这种写法比较麻烦，因此数组提供内置的`forEach`方法。

```javascript
myArray.forEach(function (value) {
  console.log(value);
});
```

这种写法的问题在于，无法中途跳出`forEach`循环，`break`命令或`return`命令都不能奏效。

`for...in`循环可以遍历数组的键名。

```javascript
for (var index in myArray) {
  console.log(myArray[index]);
}
```

`for...in`循环有几个缺点。

- 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
- `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，`for...in`循环会以任意顺序遍历键名。

总之，`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。

`for...of`循环相比上面几种做法，有一些显著的优点。

```javascript
for (let value of myArray) {
  console.log(value);
}
```

- 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
- 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用。
- 提供了遍历所有数据结构的统一操作接口。

下面是一个使用 break 语句，跳出`for...of`循环的例子。

```javascript
for (var n of fibonacci) {
  if (n > 1000)
    break;
  console.log(n);
}
```

上面的例子，会输出斐波纳契数列小于等于 1000 的项。如果当前项大于 1000，就会使用`break`语句跳出`for...of`循环。



### 8.如何判断一个变量是不是数组？

- 使用**Array.isArray()**, 如果返回 true, 说明是数组。

- 使用 **...instanceof Array**, 如果返回 true, 说明是数组。

- 使用**Object.prototype.toString.call([1,2])**，如果返回”[object Array]“, 说明是数组。

- 使用**constructor**如果 arr.cunstructor = Array，说明是数组。constructor 属性返回构造该对象的数组函数的引用 注意：不是很准确， 因为有时候我们可以设置一个对象的 constructor 属性

  ```javascript
  const arr = ["shu", "li"];
  console.log(Array.isArray(arr)); // true
  console.log(arr instanceof Array); // true
  console.log(Object.prototype.toString.call(arr) === "[object Array]"); // true
  console.log(arr.constructor === Array); // true
  // constructor  不是很准确， 因为有时候我们可以设置一个对象的constructor属性
  const obj = {};
  console.log(obj.constructor === Array); // false
  obj.constructor = Array;
  console.log(obj.constructor === Array); // true
  ```

### 9. 类数组和数组的区别是什么？

- 类数组具有 length 属性,其他属性(索引)是非负整数
- 不具备数据所有的方法

类数组：函数的参数(arguments), Dom 对象列表，document.getquerySelectAll(),(getelementByTagName, document.querySelectorAll 等)的都是类数组

**类数组转数组的方法**

- Array.prototype.slice.call(likeArr)

  Array.prototype.slice.call(arguments) 将类数组转换为数组的原理
  关键是数组对象上的slice方法

  ```javascript
  function slice(start, end) { 
      var startToUse = start || 0, 
          endToUse = end || ToUint32(this.length), 
          result = []; 
      for(var i = startToUse; i < endToUse; i++) { 
          result.push(this[i]); 
      }
      return result; 
  }
  ```

- Array.from(likeArr)。Array.from 可以将类似数据的对象和具有 inerator 接口的对象转换转换成真正的数数组。

- [...likeArr]。只要具有 interator 接口的对象，都能使用扩展操作符转换成真正的数组。

```javascript
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
  test();
}
```

### 10. == 和 === 有什么区别？

=== 是不需要类型转换的，只要类型相同和值相同 才返回 true

== 如果两者的类型不同，则需要类型转换。转换的规则如下:

![image-20210528010335178](/Users/shuliqi/Library/Application Support/typora-user-images/image-20210528010335178.png)

```javascript
{
  // == 隐形转换
  {
    // 1.对象和布尔值进行比较时，对象先转换为字符串，然后再转换为数字，布尔值直接转换为数字
    console.log([] == true);

    // 结果：false
    // 转换流程
    String([]); // ""
    Number(""); // 0
    Number(true); // 1
    console.log(0 == 1); // false
  }
  {
    // 2.对象和字符串进行比较时，对象转换为字符串，然后两者进行比较
    console.log([1, 2, 3] == "1,2,3");

    // 结果：true
    // 转换流程
    String([1, 2, 3]); // '1,2,3'
    console.log("1,2,3" == "1,2,3"); //  true
  }
  {
    // 3.对象和数字比较时，对象转化为字符串,然后转换为数字，再和数字进行比较
    console.log([1] == 1);

    // 结果为true
    // 转换规则：
    String([1]); // "1"
    Number("1"); // 1
    console.log(1 == 1); //  true
  }
  {
    // 4.字符串和数字比较时，字符串转换为数字
    console.log("1" == 1);

    // true
    //  转换流程：
    String([1]); // "1"
    Number("1"); // 1
  }

  {
    // 5.字符串和布尔值进行比较时，二者全部转换成数值再比较
    console.log("1" == true);

    // true
    Number("1"); // 1
    Number(true); //  1
  }
  {
    // 6.布尔值和数字进行比较时，布尔转换为数字
    console.log(true == 1);

    // true
  }
  {
    // 7.特殊的比较
    console.log(undefined == undefined); // true
    console.log(null == null); // true
    console.log(null == undefined); // true
    console.log(+0 === -0); // true
    console.log(Number(null)); // 0
    console.log(Number(undefined)); // NaN
    console.log(NaN === NaN); // false
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
      name: "shulii",
    };
    const obj2 = obj1;
    obj2.name = "haha";
    console.log(obj1 == obj2, obj1 === obj2); // true, true
  }
}
```

**Object.is**. 是用来判断两个值是否相等。

Object.is 也不会进行类型的转换， 与 === 的区别是：

```javascript
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
```

### 11.ES6 中的 class 和 ES5 的类有什么区别？

https://shuliqi.github.io/2018/04/10/ES6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-Class/

测试掌握没

```javascript
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
}

{
  class People {
    constructor() {
      this.age = 38;
    }
  }
  People.sex = 30;

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

  // undefined 20
  // 原因：super.age 中的super是在普通方法中使用的，super指向分类的原型。父类的原型上没有age属性
}

{
  class A {
    p() {
      return 2;
    }
  }

  class B extends A {
    constructor() {
      super();
      console.log(super.p());
    }
  }

  let b = new B();

  // 2
}

{
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

  // undefined
}

{
  class Point {}
  class ColorPoint extends Point {}
  const shu = new ColorPoint();
}

{
  class A {}
  A.prototype.x = 2;

  class B extends A {
    constructor() {
      super();
      console.log(super.x);
    }
  }

  let b = new B();

  // 2
}

{
  class A {
    constructor() {
      this.x = 1;
    }
    print() {
      console.log(this.x);
    }
  }

  class B extends A {
    constructor() {
      super();
      this.x = 2;
    }
    m() {
      super.print();
    }
  }

  let b = new B();
  b.m();

  // 2
}

{
  class A {
    constructor() {
      this.x = 1;
    }
  }

  class B extends A {
    constructor() {
      super();
      this.x = 2;
      super.x = 3;
      console.log(super.x);
      console.log(this.x);
    }
  }

  let b = new B();

  // undefined 3
}

{
  class Parent {
    static myMethod(msg) {
      console.log("static", msg);
    }

    myMethod(msg) {
      console.log("instance", msg);
    }
  }

  class Child extends Parent {
    static myMethod(msg) {
      super.myMethod(msg);
    }

    myMethod(msg) {
      super.myMethod(msg);
    }
  }

  Child.myMethod(1);

  var child = new Child();
  child.myMethod(2);

  // static 1
  // instance 2
}

{
  class A {
    constructor() {
      this.x = 1;
    }
    static print() {
      console.log(this.x);
    }
  }

  class B extends A {
    constructor() {
      super();
      this.x = 2;
    }
    static m() {
      super.print();
    }
  }

  B.x = 3;
  B.m();

  // 3
}

{
  class A {}

  class B extends A {
    constructor() {
      super();
      console.log(super);
    }
  }

  // 报错
}

{
  class A {}

  class B extends A {
    constructor() {
      super();
      console.log(super.valueOf() instanceof B);
    }
  }

  let b = new B();

  // true
}

{
  var obj = {
    toString() {
      return "MyObject: " + super.toString();
    },
  };

  obj.toString();

  // MyObject: [object Object]
}
```

### 12. 数组的哪些 API 会改变原数组？

- **join()：** 将数组的元素的转换成字符串并拼接，最后返回这个字符串。与之相反的是： split()： 将字符串转成数组

  ```javascript
  // join()
  const arr = [6, 5, 9];
  console.log(arr); //  [6, 5, 9] 原数组不会改变
  console.log(arr.join()); // "6,5,9"
  console.log(arr.join("-")); // "6-5-9"
  //  与之相反的是： split()： 将字符串转成数组
  const str = "6-5-9";
  console.log(str.split("-")); // [ 6, 5, 9]
  ```

- **sort()**:将数组进行排序，默认是按照字母表排序 （会改变原数组）

  ```javascript
  // sort()
  {
    const arr = [6, 5, 9];
    const result = arr.sort();
    console.log(arr); //  [5, 6, 9] // 会改变原数组
    console.log(result); // [5, 6, 9] // 进行排序了
  }

  {
    // 按照从小到大排序
    const arr = [6, 5, 9];
    const result = arr.sort((a, b) => a - b);
    console.log(result);
  }

  {
    // 按照从大到小排序
    const arr = [6, 5, 9];
    const result = arr.sort((a, b) => b - a); // [9, 6, 5]
    console.log(result);
  }

  {
    // 不区分字母大小排序
    const arr = ["c", "B", "a", "f", "E"];
    const result = arr.sort((a, b) =>
      a.toLowerCase() > b.toLowerCase() ? 1 : -1
    );
    // toLowerCase(): 将字母转换成小写
    // toUpCase(): 将字母转换成大写
    console.log(result); //  ["a", "B", "c", "E", "f"]
  }
  ```

- **reverse()**:将数组进行倒序 （会改变原数组）

  ```javascript
  // reverse()
  const arr = [5, 4, 3, 2, 1];
  const result = arr.reverse();
  console.log(arr); // [1, 2, 3, 4, 5] 说明会改变原数组
  console.log(result); // [1, 2, 3, 4, 5]
  ```

- **concat()**:链接两个数组， 形成一个新的数组，旧的数组不变（不会改变原数组）

  ```javascript
  // concat()
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  const result = arr1.concat(arr2);
  console.log(arr1); // [1, 2, 3] 说明不会改变旧数组
  console.log(arr2); // [4, 5, 6] 说明不会改变旧数组
  console.log(result); // [1, 2, 3, 4, 5, 6]
  ```

- **slice():**返回数组的一个片段，接受两个参数， 第一个参数表示指定片段的起始位置(数组的下标)，第二个参数表示结束位置（但不包含元素)。如果是负数的话， 表示倒数。 （不会改变）。如果不传参数， 直接返回原数组。

  ```javascript
  // slice()
  const arr = [1, 2, 3, 4, 5];
  const result = arr.slice(1, 2);
  const result2 = arr.slice(1, -1);
  console.log(arr); // [1, 2, 3, 4, 5]; //  不会改变原数组
  console.log(result); // [2]

  console.log(result2); // [2, 3, 4]
  ```

- **splice():** 接受至少 2 个参数， 第一个：删除元素的起始位置(下标)，第二个参数：删除的个数，之后的数据就是插入的。最后返回被删除的元素形成的数组。 （ 会改变原数组）

  ```javascript
  {
    // splice()
    const arr = [1, 2, 3, 4, 5];
    const result = arr.splice(1, 2, 3);
    console.log(arr); // [1, 3, 4, 5] // 表示会改变原数组
    console.log(result); // [2, 3]
  }
  ```

- **shift()：** 删除数组的第一个元素，返回删除的元素。（ 会改变原数组）

  ```javascript
  {
    // shift()
    const arr = [1, 2, 3, 4, 5];
    const result = arr.shift();
    console.log(arr); // [2, 3, 4, 5] // 会改变原数组
    console.log(result); // 1 // 返回被删除的元素
  }
  ```

* **unshift()：**添加元素的到数组的第一位， 返回新数组的长度。（ 会改变原数组）

  ```javascript
  {
    // shift()
    const arr = [1, 2, 3, 4, 5];
    const result = arr.unshift(5);
    console.log(arr); // [5, 1, 2, 3, 4, 5] // 会改变元素组
    console.log(result); // 6 // 返回新数组的长度
  }
  ```

* **pop():**删除元素的最后一个元素。并返回删除的元素。（ 会改变原数组）

  ```javascript
  {
    // pop
    const arr = [1, 2, 3, 4, 5];
    const result = arr.pop();
    console.log(arr); // [1, 2, 3, 4]
    console.log(result); // 5
  }
  ```

* **push()：**在数组的尾部添加一个元素。并返回新的数组的长度。（ 会改变原数组）

  ```javascript
  {
    // push
    const arr = [1, 2, 3, 4, 5];
    const result = arr.push(6);
    console.log(arr); // [1, 2, 3, 4, 5, 6]
    console.log(result); // 6
  }
  ```

* **forEach()：**遍历数组的每个元素， 每个元素调用一个函数。函数第一个参数：该元素本身，第二个元素：元素的下标。第三个元素：数组本身。没有返回数。不能被中断

  ```javascript
  {
    // forEach
    const arr = [1, 2, 3, 4, 5];
    const result = arr.forEach((item, index, shelf) => {
      console.log("item", item);
      console.log("index", index);
      console.log("index", shelf);
    });
    console.log(result); // undefined  表示没有返回值
  }
  ```

* **map():**遍历数组的每个元素， 每个元素调用一个函数。函数第一个参数：该元素本身，第二个元素：元素的下标。第三个元素：数组本身。有返回值，不会改变原来数组。

  ```javascript
  {
    // map
    const arr = [1, 2, 3, 4, 5];
    const result = arr.map((item, index, shelf) => {
      return item + 1;
    });
    console.log(arr); // [1, 2, 3, 4, 5]; 表示原数组没有改变
    console.log(result); // [2, 3, 4, 5, 6]; 表示有返回值
  }
  ```

* **filter()：**返回数组的一个子集。

  ```javascript
  {
    // filter
    const arr = [1, 2, 3, 4, 5];
    const result = arr.filter((item) => {
      return item > 2;
    });
    console.log(arr); // [1, 2, 3, 4, 5]; 表示原数组没有改变
    console.log(result); // [3, 4, 5]; 表示有返回值
  }
  ```

- 数组的方法

  ```javascript
  // join() ---> 不会改变
  const arr = [1, 2, 3];
  console.log(arr.join());
  console.log(arr.join("-"));
  console.log(arr); // 不会改变原数组
  
  const str = "1,2,3";
  console.log(str.split(","));
  
  // sort() 排序，默认是按字母表排序----会改变原数组
  
  const arr = [4, 1, 2, 3];
  const result = arr.sort();
  // console.log(arr, result);
  // 从小到达排序
  arr.sort((a, b) => a - b);
  console.log(arr);
  // 从大到小
  arr.sort((a, b) => b - a);
  console.log(arr);
  // 不区分字母大小
  const arr = ["f", "G", "B", "a", "C"];
  arr.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
  console.log(arr);
  
  // reverse() 倒叙 ---> 会改变数组
  const arr = [1, 2, 3];
  arr.reverse();
  console.log(arr);
  
  // [3,2,1]
  
  // concat() ---> 链接数组-- > 不会改变原数组
  const a1 = [1, 2],
    a2 = [3, 4, 5];
  const newArr = a1.concat(a2);
  console.log(newArr, a1, a2);
  
  // [1,2,3,4,5]   [1,2]  [3,4,5]
  
  // slice(index1, index2)// 返回数组的一个片段，第一个参数，起始下标
  // 第二个参数，终止下标（但不包含改元素）。不会改变原数组
  const a = [1, 2, 3, 4, 5, 6];
  const arr = a.slice(1, 2);
  console.log(a, arr);
  
  // [1,2,3,4,5,6] [2]
  
  // splice(), 删除和添加元素，第一个参数，是删除元素的起始位置
  // 第二个参数是删除的个数
  // 之后的参数都是添加的元素。从删除的地方开始添加
  // 返回被删除的元素的数组
  // 会改变原数组
  const a = [1, 2, 3, 3, 4];
  const deletArr = a.splice(1, 1, 5, 6, 7);
  console.log(deletArr);
  console.log(a);
  
  // [2]  [1,5,6,7,3,3,4]
  
  // push()  像数组末尾添加元素，返回新新的数组的长度--改变原数组
  const a = [1, 2];
  const lenth = a.push(3);
  console.log(lenth);
  console.log(a);
  
  // 3 [1,2,3]
  
  // pop()； 数组的末尾删除一个元素，返回被删除的元素， 会改变原数组
  const a = [1, 2, 3, 4];
  const del = a.pop();
  console.log(a, del);
  // [1,2,3] 4
  
  // unshift() 向头部添加一个元素，返回数组的长度，会改变原数组
  const a = [2, 3, 4];
  const len = a.unshift(1);
  console.log(a, len);
  
  // [1,2,3,4] 4
  
  // shift() 头部删除一个元素， 返回删除的元素，会改变原数组
  const a = [1, 2, 3];
  const de = a.shift();
  console.log(de, a);
  // 1 [2,3]
  
  // forEach() 编辑数组， 没有返回值，不改变原数组
  ```

### 13.let、const 以及 var 的区别是什么？

- let 和 const 定义的变量不会出现变量提升，var 定义的变量会出现变量提升。
- let 和 const 是 js 中的块级作用域。
- let 和 const 不能重复声明（会抛出错误）
- let 和 const 没有定义就使用会出现暂时性死区，而 var 不会。
- const 声明的变量只是一个只读常量，如果声明的是一个对象， 那么就不能改变对象的引用地址。

### 14.在 JS 中什么是变量提升？什么是暂时性死区？

变量提升：变量提升是指在变量声明之前就可以使用，值为 undefined。

暂时性死区：在代码块中，使用 let/const 声明的变量之前，这些变量是不可用的（会抛出错误），这种在语法上就是成为暂时性死区。

```javascript
typeof x; // ReferenceError(暂时性死区，抛错)
let x;
```

```javascript
typeof y; // 值是undefined,不会报错
```

暂时性死区的本质：只要进入到当前作用域中，所要使用的变量就已经存在了， 但是不可获取，只有等到变量声明之后才能获取和使用。

### 15.如何正确的判断 this? 箭头函数的 this 是什么？

https://shuliqi.github.io/2018/07/02/%E5%85%B3%E4%BA%8Ethis%E7%9A%84%E6%8C%87%E5%90%91%E9%97%AE%E9%A2%98/

**注意：**setInterval和setTimeout的回调函数中this的指向都是window。这是因为JS的定时器方法是定义在window下的。但是平时很多场景下

**测试：**

```javascript
function getName() {
  console.log(this.name);
}
var name = "shuliqi";
getName();

//shuliqi
```

```javascript
function getName() {
  console.log(this.name);
}
var name = "shuliqi";
window.getName();

// shuliqi
```

```javascript
function getName() {
  console.log(this.name);
}
var person = {
  name: "shuliqi2222",
  getName: getName,
};
var name = "shuliqi11111";
person.getName();

// shuliqi2222
```

```javascript
function getName() {
  console.log(this.name);
}
var person1 = {
  name: "shuliqi11111",
  getName: getName,
};
var person2 = {
  name: "shuliqi2222",
  person: person1,
};
var name = "shuliqi";
person2.person.getName();

// shuliqi11111
```

```javascript
function getName() {
  console.log(this.name);
}
var person1 = {
  name: "shuliqi11111",
  getName: getName,
};
var person2 = {
  name: "shuliqi2222",
  person: person1,
};
var name = "shuliqi";
var logName = person2.person.getName;
logName();

// shuliqi
```

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person1 = {
  name: "YvetteLau",
  sayHi: function() {
    setTimeout(function() {
      console.log("Hello,", this.name);
    });
  },
};
var person2 = {
  name: "Christina",
  sayHi: sayHi,
};
var name = "Wiliam";
person1.sayHi();
setTimeout(person2.sayHi, 100);
setTimeout(function() {
  person2.sayHi();
}, 200);

// Hello, Wiliam
// Hello, Wiliam
// Hello, Christina
```

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "YvetteLau",
  sayHi: sayHi,
};
var name = "Wiliam";
var Hi = person.sayHi;
Hi.call(person);

// Hello, YvetteLau
```

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "YvetteLau",
  sayHi: sayHi,
};
var name = "Wiliam";
var Hi = function(fn) {
  fn();
};
Hi.call(person, person.sayHi);

// Hello, Wiliam
```

```javascript
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "YvetteLau",
  sayHi: sayHi,
};
var name = "Wiliam";
var Hi = function(fn) {
  fn.call(this);
};
Hi.call(person, person.sayHi);

// Hello, YvetteLau
```

```javascript
function getName() {
  console.log(this.name);
}
var person = {
  name: "shuliqi11111",
  getName: getName,
};
var hi = function(fn) {
  fn();
};
var name = "shuliqi";
hi.call(null, person.getName);

//  shuliqi
```

```javascript
function Fn() {
  this.name = "shuliqi";
}
var newFn = new Fn();
console.log(newFn.name);

// shuliqi
```

```javascript
var person = {
  name: "shuliqi11111",
  getName() {
    var logName = () => {
      console.log(this.name);
    };
    logName();
  },
};
person.getName();

// shuliqi11111
```

### 16.词法作用域和 this 的区别

- 词法作用域是由你在写代码的时候将变量和块级作用域写在哪里来决定的
- 看上一题

### 17.谈谈你对 JS 执行上下文栈和作用域链的理解。

**执行上下文：**执行上下文就是指 js 代码被解析和执行时所在的环境。

**全局执行上下文** — 这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 `this` 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。

**函数执行上下文** — 每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤。

**执行栈：** 执行栈，也就是在其它编程语言中所说的“调用栈”，是一种拥有 LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。

---

---

---- 以下的重复了， 可以不看-----------

执行上下文就是当前 JavaScript 代码被解析和执行时所在环境, JS 执行上下文栈可以认为是一个存储函数调用的栈结构，遵循先进后出的原则。

- JavaScript 执行在单线程上，所有的代码都是排队执行。
- 一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
- 每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行-完成后，当前函数的执行上下文出栈，并等待垃圾回收。
- 浏览器的 JS 执行引擎总是访问栈顶的执行上下文。
- 全局上下文只有唯一的一个，它在浏览器关闭时出栈。

作用域链: 无论是 LHS 还是 RHS 查询，都会在当前的作用域开始查找，如果没有找到，就会向上级作用域继续查找目标标识符，每次上升一个作用域，一直到全局作用域为止。

注：如果查找的目的是对变量进行赋值，那么就会使用 LHS 查询；如果目的是获取变量的值，就会使用 RHS 查询

### 18.什么是闭包？闭包的作用是什么？闭包有哪些使用场景？

<<<<<<< HEAD
##### 测试
=======
[JavaScript中的闭包](https://shuliqi.github.io/2018/10/23/JavaScript%E4%B8%AD%E7%9A%84%E9%97%AD%E5%8C%85/)

概念：当函数可以记住并且可以访问它所在的词法作用域，就产生了闭包，即使这个函数不在当前的作用域执行。

##### 测试掌握了没
>>>>>>> a06f4084381cd06e91cbe67c21e0c99168dfec04

```javascript
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function() {
    return function() {
      return this.name;
    };
  },
};
console.log(object.getNameFunc()());
```

结果：The Window

解析：object.getNameFunc() 其实就是一个函数，object.getNameFunc()()就是执行了这个函数，如：

```javascript
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function() {
    return function() {
      return this.name;
    };
  },
};
const fun = object.getNameFunc();
console.log(fun());
```

关于 this 的指向，这时候是的 this 是默认绑定方式，不懂 this 指向可以看 [this 指向](https://shuliqi.github.io/shuliqi.github.io/2018/07/02/%E5%85%B3%E4%BA%8Ethis%E7%9A%84%E6%8C%87%E5%90%91%E9%97%AE%E9%A2%98/)。所以当前的 this 指的是 windown

```javascript
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function() {
    var that = this;
    return function() {
      return that.name;
    };
  },
};
console.log(object.getNameFunc()());
```

结果： My Object

解析：getNameFunc 函数中的 this 是指向当前的 object,被赋值给了 getNameFunc 函数中的局部变量 that。getNameFunc 函数返回了一个函数，形成了一个闭包，导致当前局部变量 that 一直记在内存中，没有被垃圾回收。 所有执行这个返回的函数的时候 that 局部变量就是当前的 object 对象，所以输出了 object 的那么属性。

### 19 谈谈原型链的理解

[JavaScript中的原型链](http://localhost:4000/2018/06/01/JavaScript%E4%B8%AD%E7%9A%84%E5%8E%9F%E5%9E%8B%E9%93%BE/#%E8%B0%83%E5%AF%B9%E8%B1%A1%E5%92%8C%E5%87%BD%E6%95%B0%E5%AF%B9%E8%B1%A1)

### 19.call、apply 有什么区别？call,aplly 和 bind 的内部是如何实现的？

call 和 apply 的功能相同，区别在于传参的方式不一样:

- call(对象, a,b,c,)

  第一个参数是绑定的 this 值

  第二个参数之后，都是参数

  立即调用

  ```javascript
  const obj = {
    name: "shuliqi",
    age: 12,
  };
  function get(sex, size) {
    console.log(this.name, this.age, sex, size);
  }
  get.call(obj, "女", "成年");
  // shuliqi 12 女 成年
  ```

* apply(对象, [1,2,3])

  第一个参数就是绑定的 this 值

  第二参数是一个数组 参数数组

  立即调用

  ```javascript
  const obj = {
    name: "shuliqi",
    age: 12,
  };
  function get(sex, big) {
    console.log(this.name, this.age, sex, big);
  }
  get.apply(obj, ["女", "成年"]);
  
  // shuliqi 12 女 成年
  ```

- bind(对象)

  第一个参数是绑定的 this 值

  第二个以后的参数都是实参

  不会立即调用， 而是返回一个新的函数。供之后调用

  ```javascript
  const obj = {
    name: "shuliqi",
    age: 12,
  };
  function get(sex, big) {
    console.log(this.name, this.age, sex, big);
  }
  const test = get.bind(obj, "女", "成年");
  test();
  // shuliqi 12 女 成年
  ```

  ##### call 的实现

  - 新加一个函数， 让当前调用的函数的数的 this 指向增新的函数
  - 执行新函数
  - 删除新函数
  - 返回结果

  ```javascript
  Function.prototype.myCall = function(thisObj, ...args) {
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
  ```

  https://www.jianshu.com/p/af945ea77b44

  ```javascript
  // 实现的原理
  const obj = {
    name: "shuliqi",
    getName: function() {
      console.log(this.name); // shuliqi
    },
  };
  obj.getName(); // this的指向是隐式指向， 指定调用它的函数
  
  Function.prototype.MyCall = function(thisObj, ...args) {
    const fn = Symbol("函的函数名"); // 为了防止与obj里面的函数重名
    thisObj[fn] = this; // this就是指向当前调用MyCall方法的函数；
    thisObj[fn](...args); // 调用call的时候是会立即调用的，所以执行
    delete thisObj.fn; // 记得删除新家的函数
  };
  const obj = {
    name: "shuliqi",
  };
  function getName(age) {
    console.log(this.name, age);
  }
  getName.MyCall(obj, 18);
  ```

##### apply 的实现

和 call 实现的差不多， 只是传入的参数不同而已

```javascript

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

```

https://www.jianshu.com/p/af945ea77b44

```javascript
Function.prototype.MyApply = function(thisObj, args) {
  const fn = Symbol();
  thisObj[fn] = this; // this就是指向当前调用MyApply方法的函数；
  thisObj[fn](...args); // 调用MyApply的时候是会立即调用的，所以执行
  delete thisObj[fn]; // 记得删除新加的函数
};

const obj = {
  name: "shuliqi",
};
function getName(age) {
  console.log(this.name, age);
}
getName.MyApply(obj, [18]);
```

##### bind 的实现

```javascript
Function.prototype.myBind = function(thisObj, ...args1) {
  if (typeof this !== "function") {
    throw Error("调用的应该是一个函数");
  }
  const _this = this;
  function Fn() {}
  Fn.prototype = this.prototype;
  let bound = function(...args2) {
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
  this.getPerson = function() {
    console.log(name, this.age);
  };
}
const newTest = test.myBind(obj, "shuliqi");
newTest(); // my is test
const myNewTest = new newTest();
myNewTest.getPerson(); // shuliqi 12
```

https://blog.csdn.net/tangzhl/article/details/79669461

https://zhuanlan.zhihu.com/p/38968174

```javascript
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
```

### 20.什么是函数柯里化？实现 sum(1)(2)(3) 返回结果是 1,2,3 之和

```javascript
function sum(x) {
  return function(y) {
    return function(z) {
      return x + y + z;
    }
  }
}
// 采用闭包，将函数返回，使其持有多当前词法作用域的引用
console.log(sum(1)(2)(3)); // 6
```

[函数柯里化](https://shuliqi.github.io/2018/10/05/%E4%BB%80%E4%B9%88%E6%98%AF%E5%87%BD%E6%95%B0%E6%9F%AF%E9%87%8C%E5%8C%96/)

```javascript

function curry(fn, args = []) {
  return function() {
    const rest = [...args, ...arguments];
    // 如果当前的参数小于 函数的 参数， 那么继续递归 返回一个函数
    if (rest.length < fn.length) {
      return curry(fn, rest);
    } else {
      // 执行函数， 执行完之后， 得把值返回回去
      return fn.apply(null, rest);
    }
  }
}

function sum(x,y,z) {
  return x +y + z;
};
const addCurry = curry(sum);
console.log(addCurry(1)(2)(3)); // 6
```



### 21.截流和防抖函数

```javascript
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

function handle() {
  console.log("111");
}
window.addEventListener('resize', debounce(handle, 1000, false))
```







[https://shuliqi.github.io/2018/04/16/Debounce%E5%92%8CThrottle%E7%9A%84%E5%8E%9F%E7%90%86%E5%8F%8A%E5%AE%9E%E7%8E%B0/](https://shuliqi.github.io/2018/04/16/Debounce和Throttle的原理及实现/)

### 22.继承

最新的方法， 看这个即可：

#### 原型链继承

```javascript
function People(name) {
  // 父类实例属性
  this.name = name;
  // 父类实例方法
  this.getName = function() {
    console.log("父类实例的方法：", this.name);
  };
}
// 父类原型属性
People.prototype.age = 18;
// 父类原型属方法
People.prototype.getAge = function() {
  console.log("父类原型方法", this.age);
};

/**
 * 原型链继承： 子类的原型指向父类的实例
 */
function MyPeople() {}
MyPeople.prototype = new People("舒丽琦");

// 测试
const mypeople = new MyPeople();
console.log("父类实例的属性：", mypeople.name);
console.log("父类原型的属性：", mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： 18
// 父类实例的方法： 舒丽琦
// 父类原型方法 18
```

**优点：**

- 父类实例和原型都继承到了。

**缺点：**

- 在创建子类实例的时候， 无法给父类传参
- 子类的属性和方法只能在执行了构造函数(`MyPeople.prototype = new People('舒丽琦');`)之后才能创建；

为了解决不能传参的缺点，可以有如下的继承

#### 构造函数继承

```javascript
function People(name) {
  // 父类实例属性
  this.name = name;
  // 父类实例方法
  this.getName = function() {
    console.log("父类实例的方法：", this.name);
  };
}
// 父类原型属性
People.prototype.age = 18;
// 父类原型属方法
People.prototype.getAge = function() {
  console.log("父类原型方法", this.age);
};

/**
 * 构造继承： 在子类的构造函数里面复制父类实例的属性和方法
 */
function MyPeople(name) {
  // 可以向父类构造函数传参数
  People.call(this, name);
}
// 测试
const mypeople = new MyPeople("舒丽琦");
console.log("父类实例的属性：", mypeople.name);
console.log("父类原型的属性：", mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： undefined
// 父类实例的方法： 舒丽琦
// 父类原型方法 undefined
```

##### 优点：

- 在创建子类实例的时候可以穿参数

##### 缺点：

- 不能继承父类原型的属性和方法

#### 组合模式：

这种方式可以解决不能传参和不能继承父类原型的属性和方法

```javascript
function People(name) {
  // 父类实例属性
  this.name = name;
  // 父类实例方法
  this.getName = function() {
    console.log("父类实例的方法：", this.name);
  };
}
// 父类原型属性
People.prototype.age = 18;
// 父类原型属方法
People.prototype.getAge = function() {
  console.log("父类原型方法", this.age);
};

/**
 * 组合模式： 原型链继承 + 苟晗函数继承
 *
 * */

function MyPeople(name) {
  People.call(this, name);
}
MyPeople.prototype = new People();

// 测试
const mypeople = new MyPeople("舒丽琦");
console.log("父类实例的属性：", mypeople.name);
console.log("父类原型的属性：", mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： 18
// 父类实例的方法： 舒丽琦
// 父类原型方法 18
```

##### 优点：

- 既可以传参，父类原型和父类实例都可以继承

##### 缺点：

- 父类实例的属性和方法被实例化了两份（耗内存）

#### 寄生组合方式

```javascript
/**
 * 寄生组合方式：为了解决父类实例实例化两份的
 */

function MyPeople(name) {
  People.call(this, name);
}
(function() {
  const fn = function() {};
  fn.prototype = People.prototype;
  MyPeople.prototype = new fn();
})();
// 测试
const mypeople = new MyPeople("舒丽琦");
console.log("父类实例的属性：", mypeople.name);
console.log("父类原型的属性：", mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： 18
// 父类实例的方法： 舒丽琦
// 父类原型方法 18
```

#### 实例继承

```javascript
/**
 * 实例继承
 */
function MyPeople(name) {
  const instance = new People(name);
  return instance;
}
// 测试
const mypeople = new MyPeople("舒丽琦");
console.log("父类实例的属性：", mypeople.name);
console.log("父类原型的属性：", mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： 18
// 父类实例的方法： 舒丽琦
// 父类原型方法 18
```

缺点： 实例是父类的实例，不是子类的实例

### 24.加载

#### 异步加载 js 的方法

- defer 属性

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title></title>
      <meta charset="UTF-8" />
    </head>
    <script>
      window.onload = function() {
        console.log("window.onload");
      };
    </script>
    <script src="https://shuliqi.github.io/xiaozhan/1.js" defer></script>
    <script>
      console.log("normal");
    </script>
    <body></body>
  </html>
  ```

  normal，shuliqi，window.onload

遇到有 defer 的 script 标签，浏览器会开一个新的线程去加载 js，但是浏览器会继续解析和加载 html，加载的 js 执行 会在 window.on;oad

之前，其他没有 defer 属性的标签之后；

- async 属性

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title></title>
      <meta charset="UTF-8" />
    </head>
    <script>
      window.onload = function() {
        console.log("window.onload");
      };
    </script>
    <script src="https://shuliqi.github.io/xiaozhan/1.js" async></script>
    <script>
      console.log("normal");
    </script>
    <body></body>
  </html>
  ```

  和 derfer 一样，也会开一个新的线程去下载， 但是不同的是， js 下载好了就会立刻执行， 不会等 dom 解析完之类的

- 动态加载 js： src 赋值的时候，并不会去加载， 只有被添加的时候才会加载

- 利用 XHR 异步加载 js 内容并执行

  ```javascript
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <title></title>
      <meta charset="UTF-8">
  </head>
  <script>
      var xhr = new XMLHttpRequest();
      xhr.open("get", "js/defer.js",true)
      xhr.send();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              eval(xhr.responseText);
          }
      }
  </script>
  <body>
  </body>
  </html>
  ```

### 26.跨域

跨域的原因：浏览器的同源策略（端口， 协议，域名）限制了不是同一个源的脚本不能访问另一个源的资源。

为什么有这个限制：如果没有同源策略，浏览器很容易收到 XSS, CSFR 等攻击.

XSS 攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序

CSRF, 跨站请求伪造， 攻击者盗用了你的身份，以你的名义发送恶意请求

**同源策略限制的行为**

- cookie, local storage, indexdb 无法获取
- ajax 请求无法发出
- DOM 和 JS 对象无法被捕获到

#### 解决跨域的方法

- **Jsonp 方式**

  **原理:**script 标签不受同源策略的影响，可以动态创建 script 标签

  ```javascript
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "shuliqi.com:80/?name=shuliqi&age=12&callback=handelCallback";
  document.body.appendChild(script);
  function handelCallback() {
    // 处理后端返回的
  }
  ```

  **缺点：**只支持 get 请求

* **document.domain + iframe 跨域**

  **限制条件**： 同主域， 不同子域

  shuliqi.com/a.html

  ```html
  <iframe src="shuliqi.com/b.html"></iframe>
  <script>
    document.domain = "do main";
    var nage = "shuliqi";
  </script>
  ```

  shuliqi.com/b.html

  ```html
  <script>
    document.domain = "do main";
    // 获取腹肌窗口的变量
    alert(window.parent.name);
  </script>
  ```

- **location.hash + ifrema**

  可以在不同域名跨域了

  **原理：**hash 的改变不会导致页面的刷新

  **实现：** A 域下：a.html， c.html。B 域下： b html, 现在 a.html 想和 b.html 交换信息， 由于同源策略是不可以修改信息的，就 a.html 传给 b.html 页面的 hash 值，b.html 页面获取到， 但是 a.html 与 b.html 是不同域的，不能进行通信， 没办法获取啊，html 的变量，函数等。所以需要与 a.html 同域的 c.html 做一个代理

  A 域：a.html

  ```html
  <iframe id="iframe" , src="B.com/b.html"></iframe>
  <script>
    const iframe = document.getelementById("ifame");
    setTimout(() => {
      // 向b.html传递hash值
      iframe.src = iframe.src + "#user=name";
    }, 1000);

    // 开放给c.html的回调函数
    function handleCallback(res) {
      console.log("data from c.html" + res);
    }
  </script>
  ```

  B 域：b.html

  ```html
  <iframe id="iframe" , src="A.com/C.html"></iframe>
  <script>
    const iframe = document.getelementById("ifame");
    // 监听a.html传过来的hash值
    window.onhashchange = function() {
      // 向C.html传递hash值
      iframe.src = iframe.src + location.hash;
    };
  </script>
  ```

  A 域： c.html

  ```html
  <script>
    window.onhashchange = function() {
      window.parent.parent.handleCallback(
        "我调用a.html的回道函数" + location.hash.replace('#nahe="hahahah"')
      );
    };
  </script>
  ```

  **缺点：** url 暴露出来了， 而且 hash 的长度是有限制的。

- **window.name +iframe**

  **原理：**window.name 在不同的页面，甚至不同域加载之后依然存在，并且可以支持非常长的 name 值

  A 域 a.html proxy.html B 域的 b.html 。

  实现：b.html 设置 window.name。a.html 创建 iframe, src 指向 b.html。但是 a.html 和 b.html 不同域名。无法通过 ifame.contentWindow.name 获取 那么值。 所以就借助 proxy.html。在 rsc.指向 b.html 之后，迅速改 src 指向 proxy.html。这样就是同域的了。就可以获取 name 值了。每次触发 onload 时间后，重置 src，相当于重新载入页面，又触发 onload 事件，于是就不停地刷新了（但是需要的数据还是能输出的

  a.html

  ```html
  <script>
    let state = 0;
    const ifame = window.createElement("ifame");
    ifame.src = "b.html";
    // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
    ifame.onload = function() {
      if (state === 0) {
        // 第1次onload(跨域页)成功后，切换到同域代理页面
        state = 1;
        iframe.contentWindow.location = "proxy.html";
      } else if (state === 1) {
        // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
        var data = JSON.parse(iframe.contentWindow.name);
        console.log(data);
        iframe.contentWindow.document.write("");
        iframe.contentWindow.close();
        document.body.removeChild(iframe);
      }
    };
    document.body.appendChild(iframe);
  </script>
  ```

  proxy.html 是一个空页面

  b.html

  ```html
  <script>
    window.name = "shuliqi";
  </script>
  ```

- **post.message()**

  只支持到 IE8 及以上的 IE 浏览器，其他现代浏览器当然没有问题。

  不受同源策略的限制

  1. 接收数据方：

     ```javascript
     /*
      * postMessage.js中的数据放在的消息队列里，监听message获取到消息
      *
      */
     window.addEventListener("message", function(event) {
       if (event.origin != "http://127.0.0.1:8848") {
         alert("跨域访问，不接受");
       } else {
         //同源的地址
         console.log("event.origin:", event.origin);
         console.log(event.data);
         document.querySelector("#result").innerHTML = event.data;
       }
     });
     ```

  2. 发送数据方：

     ```javascript
     var userData = [
       {
         id: 0,
         name: "张三",
       },
     ];
     window.postMessage(JSON.stringify(userData));
     ```

- CORS： 跨域资源共享

  前端和后端一起配合， 具体说来就是在 header 中加入 origin 请求头字段，同样，在响应头中，返回服务器设置的相关 CORS 头部字段，Access-Control-Allow-Origin 字段为允许跨域请求的源。请求时浏览器在请求头的 Origin 中说明请求的源，服务器收到后发现允许该源跨域请求，则会成功返回

  ![img](https://img-blog.csdn.net/20180914181520131?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2JhZG1vb25j/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

请求方式使用下列方法之一：GET，HEAD，POST

Content-Type 的值仅限于下列三者之一：text/plain，multipart/form-data

### 27.ajax

#### 实现一个 ajax

```javascript
const xhr = new XMLHttpRequest();
// 必须在调用 open()之前指定 onreadystatechange 事件处理程序才能确保跨浏览器兼容性
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || xhr.status <= 300 || status === 304) {
      console.log('成功拿到数据：', responseText)
    } else {
      console.log('出错了：'status)
    }
  }
}
//  第三个参数表示异步请求
xhr.open('get','https://i2', true)
xhr.send(null)
```

#### ajax 的状态

0 未初始化。表示还没有调用 open()函数

1.初始化。已经调用 open()函数，但是还没有调用 send()函数

2.发送。已经调用 send()函数，但是还没收到响应

3.接收。接收到部分响应

4.完成。接收到全部反应

#### 将原生的 ajax 封装成 promise

```javascript
const ajax = (method, url, async, data) => {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSOM.parse(xhr.responseText);
        } else if(xhr.status > 400) {
            reject("发生错误");
          }
      }
    }
    xhr.open(method, url, async);
    xhr.send(data || null);
  })
}
```

### 28. 垃圾回收

#### 什么是内存泄漏

内存泄漏就是指：不再使用的内存， 没有得到及时的释放。没有得到释放的结果就是导致系统变慢。

#### 什么是垃圾回收

垃圾回收机制就是间歇的不定期的对这些不在使用的变量， 释放它们占用的内存。

#### 变量的生命周期

全局变量在浏览器关闭之后会被清除， 局部变量会在函数执行完毕之后被释放。

#### 垃圾回收的方式

##### 标记清除

垃圾收集器会在当所有的变量进入环境的时候都标记一下，例如"进入环境"， **去除环境中的变量以及被环境中的变量引用的变量**。再此之后再被标记上的就是待释放内存的变量。

##### 引用计数

### 29 eval 是什么

eval()方法就是解析并且执行 js 字符串

- 性能很差： js 引擎会在编译阶段对很多项的优化， 其中有一些项目就是对代码进行静态的词法分析。预先确定变量和函数的位置，在执行的时候才能找到标识符，
- 无法在词法分析的阶段明确知道 eval()会接收到什么代码。所以无法做词法分析。
- 欺骗作用域：在严格的模式下。 Eval（）在执行代码的时候室友自己的词法作用域的。意味着其中的变量无法修改所在的作用域。

## 30 如何监听对象的属性

#### [ES5 :Object.defineProperty()](https://shuliqi.github.io/2018/02/19/%E6%B7%B1%E5%85%A5%E4%BA%86%E8%A7%A3Object-defineProperty/)

#### [new Proxy()](https://shuliqi.github.io/2018/03/05/ES6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-Proxy/#get-%E6%96%B9%E6%B3%95)

### 31 如何实现私有变量

```javascript
function Pclass() {
  //注意：这里不用this
  const name = "私有变量";
  this.getName = () => {
    console.log("私有获取name的方法：", name);
  };
  this.age = "变量age，外部可以访问";
}
const pclass = new Pclass();
console.log(pclass.name); // undefined
console.log(pclass.getName()); // 私有获取name的方法： 私有变量
console.log(pclass.age); // 变量age，外部可以访问
```

### 32 new 操作符都干了什么

```javascript
var fn = function () { };
var fnObj = new fn();
```

- 创建一个空对象

  ```javascript
  const obj = new Object();
  ```

- 空对象的\__proto__指向指向构造函数的 prototyp（继承原型）

  ```javascript
  obj.__prpto__ = fn.prototype;
  ```
  
- 将构造函数的this指向obj，并且执行（目的是为了得到实例上的属性和方法）

  ```javascript
  const result = fn.call(obj);
  ```
  
- 如何构造函数有返回对象， 则返回该对象。如果没有则返新创建的obj

  ```javascript
  if ( typeof result === 'object') {
  	return result
  } else {
  	return obj;
  }
  ```

### 33 数组去重

**includes 方式**

```javascript
function unique(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      // 如果结果集里面没有这个选项，则加上ß
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(unique([1, "1", 2, 3, 3, 5, 5, 6, 6])); // [ 1, '1', 2, 3, 5, 6 ]
```

**indexOf**

indexOf 方式和 includes()是一样的

**ES6 Set()**

```javascript
function unique(arr) {
  return Array.from(new Set(arr));
}
console.log(unique([1, "1", 2, 3, 3, 5, 5, 6, 6])); // [ 1, '1', 2, 3, 5, 6 ]
```

或者

```javascript
function unique(arr) {
  return [...new Set(arr)];
}
console.log(unique([1, "1", 2, 3, 3, 5, 5, 6, 6])); // [ 1, '1', 2, 3, 5, 6 ]
```

**ES6 map()**

```javascript
function unique(arr) {
  const map = new Map();
  const resulte = arr.filter((a) => {
    if (!map.has(a)) {
      return map.set(a, 1);
    }
  });
  return resulte;
}
console.log(unique([1, "1", 2, 3, 3, 5, 5, 6, 6])); // [ 1, '1', 2, 3, 5, 6 ]
```

### 34 展开数组

##### es6： flat()

```javascript
function flatArr(arr = []) {
  return arr.flat(Infinity);
}
console.log(
  flatArr([1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14])
);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

##### es6： rest 操作符号

```javascript
function flatArr(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(
  flatArr([1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14])
);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

##### 递归方式

```javascript
function flatArr(arr) {
  let result = [];
  arr.forEach((a) => {
    if (Array.isArray(a)) {
      // 如果还是数组， 则就递归
      result = result.concat(flatArr(a));
    } else {
      result.push(a);
    }
  });
  return result;
}
console.log(
  flatArr([1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14])
);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

##### toString()

```javascript
function flatArr(arr) {
  return arr
    .toString()
    .split(",")
    .map((a) => Number(a));
}
console.log(
  flatArr([1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14])
);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

##### reduce

```javascript
function flatArr(arr) {
  return arr.reduce((pre, next) => {
    return pre.concat(Array.isArray(next) ? flatArr(next) : next);
  }, []);
}
console.log(
  flatArr([1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14])
);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

### 35 实现拖拽

##### js 实现

直接上例子 [拖拽实现](https://codepen.io/shuliqi/pen/qBOPpxO?editors=0110)

其中需要注意的点：

- 要拖拽的元素必须的是绝对定位的

  ```css
  #box {
    position: absolute; // 必须是绝对定位的
    width: 200px;
    height: 200px;
    background: red;
  }
  ```

- 为了防止目标拖拽元素拖动太快，目标移动不够快，可能或失去焦点，所以 mosemove 绑定在 document 上

##### Htm5 : draggable

Html5 的 draggable 属性设置为 true 可实现拖拽

直接上例子吧

[draggable](https://codepen.io/shuliqi/pen/mdeBpqW)

其中只需要：

```html
<div class="box" draggable="true"></div>
```

拖拽元素的时候，被拖拽元素会触发以下事件

- **dragstart**
- **drag**
- **dragend**

### 36.实现一个只会执行一次的函数（once）

```javascript
function once(fun) {
  let done = false;
  return () => {
    if (!done) {
      fun.apply(null, arguments);
      done = true;
    }
  };
}

function test() {
  console.log("我是test");
}
const myName = once(test);
myName(); // 我是test
myName(); // ps:不会输出什么
myName(); // ps:不会输出什么
myName(); // ps:不会输出什么
myName(); // ps:不会输出什么
```

### 37 sleep

##### promise 实现

```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

sleep(1000).then(() => {
  console.log("过了1000ms 我才执行的");
});
```

##### async, await（Generator 函数的改进版本）

```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

async function test() {
  await sleep(1000);
  console.log("过了1000ms 我才执行的");
}
test();
```

##### Genrator 函数

```javascript
function* sleep(time) {
  yield new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

sleep(1000)
  .next()
  .value.then(() => {
    console.log("过了1000ms 我才执行的");
  });
// 其中使用.value 才是返回一个genertor 接口
```

### 38 .promise

[Promise](https://shuliqi.github.io/2018/03/20/ES6%E5%AD%A6%E4%B9%A0-Promise/)

### 40. 事件循环

[自己写的博客](https://shuliqi.github.io/2019/08/10/JavaScript%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6/)

js 的任务大致分为同步宏任务，异步微任务， 异步宏任务，

宏任务： 全部的 javscript 代码(同步)， setTimeout(异步)， setInterval(异步)。I/O,浏览器的 render 等

微任务：promise，process，nextTICK

事件循环的机制：同步宏任务--> 微任务 promise---> 微任务 process，nexttick ----> 异步宏任务

解释：主线程从上到下执行代码， 遇到同步的宏任务就执行， 遇到微任务（先进先出）就把人物放到微任务队列里面去。遇到异步的宏任务就放到宏任务的队列里面去。当同步宏任务执行完毕，执行栈（先进后出）为空。就执行微任务队列里面的任务， 执行完毕在执行异步宏任务里面的任务。

> 很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，**实际上await是一个让出线程的标志**。`await后面的表达式会先执行一遍，将await后面的代码加入到w微任务中`，然后就会跳出整个async函数来执行后面的代码。
>
> 由于因为async await 本身就是promise+generator的语法糖。所以await后面的代码是microtask。[从async/await面试题看宏观任务和微观任务](https://cloud.tencent.com/developer/article/1745948)

测试：

```javascript
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  new Promise(resolve => {
      console.log('promise1')
      resolve()
    })
    .then(() => {
      console.log('promise2')
    })
}
console.log('script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0);
async1()
new Promise(resolve => {
    console.log('promise3')
    resolve()
  })
  .then(() => {
    console.log('promise4')
  })
console.log('script end')
```

----



```javascript
async function async1() {
  console.log('1')
  await async2()
  console.log('2)
}
async function async2() {
  new Promise(resolve => {
      console.log(3')
      resolve()
    })
    .then(() => {
      console.log('4')
    })
}
console.log('5')
setTimeout(() => {
  console.log('6')
}, 0);
async1()
new Promise(resolve => {
    console.log('7')
    resolve()
  })
  .then(() => {
    console.log('8')
  })
console.log('9')
```

----



```javascript
console.log("1");
setTimeout(function() {
  console.log("2");
});
console.log("3");
```



输出的结果， 1， 3， 2

同步宏任务 1， 3 ----> 微任务（无）----> 异步宏任务（2）

----

 

```javascript
process.nextTick(function() {
  console.log("1");
});

new Promise(function(resolve) {
  console.log("2");
  resolve();
}).then(function() {
  console.log("3");
  setTimeout(function() {
    console.log("4");
  });
});

new Promise(function(resolve) {
  setTimeout(function() {
    console.log("6");
  });
  resolve();
}).then(function() {
  setTimeout(function() {
    console.log("7");
    new Promise(function(resolve) {
      setTimeout(function() {
        console.log("8");
      });
      resolve();
    }).then(function() {
      setTimeout(function() {
        console.log("9");
      });
    });
  });
});
console.log("10");

// 2 10 1 3 6 4 7 8 9
```

```javascript
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
```

// 1 2 3 7 5 6 4

### 41 es6 的一些小拓展

- 函数的默认值

  e s5 是是没有默认值的，es6 参数可以写成默认参数

  ```javascript
  function add(x = 1, y = 2) {
    return x + y;
  }
  ```

- rest 参数： ...变量名， 用来获取函数多余的参数。rest 是一个数组， 将剩余的变量存入数组里面

  ```javascript
  function add(a, ...rest) {
    console.log(a); // 1
    console.log(Array.isArray(rest)); // true
    console.log(rest); // 2,3,4,5,6,7,8
  }
  add(1, 2, 3, 4, 5, 6, 7, 8);
  ```

- 扩展运算符（...）相当于是...rest 的逆运算。将数据转换成以逗号分割的参数序列

  ```javascript
  console.log(...[1, 2, 3, 4, 5, 6, 7]); // 1 2 3 4 5 6 7
  ```

- 箭头函数：

  ```javascript
  const add = () => {
    return 12;
  };
  ```

  注意点：

  - 箭头函数的 this 在创建的时候就确定了， 就是定义时所在的对象，而不是在在调用时所被调用的对象
  - 箭头函数不能使用 new 命令
  - 将有函数不能使用 argumengts, 可以使用...rest 来替代
  - 不可以使用 yield 命令， 所以肩头函数不能写成 generator 函数

- 变量的结构赋值

  ```javascript
  const [a, b, c] = [1, 2, 3];
  console.log(a, b, c); // 1 2 3
  ```

- Set 数据结构

  Set 类似数组， 但是没有重复的值

  ```javascript
  // 不会有重复的值
  console.log(new Set([1, 1, 2, 2, 3, 3, 3, 4, 4, 5])); // 1 2 3 4 5
  
  // newSet的方法
  const setArr = new Set([1, 1, 2, 2, 3, 3, 4]);
  console.log(setArr.add(9));
  console.log(setArr.delete(1));
  console.log(setArr.has(2));
  setArr.clear();
  console.log(setArr);
  ```

  - add: 添加一个元素， 返回整个 set
  - delete： 删除一个元素， 返回布尔值，true 表示删除成功
  - has： 判断是否有有某个元素， 返回布尔值， true 表示有
  - clear： 清空所有的元素， 没有返回值

* Map 数据结构

  ```javascript
  const obj = { name: "shuliqi" };
  const mapObj = new Map();
  mapObj.set(obj, "hahah");
  mapObj.set({ name: "haha" }, 11111);
  mapObj.get(obj);
  mapObj.delete(obj);
  mapObj.has({ name: "haha" });
  mapObj.clear();

  console.log(mapObj);‘

  ```

* 增加了会计作用域：let， const

let 定义的变量只有在会计作用域内有效，

- let 不存在变量提升，
- 不可以重复声明
- 存在暂时性死区

const 用来定一个常量， 一旦定义了就不可以改变了。

### 42. post 和 get 的区别

- post 的数据是放在 body 里面的比较安全。但是用户刷新是没用的。get 的数据是明文在 url 里面的， 比较不安全， 但是用户可以刷新继续使用
- get 能传送的数据量只有 2 - 8k， post 能传送的比较多点

### 44 document.onload 和 document.ready 的区别

- doument.onload:

  指 dom 元素和其它元元素都加载完成（包括图片和多媒体）

- Document.ready

  指 dom 元素家在完成

### 45 js 如何创建一个对象

- 使用内置对象

  ```javascript
  const obj = new Object();
  const string = new String("sds");
  ```

- 使构造函数

  ```javascript
  const obj = {
  	this.name = "shuliqi",
  	this.age = 12
  };
  // 或者
  ```

- 使用对象字面量

  ```javascript
  const obj = {
  	name: "shuliq",
  	age = 12;
  }
  ```

### 46. [1,2,3].map(parseInt)

返回的结果为： 1， NaN, NaN。

```
[1,2,3].map((value, index, arr) => {})
```

map 的回调函数传入的是三个参数，

- 第一个参数是当前的循环的值
- 第二值是当前的值的下标
- 第三个值是数组本身

```
parseInt(string, radix)
```

- 第一个参数是要转换的字符，

- 第二个参数是要转成的进制

  这个值的范围是 2-36。如果不在这个范围则输出 NaN， 默认是 0 表示 10 进制

所以这个解析的过程就变成了

```
parseInt(1, 0) // o 表示默认10进制， 输出1
parseInt(2, 1) // 1 不在2-36 范围， 输出NaN
parseInt(3, 2) //  3 不在2进制的范围里面， 输出NaN
```

二进制 就是以 1 和 0 开头的， 因为逢 2 就进一位了。ßß

### 47 原型链的理解

![图片描述](https://segmentfault.com/img/bVsfmV)每个

每个函数都有一个内置的属性（prototype）, 它是一个指针， 指向这个函数的原型

每个对象都有一个内置的属性（**proto**）。 指向的是构造它的函数的原型。

在查找对象的属性或者方法的时候， 会现在自身的属性有咩有属性和方法，如果没有则沿着**proto**继续其构造函数的的 prototype。而其构造函数的 prototype 也是一个对象，也有隐原型。就这样一层层的往上找。 直到找到最终的构造函数额 prototype。Funtion.prototype.而 Funtion.prototype 也是一个对象， 它是由 Object.prototype 构造的。所以的它的隐原型指向了 Object.prototype。 而 Object.prototype 的隐原型指向了 null。这样就到达了原型链的终点

### 48. 深拷贝实现

```javascript
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key]);
    }
  }
  return result;
}
```

### 50. 前端性能优化

- 尽量减少请求数量。 合理利用缓存
- css Spities。将图片合起来， 这样就会减少很多请求
- 懒加载图片： 第一次只加载第一屏幕的图片，到达屏幕底部的时候再加载新的。
- css 放在 html 的头部， js 加载放在尾部
- 尽量少用 with， eval（）等
- 少用 css 表达式等
- 为了减少回流和重绘：
  - 尽量少用 table 部署，
  - 改变样式尽量使用 class 来一次性改变
  - 将动画运用到 position 为 absolute 和 fixed 上面
  - 避免使用多层次的内敛样式，
  - 少用 css 表达式（calc（）等）
- cdn 做负载均衡

### 51. vue 和 react 的区别

### 52 Proxy 和 defineProperty 的区别

Proxy 是对整个对象进行拦截，

defineProperty 是只能对某个属性进行拦截

Proxy 有更多的拦截的方式（get， set， has，apply， defineProperty 等 13 种）

defineProperty 只有 get， set，configurable, enumerable， writable, value

## 55 CDN 是干什么的，有什么意义呢？

## 56 前端常见的安全问题有哪些？

[前端安全问题](https://blog.csdn.net/g1197410313/article/details/86774984)

## 57 对缓存的理解

[前端缓存](https://shuliqi.github.io/2019/12/03/%E5%89%8D%E7%AB%AF%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/)

按照位置来分的话：

- memory catch： 存在内存中， 因此不是一个永久的存储，浏览器关闭就会不在了， 一把几乎所有的请求都会 memory catch；
- disk catch: 存在硬盘上， 是一个永久的， 但是浏览器会有自己的算法去调没有用的缓存。这个是需设置 http 头的各种字段来实现的， 我们也叫 http 缓存。

按照缓存的不同来分：

- 强缓存： 强缓存的主要的目的就是减少请求。 如果命中了强缓存， 就不会发出请求了。一般有两个字段设置： Expires， Catch-Control。

  ```javascript
  const express = require('express')
  const fs = require('fs');
  const app = express();
  app.get('/1/css', (res, req) => {
  	fs.readFile(patch, (err, data) = >{
  		req.setHeader('Expires'， 'Thu Dec 05 2019 23:51:08 GMT+0800 (CST');
  		req.setHeader('Catch-Control'， 'public max-age=600');
  		req.sed(data.toString())
  	})
  })
  ```

  后端设置了强缓存， 那么当前端要发出请求时呢， 先去看当前的时间有没有超过缓存时间，如果没有超过呢， 就不去请求， 而而是直接使用缓存。

- 对比缓存： 对比缓存的只要目的主要是减少响应体，来加快传输的过程。主要用到的两对字段。 Last-Modified/ If-Modified-Since。 Etag/If-None-Match

  后端的设置

  ```javascript
  // 对比缓存 [if-modified-since, Last-Modified, ]
  app.use("/1.js", (req, res) => {
    const jsPath = path.join(__dirname, "./public/javascripts/1.js");
  
    // 获取文件1.js的信息
    fs.stat(jsPath, (err, stat) => {
      // 获取文件内容被修改的时间 modify time
      let lastModified = stat.mtime.toUTCString();
      // 判断 if-modified-since 的时间与资源的最后修改时间是否一致
      if (req.headers["if-modified-since"] === lastModified) {
        // 设置响应状态码
        res.writeHead(304, "not modified");
        // 响应体为空，减少传输时间
        res.end();
      } else {
        // 读取文件
        fs.readFile(jsPath, (err, content) => {
          // 设置Last-Modified
          res.setHeader("Last-Modified", lastModified);
          // 设置响应状态码
          res.writeHead(200, "ok");
          // 响应体为空，减少传输时间
          res.end(content);
        });
      }
    });
  });
  ```

  前端第一次请求的时候， 根据相应头的 Last-Modified，Etag 我们知道这个内容缓存。当我们再发出请求的时候我们在请求头在分别把 If-Modified-Since. If-None-Match 字段再返回给后端。值就是上一次响应头两个字段返回给我们的值。 如果后端判断文件内容没有改变， 则直接返回状态码为 304。没有响应体给前端。

## 58 TypeScript

[typescript](https://shuliqi.github.io/2019/10/16/TypeScript%E5%85%A5%E9%97%A8-%E4%B8%80/)

## 59 正则

#### 字符集

- [...]: 匹配放括号里面的任意字符

- [^ ... ]: 不匹配括号里面的任意字符

- \w： 匹配 [a-zA-G0-9]的任意字符

- \W : 匹配[ ^a-zA-G0-9]的任意字符

- \d: 匹配一个数字， [0-9]

- \D: 匹配一个非数字 [^0-9]

- \s: 匹配空白符号

- \S: 匹配非空白字符

#### 重复

- {n, m}: 至少匹配 n 次， 但是不超过 m 次
- {n, }: 至少匹配 n 次
- {n}: 匹配 n 次
- ? : 匹配 0 次或则 1 次
- \*： 匹配 0 次或则 多次
- +： 匹配 1 次或则多次

#### 组合

（）： 提取匹配字符串的，表达式中有几个()就有几个相应的匹配字符串

```javascript
const str = "17885257632";
const reg = /^(\d{3})\d*(\d{4})$/;
console.log(str.match(reg)); // [ '17885257632', '178', '7632', index: 0, input: '17885257632' ]
```

#### 选择

|

```javascript
const str = "shuliqi";
// 匹配s开头 或者l结尾的
const reg = /^([s])|([l])$/g;
console.log(str.match(reg)); // [ 's' ]
```

#### 指定位置匹配

- ^ : 匹配开头
- \$: 匹配结尾
- \b: 匹配一个单词的边界
- \B: 匹配一个非单词的边界

## 60 电话号码中间四位变星号

```javascript
function phone(phone) {
  const arr = ("" + phone).split("");
  arr.splice(3, 4, "****");
  return arr.join("");
}
console.log(phone(17885251632));
```

使用正则表达式

```javascript
function phone(num) {
  return ("" + num).replace(/^(\d{3})\d*(\d{4})$/, "$1****$2");
}
console.log(phone(13991367972));
```

```javascript
function phone(num) {
  const str = "" + num;
  return str.substr(0, 3) + "****" + str.substr(7);
}
console.log(phone(17885257632)); // 178****7632
```

```javascript
function phone(num) {
  const str = "" + num;
  return str.slice(0, 3) + "****" + str.substr(7);
}
console.log(phone(17885257632)); // 178****7632
```

```javascript
function phone(num) {
  const str = "" + num;
  return str.substring(0, 3) + "****" + str.substr(7);
}
console.log(phone(17885257632)); // 178****7632
```

### 61 字符串的方法

##### charAt(index)

返回一个字符串指定下标的字符， 如果 index 值不在 0 和 index 之间，则返回一个空的字符串。字符串的第一个下标是 0

```javascript
var str = "123456";
console.log(str.charAt(0)); // 1
console.log(str.charAt(-1)); // “”不在0 - 6 中间， 返回空
console.log(str.charAt(12)); // “”不在0 - 6 中间， 返回空
```

##### charCodeAt(index)

返回一个字符串指定下标的值的 unicode 值。 如果 index 值的范围不在 0 和 length 之间。 则返回 NAN。

```javascript
const str = "12345677";
console.log(str.charCodeAt(0)); // 49
console.log(str.charCodeAt(-1)); // NAN  不在0 - 6 中间， 返回空
console.log(str.charCodeAt(12)); // NAN  不在0 - 6 中间， 返回空
```

##### concat(str1, str2,...)

用于拼接字符串 concat 方法会把所有的参数转成字符串，然后按照顺序来拼接。注意， 拼接不会改变原字符串。

使用 + 会更好

```javascript
const str1 = "shuliqi";
const str2 = "23";
console.log(str1.concat(str2)); // shuliqi23
console.log(str1); // shuliqi // 原字符串不被改变
console.log(str2); // 23 //  原字符串不被改变
```

##### fixed()

把字符串显示为打字机字体

```javascript
const str = "shuliqi";
console.log(str.fixed()); // <tt>shuliqi</tt>
```

##### indexOf(searchStr, index)

用于检索某个指定的字符串在字符串中首次出现的位置. 如果找不到就返回-1

- searchStr：要检索的字符串
- index： 开始检索的位置。 可选， 如果没有是从 0 开始检索的，index 的取值在 0 和 length -1

```javascript
const str = "shuliqi";
// 查找u, 从下标为3 开始查找
console.log(str.indexOf("u", 3)); // -1
console.log(str.indexOf("u")); // 2
```

##### lastIndexof()

个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索

```javascript
const str = "shuliqi";
// 查找u, 从下标为3， 从后面 开始查找
console.log(str.lastIndexOf("u", 3)); // -1
console.log(str.lastIndexOf("u")); // 2
```

##### match()

检索指定的字符串或者匹配一个或者多个正则匹配的字符串， 和 indexOf ， lastIndexOf 差不多。只是返回的是存放指定结果的数组， 而不是下标。

```javascript
var str = "Hello world!";
console.log(str.match("world")); // ['world', index: 6, input: 'Hello world!']
const str1 = "shuliwqi 1ask 3";
console.log(str1.match(/\d+/g)); // [ '1', '3' ]
console.log(str1.match("asdhajg")); // null
```

##### replace(regexp/substr, replacement)

- regexp/substr:要替换的字符串或者是符合匹配正则的字符串
- replacement：要替换成新的新的字符串

_replacement_ 可以是字符串，也可以是函数。如果它是字符串，那么每个匹配都将由字符串替换。但是 replacement 中的 \$ 字符具有特定的含义。如下表所示，它说明从模式匹配得到的字符串将用于替换。

| 字符                           | 替换文本                                            |
| :----------------------------- | :-------------------------------------------------- |
| $1、$2、...、\$99              | 与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。 |
| \$&                            | 与 regexp 相匹配的子串。                            |
| \$` | 位于匹配子串左侧的文本。 |
| \$'                            | 位于匹配子串右侧的文本。                            |
| \$\$                           | 直接量符号。                                        |

```javascript
const str = "shul 1 iqi1 ";
console.log(str.replace(/\d/g, "haha")); // shul haha iqihaha
console.log(str.replace("shu", "na")); // nal 1 iqi1
```

##### search(reg)

从头检索与正则表达式匹配的字符串， 找到返回第一个匹配的字符串的下标。 枷锁不-1

```javascript
const str = "s 11 hul 1111 iqi12123";
// 匹配第一个数字
console.log(str.search(/\d/i)); // 2
// 匹配第一个【a-z0=9，A-Z】
console.log(str.search(/\w/i)); // 0
// 匹配 1 或则 2  字符串
console.log(str.search(/[12]/)); // 2
console.log(str.search(/\d{5,}/)); // 17
```

##### slice(start, end)

返回指定返回的字符串, 不不包含 end。 接受负数

```javascript
const str = "123shuliq";
console.log(str.slice(2, 4)); // 3s
console.log(str); // 123shuliq  说明原字符串不会改变
console.log(str.slice(-2, -1)); // i  接受负数
```

##### substr(start, n)

从起始位置开始，提取 n 个字符 ， 如果没有指定 n, 则从起始位置到最后。 如果起始位置是负数的话， 那么是从字符串后头开始计算的。

```javascript
const str = "123shuliq";
console.log(str.substr(2, 4)); // 3shu
console.log(str.substr(2)); // 3shuliq
console.log(str.substr(-2)); // iq  可接受负数
```

##### substring

和 slice 和 substr 一样， 只是接受负数

```javascript
const str = "123shuliq";
console.log(str.substring(2, 4)); // 3s
console.log(str); // 123shuliq  说明原字符串不会改变
console.log(str.substring(-2, -1)); // 没有返回值的
```

##### toLowerCase()

将字符串字母转成小写

```javascript
const str = "123SHULIQ";
console.log(str); // 123shuliq  说明原字符串不会改变
console.log(str.toLowerCase()); // 123shuliq
```

##### toUpperCase()

将字符串字母转成大写

```javascript
const str = "123shuliq";
console.log(str.toUpperCase()); // 123SHULIQ
```

### 25. 事件流

**标准事件流：** 捕获事件（true）—目标事件—冒泡事件（false）

**IE 事件流：**冒泡事件

**一个元素绑定了一个捕获事件，绑定了一个冒泡事件，执行几次？ 顺序？**

```html
<div id="one">
  one
  <div id="two">
    two
    <div id="three">
      three
      <div id="four">
        four
      </div>
    </div>
  </div>
</div>
```

```javascript
document.getElementById("one").addEventListener(
  "click",
  function() {
    console.log("one");
  },
  true
);
document.getElementById("two").addEventListener(
  "click",
  function() {
    console.log("two 冒泡");
  },
  false
);
document.getElementById("two").addEventListener(
  "click",
  function() {
    console.log("two 捕获");
  },
  true
);

document.getElementById("three").addEventListener(
  "click",
  function() {
    console.log("three");
  },
  true
);
document.getElementById("four").addEventListener(
  "click",
  function() {
    console.log("four");
  },
  true
);
```

two 元素即绑定了冒泡 也绑定了捕获。

- 标准事件流

如果是目标发生了事件：则目标元素先绑定了什么就先执行什么，其他元素是先捕获后冒泡

如果不是目标事件发生了事件：则先执行捕获或执行冒泡

例如：点击 two： 输出：one , two 冒泡, two 捕获

例如：点击 four： 输出：one，two 捕获， three， four， two 冒泡

- IE：后绑定的会覆盖钱绑定的事件

[事件流的例子](https://codepen.io/shuliqi/pen/ZEbKjLm?editors=1010)

**IE 与 DOM 事件的区别**

- 事件流不一样：

  DOM: 捕获事件（true）， 目标事件， 冒泡事件（false）

  IE: 冒泡事件

- 监听函数的参数不一致

  DOM: addEventListener(type, fn, false/true)

  IE: attachevent(type, fn)

  type 表示事件类型， fn 表示事件触发的函数

- this 取值也不一致

  DOM: 严格模式下（undefined）， 非严格模式（当前调用的对象）

  IE: window

- 取消冒泡不一致

  DOM: e.stopPropagatioon()

  IE: window.event.canceBubble = true

- 取消默认行为

  DOM: e.preventDefualt ()

  IE: window.event.returnValue = false

- 获取事件源不一致

  DOM: e.target

  IE: window.event.srcElement

#### 普通事件和事件绑定有什么区别？

**普通事件**：只支持单一事件， 后面绑定的事件会覆盖当前的事件。

```javascript
  btn.onclick = function () {
      alert('普通事件1');//不执行
  }
  btn.onclick = function () {
      alert('普通事件2');//弹出
  }

下面的会覆盖上面的
```



**事件绑定 **：支持绑定多个事件，不会被覆盖， 绑定几个就会有多少个？

```javascript
btn.addEventListener('click', function  () {
    alert('事件绑定1');//弹出
},false);
btn.addEventListener('click', function  () {
    alert('事件绑定2');//弹出
},false);
```



#### mouseover 和 mouseenter 的区别

**mouseover:** 鼠标移入某个元素或者某个元素的子元素都会触发，有冒泡的过程， 对应的取消事件是 mouseout

**mouseenter :**鼠标移除本身元素触发， 不存在冒泡过程， 对应的取消事件是 mouseleave

mouseover(鼠标覆盖)

mouseenter(鼠标进入)

二者的本质区别在于,mouseenter不会冒泡,简单的说,它不会被它本身的子元素的状态影响到.但是mouseover就会被它的子元素影响到,在触发子元素的时候,mouseover会冒泡触发它的父元素.(想要阻止mouseover的冒泡事件就用mouseenter)

共同点:当二者都没有子元素时,二者的行为是一致的,但是二者内部都包含子元素时,行为就不同了.



#### 事件委托（事件代理）

原理：利用冒泡原理，把事件加到父级上面， 让父级来执行

好处：提高性能， 新增加的元素也会有该事件

```html
<ul id="ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```javascript
document.getElementById("ul").addEventListener(
  "click",
  function(e) {
    const event = e || window.evebt;
    const target = event.target || event.srcElemnt;
    console.log(target.nodeName);
    if (target.nodeName === "LI") {
      target.style.color = "red";
    }
  },
  false
);
```

#### 事件代理在捕获阶段的实际应用

可以在父元素层面阻止事件向子元素传播，也可代替子元素执行某些操作。



# 校招面试

#### 1. JavaScript 中 `undefined` 和 `not defined` 的区别

JavaScript 未声明变量直接使用会抛出异常：`var name is not defined`，如果没有处理异常，代码就停止运行了。
但是，使用`typeof undeclared_variable`并不会产生异常，会直接返回 `undefined`。

```javascript
var x; // 声明 x
console.log(x); //output: undefined

console.log(typeof y); //output: undefined

console.log(z); // 抛出异常: ReferenceError: z is not defined
```

#### 2. 下面的代码输出什么？

```javascript
var y = 1;
if (function f() {}) {
  y += typeof f;
}
console.log(y);
```

正确的答案应该是 `1undefined`。

JavaScript 中 if 语句求值其实使用`eval`函数，`eval(function f(){})` 返回 `function f(){}` 也就是 `true`。

下面我们可以把代码改造下，变成其等效代码。

```javascript
var k = 1;
if (1) {
  eval(function foo() {});
  k += typeof foo;
}
console.log(k);
```

上面的代码输出其实就是 `1undefined`。为什么那？我们查看下 `eval()` 说明文档即可获得答案

> 该方法只接受原始字符串作为参数，如果 string 参数不是原始字符串，那么该方法将不作任何改变地返回。

恰恰 `function f(){}` 语句的返回值是 `undefined`，所以一切都说通了。

注意上面代码和以下代码不同。

```javascript
var k = 1;
if (1) {
  function foo() {}
  k += typeof foo;
}
console.log(k); // output 1function
```

#### 4.写一个函数，使用方法如下。

```javascript
console.log(mul(2)(3)(4)); // output : 24
console.log(mul(4)(3)(4)); // output : 48
```

```javascript
function mul(x) {
  return function(y) {
    // anonymous function
    return function(z) {
      // anonymous function
      return x * y * z;
    };
  };
}
```

#### 5. JavaScript 怎么清空数组？

```
var arrayList = ['a','b','c','d','e','f'];
```

- 直接改变 arrayList 所指向的对象，原对象并不改变

  ```
  arrayList = [];
  arrayList.splice(0, arrayList.length);
  ```

- 这种方法通过设置 length=0 使原数组清除元素。

  ```
  arrayList.length = 0;
  ```

#### 6. 下面代码输出什么？

```javascript
var output = (function(x) {
  delete x;
  return x;
})(0);

console.log(output);
```

答案： 0

`delete` 操作符是将 object 的属性删去的操作。但是这里的 `x` 是并不是对象的属性， `delete` 操作符并不能作用。

```javascript
var x = 1;
var output = (function() {
  delete x;
  return x;
})();

console.log(output);
```

输出是 `1`。`delete` 操作符是将 object 的属性删去的操作。但是这里的 `x` 是并不是对象的属性， `delete` 操作符并不能作用。

```javascript
var x = { foo: 1 };
var output = (function() {
  delete x.foo;
  return x.foo;
})();

console.log(output);
```

输出是 `undefined`。x 虽然是全局变量，但是它是一个 object。`delete`作用在`x.foo`上，成功的将`x.foo`删去。所以返回`undefined`

```javascript
var Employee = {
  company: "xyz",
};
var emp1 = Object.create(Employee);
delete emp1.company;
console.log(emp1.company);
```

输出是 `xyz`，这里的 emp1 通过 prototype 继承了 Employee 的 company。emp1 自己并没有 company 属性。所以 delete 操作符的作用是无效的。

看下面代码输出什么？

```javascript
var bar = true;
console.log(bar + 0); // 1
console.log(bar + "xyz"); // truexyz
console.log(bar + true); // 2
console.log(bar + false);
```

```
1
truexyz
2
1
```

- Number + Number -> 加法
- Boolean + Number -> 加法
- Boolean + Boolean -> 加法
- Number + String -> 连接
- String + Boolean -> 连接
- String + String -> 连接

```javascript
var z = 1,
  y = (z = typeof y);
console.log(y);
```

输出是 `undefined`。js 中赋值操作结合律是右至左的 ，即从最右边开始计算值赋值给左边的变量。

```javascript
var z = 1;
z = typeof y;
var y = z;
console.log(y);
```

#### 7.函数声明的方式

函数声明法

```javascript
function sum(num1, num2) {
  return num1 + num2;
}
```

表达式声明

```javascript
var sum = function(num1, num2) {
  return num1 + num2;
};
```

```javascript
console.log(foo);
console.log(bar);
var foo = function() {
  // Some code
};
function bar() {
  // Some code
}
```

输出：

```javascript
undefined;
function bar() {
  // Some code
}
```

将函数声明提升到代码树顶部）；至于函数表达式声明，则必须等到解析器执行到它所在的代码行，才会执行，无法自动提升。

#### 8. 变量提升

```javascript
var salary = "1";

(function() {
  console.log(salary);

  var salary = "2";

  console.log(2);
})();
// undefined 2
```