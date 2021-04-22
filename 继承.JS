function People(name) {
  // 父类实例属性
  this.name = name;
  // 父类实例方法
  this.getName = function() {
  console.log('父类实例的方法：', this.name)
  }
}
// 父类原型属性
People.prototype.age = 18;
// 父类原型属方法
People.prototype.getAge = function() {
  console.log('父类原型方法', this.age);
};




/** 
 * 实例继承 
 */
function MyPeople (name) {
  const instance = new People(name);
  return instance;
}
// 测试
const mypeople = new MyPeople('舒丽琦');
console.log('父类实例的属性：', mypeople.name);
console.log('父类原型的属性：', mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： 18
// 父类实例的方法： 舒丽琦
// 父类原型方法 18


 


/**  
 * 寄生组合方式：为了解决父类实例实例化两份的
 */

 function MyPeople(name) {
   People.call(this, name);
 }
(function() {
  const fn = function() {};
  fn.prototype = People.prototype;
  MyPeople.prototype = new fn()
})();
// 测试
const mypeople = new MyPeople('舒丽琦');
console.log('父类实例的属性：', mypeople.name);
console.log('父类原型的属性：', mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： 18
// 父类实例的方法： 舒丽琦
// 父类原型方法 18










/** 
 * 组合模式： 原型链继承 + 苟晗函数继承
 * 
 * */

 function MyPeople(name) {
    People.call(this, name);
 }
 MyPeople.prototype = new People();

// 测试
const mypeople = new MyPeople('舒丽琦');
console.log('父类实例的属性：', mypeople.name);
console.log('父类原型的属性：', mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： 18
// 父类实例的方法： 舒丽琦
// 父类原型方法 18









/** 
 * 构造继承： 在子类的构造函数里面复制父类实例的属性和方法
 */
function MyPeople(name) {
  // 可以向父类构造函数传参数
  People.call(this, name)
};
// 测试
const mypeople = new MyPeople('舒丽琦');
console.log('父类实例的属性：', mypeople.name);
console.log('父类原型的属性：', mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： undefined
// 父类实例的方法： 舒丽琦
// 父类原型方法 undefined




/**  
 * 原型链继承： 子类的原型指向父类的实例
 */
function MyPeople() {};
MyPeople.prototype = new People('舒丽琦');

// 测试
const mypeople = new MyPeople();
console.log('父类实例的属性：', mypeople.name);
console.log('父类原型的属性：', mypeople.age);
mypeople.getName();
mypeople.getAge();
// 父类实例的属性： 舒丽琦
// 父类原型的属性： 18
// 父类实例的方法： 舒丽琦
// 父类原型方法 18
