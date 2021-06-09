const { resolve } = require("node:path");

const a = Promise.reject("test");
const b = a.catch((data) => console.log(data));

const a = Promise.reject("test")
          .catch(data => console.log(data));
const b  = a.catch((data) =>  console.log(data))

console.log(1);
setTimeout(() => {
  console.log(2);
  Promise.resolve()
  .then((data) => {
    console.log(3);
  })
  .then(data => {
    console.log(4);
  });
  Promise.reject()
  .catch((data) => {
    console.log(5)
  })
});

new Promise((resolve) => {
  resolve();
  console.log(6);
})
.then(() => {
  console.log(7);
  setTimeout(() => {
    console.log(8);
  })
})
.then(() => console.log(9));
console.log(10);




var nickName = "lilei";

function Person(name) {
    this.nickName = name;
    this.sayHi = function () {
      console.log(this.nickName);
      setTimeout(function () {
        console.log(this.nickName);
      })
    }
}

var Male = {
  test: "test",
  nickName: "xiaofnag",

  sayHi: () => {
    console.log(this.nickName);
  }
}

var person = new (Person.bind(Male, "xiaoghong"));

person.sayHi();




















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

MyPromise.prototype.catch = function(callback) {
 return this.then(null, callback);
}

MyPromise.prototype.finally = function(callback) {
  return this.then(() => {
    MyPromise.resolve(callback());
    return value
  }, (reason) => {
    MyPromise.resolve(callback());
    throw reason;
  })
}


MyPromise.resolve = function(value) {
    // 如果是 promise，则直接原封不动的返回
    if (value instanceof value) return value
    return new MyPromise((resolve, reject) => {
      // 其他的要转一下；
      resolve(value);
    })
}

MyPromise.relect = function(reason) {
  // 无论是什么都是rrejected 状态的promise
  return new MyPromise((resolve, reject) => {
    reject(reason);
  })

}

MyPromise.all = function(promiseAll) {
  if (!Array.isArray(promiseAll))  {
    throw new Error("arguments 需要是数组")
  }
  const result  = [];
  let i = 0;
  return new MyPromise((resolve, reject) => {
      
    for(let i = 0;  i < promiseAll.length; i++) {
      MyPromise.resolve(promiseAll[i]).then((data) =>{
        i++;
        result.push(data);

        // 必须要等所有的都执行完，才能返回
        if (i === promiseAll.length) {
          resolve(result);
        }
      }, (err) => {
        reject(err);
      })
    }
  })
}


MyPromise.race = function(promiseAll) {
  if (promiseAll.length === 0) {
    return ;
  }
  for (let i = 0; i < promiseAll.length; i++) {
      MyPromise.resolve(promiseAll[i]).then((date) => {
        resolve(data);
        return; //  只要一个有状态了， 就返回回去
      }, (err) => {
        reject(err);
      })
  }
}


// MyPromise.resolve('成功').then((value) => {
//   console.log(value)
// })


// MyPromise.relect('失败').then(() => {}, (err) => {
//   console.log(err)
// })
























}
