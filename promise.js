function MyPromise(executor) {
  const self = this;

  // 保存成功回调：then方法中的第一个参数
  self.onResolvedCallbacks = [];

  // 保存失败回调：：then方法中的第二个参数
  self.onRejectedCallbacks = [];

  // 实例的默认状态： pending
  self.status = "pending";

  // resolve 置值器： 用于修改状态
  function resolve(value) {
    // Promise的状态一经修改就不能再改变，所以只有在 pending 状态才能修改
    if (self.status === "pending") {
      self.status = "fulfilled";
      // Promise的值
      self.value = value;

      // 把存起来的成功回调调用
      self.onResolvedCallbacks.forEach((fn) => {
        // then 方法是异步指执行的，使用setTimeOut 将同步代码变成异步代码。
        setTimeout(() => {
          fn();
        }, 0)
      })
    }
  }

  // reject 置值器： 用于修改状态
  function  reject(reason) {
    // Promise的状态一经修改就不能再改变，所以只有在 pending 状态才能修改
    if (self.status === "pending") {
      self.status = "rejected";
      // Promise的值
      self.value = reason;

      // 把保存起来的失败回调拿出来调用
      self.onRejectedCallbacks.forEach((fn) => {
        // then 方法是异步指执行的，使用setTimeOut 将同步代码变成异步代码。
        setTimeout(() => {
          fn();
        }, 0)
      })
    }
  }

  // executor 是会被立即执行的
  executor(resolve, reject)
}


function resolvePromiseResult(promise, backResult, resolve, reject) {
  // 如果结果返回的是自身， 那么直接调用reject 置值器处理。不然程序将会死掉
  if (promise === backResult) {
    reject(new Error("Promise发生了循环引用"))
  };
  if (backResult !== null && (typeof backResult === "object" || typeof backResult === "function")) {
    // Promise 或者then 对象

    try {

      //  取出 then 方法
      const then = backResult.then;
      
      if (typeof then === "function") {
        // 如果 then 是一个函数，那么直接执行 
        then.call(promise, () => {
          // 递归调用，传入y若是Promise对象，继续循环
          resolvePromiseResult(promise, y, resolve, reject)
        }, (error) => {
          // 失败的话使用 reject 置值器
          reject(error);
        })
      }


    } catch (error) {

      // 如果此时报错， 将世界使用 reject 置值器置值
      reject(error);

    }
  } else {
    // 普调值， 直接使用 resove 置值器置值
    resolve(backResult);
  }
}

// new 出来的实例在原型上有 then 方法
MyPromise.prototype.then = function (onFulfilled, onRejected) {

  // then 返回的是全新的 Promise
  const newMyPromise = new MyPromise((resolve, reject) => {
      // 当置值器resolve调用之后，then中的第一个函数参数会被执行（成功回调）；
      // 即当前的 promise 状态为 fulfilled
      if (this.status === "fulfilled") {
        // then 方法是异步指执行的，使用setTimeOut 将同步代码变成异步代码。
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
  
            //  因为 result 有可能是 promise，抽离出来处理
            resolvePromiseResult(newMyPromise, result, resolve, reject);
            
          } catch (error) {
            // 如果报错会被当前的 MyPromise 的 reject 置值器绑定给下一个 MyPromise
            reject (error)
          }
        }, 0)
      }

      // 当置值器reject调用之后，then中的第一个函数参数会被执行（失败回调）；
      // 即当前的 promise 状态为 rejected
      if (this.status === "rejected") {
        // then 方法是异步指执行的，使用setTimeOut 将同步代码变成异步代码。
        setTimeout(() => {
          try {
            const result = onRejected(this.value)
 
           //  因为 result 有可能是 promise，抽离出来处理
            resolvePromiseResult(newMyPromise, result, resolve, reject);
 
         } catch (error) {
           // 如果报错会被当前的 MyPromise 的 reject 置值器绑定给下一个 MyPromise
           reject(error)
         }
        }, 0)


      }

      // 当还不知道实例状态的情况下，把成功回调和失败回调都保存起来
      // 等到确定调用哪个回调之后，再拿出来调用
      if (this.status === "pending") {
       
        this.onResolvedCallbacks.push(() => {
          try {
            const result = onFulfilled(this.value);

            //  因为 result 有可能是 promise，抽离出来处理
            resolvePromiseResult(newMyPromise, result, resolve, reject);

          } catch (error) {
            // 回调函数的返回值会被当前的 MyPromise 的 reject 置值器绑定给下一个 MyPromise
            reject(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            const result = onRejected(this.value);

            //  因为 result 有可能是 promise，抽离出来处理
            resolvePromiseResult(newMyPromise, result, resolve, reject);

          } catch (error) {
            // 回调函数的返回值会被当前的 MyPromise 的 reject 置值器绑定给下一个 MyPromise
            reject(error);
          }
        })
      }
  })
  return newMyPromise;
}

MyPromise.prototype.catch = function(callback) {
  return this.then(null, callback)
}

MyPromise.prototype.finally = function(callback) {
  return this.then((value) => {
    Promise.resolve(callback())
    .then(() => value)
  }, (err) => {
    Promise.resolve(callback())
   .then(() => err)
  })
}


MyPromise.all = function(arg) {
  const arrPromises = Array.from(arg);
  const result = [];
  let num = 0;
  return new Promise((resolve,reject) => {
    arrPromises.forEach((p) => {
      Promise.resolve((p) => {
        p.then((vaue) => {
          result.push(value);
          num++;
          // 必须要等所有的都执行完，才能返回
          if (num === arrPromises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err)
        })
      })

    })
  })
}

MyPromise.race = function(arg) {
  const arrPromises = Array.from(arg);
  return new Promise((ressolve, reject) => {
    arrPromises.forEach((p) => {
      p.then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      })
    });
  })
}

MyPromise.any = function(arg) {
  const arrPromises = Array.from(arg);
  let rejectedNum = 0;
  let errResult = [];
  return new Promise((resolve, reject) => {
    arrPromises.forEach((p) => {
      p.then((value) => {
        rresolve(value)
      })
      .catch((err) => {
        errResult.push(err)
        rejectedNum++;
        if (rejectedNum === arrPromises.length) {
          reject(errResult);
        }
      })
    })
  })
}


MyPromise.allSetlled = function(arg) {
  const arrPromises = Array.from(arg);
  let  result = [];
  let num = 0;
  return new Promise((resolve, reject) => {
    arrPromises.forEach((p) => {
      p.then((value) => {
        result.push(value);
        num++;
        if (num === arrPromises.length) {
          resolve(result)
        }
      })
      .catch((err) => {
        result.push(err);
        num++;
        if (num === arrPromises.length) {
          resolve(result)
        }
      })
    })
  })
}

const obj = {
  then: () => {
    
  }
}
console.log('then' in obj)

MyPromise.resolve = function(arg) {
  // 如果是一个Promise 对象 或者是 thenable 对象。那么直接返回
  if (arg instanceof Promise || (typeof arg === 'object' && 'then' in arg )) return arg;
  return new Promise((resolve, reject) => {
    resolve(arg);
  })
}


MyPromise.reject = function(arg) {
  return new Promise((resolve, reject) => {
    reject(arg);
  })
}

