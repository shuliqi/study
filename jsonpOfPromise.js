const jsonp = function (url, data) {
  return new Promise((resolve, reject) => {
    let params = "";
    for(const key in data) {
      params = params + "&" + key + "=" + data[key];
    }
    const callbackName = "callback";
    url = url + "?" + params + "&callback=" + callbackName;

    const script = document.createElement("script");
    script.src = url;

    // 回调函数处理
    window[callbackName] = (result) => {
      if (result) {
        resolve(result);
      } else {
        reject("并没有返回数据");
      }
      // 触发之后记得删除 回调函数
      delete window[callbackName]
    }

    // 如果有异常
    script.addEventListener("error", (err) => {
      delete window[callbackName];
      reject("资源加载异常")
    });

    // 添加js节点到document上时，开始请求
    document.body.appendChild(script);
  });
};

const data = {
  name: "shuliqi",
  age: 12,
}
jsonp("http://shuliqi.github.io/", data)
  .then((result) => {
    console.log("成功回调", result);
  })
  .catch((err) => {
    console.log("回调失败", err)
  })
