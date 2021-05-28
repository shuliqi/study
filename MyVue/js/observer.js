// 老的数组的原型
const oldArrayPrototypeMethods = Array.prototype;
// 创建一个新的空对象，但是会继承原数组的一些方法，因为当使用我们没有重写的方法的时候，能使用到
const arrayMethods = Object.create(oldArrayPrototypeMethods);

// 要重写的数组
const methods = ["push", "shift", "unshift", "pop","reverse", "sort", "splice"];
methods.forEach((method) => {
  arrayMethods[method] = function(...arg) {
    // 执行老的数组的方法，得到结果
    const result = oldArrayPrototypeMethods[method].apply(this,arg)
    
    // 进行监听： 1.找到增加的元素； 2.实现监听
    // 1.找到新增加的元素
    let  inserted;
    switch(method) {
      case "push":
      case "unshift":
        inserted = arg;
        break;
      case "splice":
        // vm.list.splice(3, 0,"哈哈哈", "怎么着") ---> arg = [3, 0, "哈哈哈", "怎么着"]
        inserted = arg.slice(2);
        break;
      default:
        break;
    }
    // 2.实现对新增加元素的监听
    observeArray(inserted);
    return result
  }
})


function Observer(data) {
  const _this = this;
  // 如果数据不存在，或者 data 不是一个对象的话， 则不处理
  if (!data || typeof data !== "object") {
    return;
  }
  if (Array.isArray(data)) {
    data.__proto__ = arrayMethods;
    // 如果数组里面还是数组，那么继续监听
    observeArray(data)
  } else {
    // 监听不是数组的数据
    Object.keys(data).forEach(function (key) {
      defineReactive(data, key, data[key]);
    })
  }
}

// 劫持数组元素
function observeArray(items) {
  //  循环监听每一个新增的属性
  for (var i = 0, l = items.length; i < l; i++) {
    Observer(items[i]);
  }
}

// 劫持对象属性
function defineReactive(data, key, value) {
    // 监听子元素
    Observer(data[key]);
    const dep = new Dep();
    Object.defineProperty(data, key, {
      get: function() {
        // 把订阅者添加到容器里面，统一管理
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return value;
      },
      set: function(newValue) {
        if (value !== newValue) {
          console.log("监听到变化了", newValue)
          value = newValue;
          // 通知收集的容器的 notify，notify 去更新每一个订阅者的 update 方法去更新视图
          dep.notify();
        }
      }
    })
}

// 管理每一个订阅者的容器:
// 该容器维护一个数组，用来收集订阅者。
// 该容器有一个 notify 方法 去触发订阅者的 update 去更新视图。
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach((sub) => {
      sub.update();
    })
  }
};
Dep.target = null;