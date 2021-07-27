class EventEmit {
  constructor () {
    // 用来存放事件监听函数： { event1: [f1, f2]}
    this.listeners = {};
    //  用来设置某个事件能够添加的监听器的最大数量
    this.maxListener = 10;
  }
  // 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
  on(event, cb) {
    const listeners = this.listeners;
    if (listeners[event] && listeners[event].length >=  this.maxListener) {
      throw consmole.err(`监听器的最大数据是${maxListener}, 您已超出`)
    }
    if (Array.isArray(listeners[event])) {
      listeners[event].push(cb);
    } else {
      listeners[event] = [cb];
    }
  }
  // 按监听器的顺序执行执行每个监听器
  emit(event, ...args) {
    const listeners = this.listeners;
    if ( listeners[event]) {
      listeners[event].forEach((fn) => {
        fn.apply(null, args);
      })
    }
  }
  // 移除指定事件的某个监听回调
  removeListeners(event, listener) {
    if (this.listeners[event]) {
      const index = this.listeners[event].indexOf(listener);
      if (index >= 0) {
        this.listeners[event].splice(index, 1);
      }
    }
  }
  // on类似，但只触发一次，随后便解除事件监听
  once(event, listener) {
    const self = this;
    function fn() {
      listener.apply(null, [...arguments]);
      self.removeListeners(event, fn);
    }
    self.on(event, fn);
  }

  // 移除指定事件的所有监听回调
  removeAllListeners(event) {
    this.listeners[event] = [];
  }

  // 用于提高监听器的默认限制的数量。（默认10监听回调个产生警告）
  setMaxListeners(maxListener) {
    this.maxListener = maxListener;
  }
  // 返回指定事件的监听器数组。
  listeners(event) {
    return this.listeners[event];
  }

}

const eventEmit = new EventEmit();

function f1(...args) {
  console.log("asdas", args)
}
eventEmit.once("even1", f1)
eventEmit.emit("even1", "shuliqi");
eventEmit.emit("even1", "shuliqi")
eventEmit.emit("even1", "shuliqi")





