const { reject } = require("async");
const { resolve } = require("path");

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log('成功拿到数据：', this.responseText)
    } else {
      console.log('获取数据失败')
    }
  }
}
xhr.open('get', 'https://www.fastmock.site/mock/d867c364f89208a7672e9e9d0a822417/qixiao/getFileDetail', true);
xhr.send(null);
// readyState的状态值得意思：
// 0: 表示为初始化，为调用open方法
// 1: 为调用send()方法
// 2： 调用了send（）方式，但是还没有相应
// 3: 接受部分数据
// 4: 已接收到全部的一个响应



// 使用promise 封装 ajax

const ajax = function(method, url, type, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 ){
        if (xhr.status === 200 ) {
          resolve(this.responseText)
        } else {
          reject(status)
        }
      }
    }
    xhr.open(method, url, type);
    xhr.send(data)
  })
}
ajax('get', 'https://www.fastmock.site/mock/d867c364f89208a7672e9e9d0a822417/qixiao/getFileDetail', true, null)
.then((responseText) => {
  console.log('成功拿到值', responseText)
})
.catch((err) => {
  console.log(err)
})





const XMR = new XMLHttpRequest();
XMR.onreadystatechange = function() {
  if (XMR.readyState === 4) {
    if (XMR.status === 200) {
      console.log("请求成功", XMR.responseText)
    } else {
      console.log("请求失败")
    }
  }
}
XMR.open('get', 'https://www.fastmock.site/mock/d867c364f89208a7672e9e9d0a822417/qixiao/getFileDetail', true);
XMR.send();