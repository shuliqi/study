


{


function MyPromise(executor) {
  let self = this;
  // promise的默认状态
  self.status = 'pending';
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    // 状态只能改变一次，即只有当前状态是’pending‘的时候才能改变状态
    if(self.status === 'pending') {
      // 调用 resolve 函数， 状态变为：fulfilled
      self.status = 'fulfilled';
      self.value = value;
      self.onFulfilledCallbacks.forEach((fn) => {
        fn();
      })
    }

  }

  function reject(reason) {
    // 状态只能改变一次，即只有当前状态是’pending‘的时候才能改变状态
    if(self.status === 'pending') {
      // 调用 reject 函数，状态变为：rejected
      self.status = 'rejected';
      self.reason = reason;
      self.onRejectedCallbacks.forEach((fn) => {
        fn();
      })
    }
  }
  // executor 函数是立即执行的
  executor(resolve, reject);
}

function resultPromise(result, resolve, reject) {
  try {
    if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
      const then = result.then;
      if (typeof then === 'function') {

        then.call(result, (newResult) => {
          resultPromise(newResult, resolve, reject)
        })
      }
    } else {
      resolve(result);
    }
    
  } catch (error) {
    reject(error)
  }

}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  return new MyPromise((resolve, reject) => {
    if( self.status === 'fulfilled') {
      setTimeout(() => {
        try {
          const result = onFulfilled(self.value);
          resultPromise(result, resolve, reject)
        } catch (error) {
          reject(error)
        }
        
      })
    }
    if (self.status === 'rejected') {
      setTimeout(() => {
        try {
          const result = onRejected(self.reason);
          resultPromise(result, resolve, reject)
          
        } catch (error) {
          reject(error)
        }
      })
    }
    if (self.status = 'pending') {
      self.onFulfilledCallbacks.push(() => {
        try {
          const result = onFulfilled(self.value);
          resultPromise(result, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
      self.onRejectedCallbacks.push(() => {
        try {
          const result =  onRejected(self.reason);
          resultPromise(result, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }
  })

}

MyPromise.prototype.catch = function(onCatch) {
  let self = this;
  return self.then(null, onCatch)
}

MyPromise.resolve = function(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
}

MyPromise.relect = function(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  })
}



MyPromise.resolve('成功').then((value) => {
  console.log(value)
})


MyPromise.relect('失败').then(() => {}, (err) => {
  console.log(err)
})
























}
