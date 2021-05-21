function Observer(data) {
  // 如果数据不存在，或者data 不是一个对象的话， 则不处理
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach((key) => {
    defineObserver(data, key, data[key]);
  })
}

function defineObserver(data, key, value) {
  // 监听子元素
  Observer(data[key]);
  Object.defineProperty(data, key, {
    get: function() {
      return value;
    },
    set: function(newValue) {
      if (value !== newValue) {
        console.log("监听到裱花了")
        value = newValue;
      }
    }
  })
}
