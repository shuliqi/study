



function jsonp(url, data) {
  return  new Promise((resolve, reject) => {
    // 回调函数
    const callbackName = "callback";

    let paramsStr = "";
    // 有参数
    if (data) {
      Object.keys(data).forEach((key) => {
        paramsStr = paramsStr + key + "&=" + data[key];
      })
    }
    // 链接拼接
    url = url + "?" + paramsStr + "&callback=" + callbackName;

    // 创建script 标签
    const script = document.createElement("script");
    script.src = url;

    //  回调函数需要绑定在 wiondon 上
    window[callbackName] = function (result) {
      // 触发事件后， 需要删除 script 标签
      document.body.removeChild(script)
      if (result) {
        resolve(result);
      } else {
        reject("没有加载数据")
      }
    }

    // 监听异常
    script.addEventListener("error", (err) => {
      document.body.removeChild(script)
      reject("异常：", err);
    })

    // 添加js节点到document上时，开始请求
    document.body.appendChild(script);
  })

}

jsonp('http://shuliqi.github.io', {a: 1, b: 'heiheihei'})
.then(result => { console.log(result) })
.catch(err => { console.error(err) })
