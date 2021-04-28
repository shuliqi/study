# HTML

### 1. Doctype作用？

DOCTYPE是html5标准网页声明，且必须声明在HTML文档的第一行。来告知浏览器的解析器用什么文档标准解析这个文档。

文档解析类型有：

- `BackCompat`：怪异模式，浏览器使用自己的怪异模式解析渲染页面。（如果没有声明DOCTYPE，默认就是这个模式）

- `CSS1Compat`：标准模式，浏览器使用W3C的标准解析渲染页面。

  

  其中最大的不同就是：就是盒子模型的不同。

  ##### 如何触发怪异模型：不写 DOCTYPE

```
// 告知文档使用 html5 标准来解析
<!DOCTYPE html> 
```

### 2. HTML语义化

- 用正确的标签做正确的事情。
- html语义化让页面的内容结构化，结构更清晰，便于对浏览器，搜索引擎解析；
- 即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的；
- 搜索引擎的爬虫也依赖于HTML标记确定上下文和各个关键字的权重，利于SEO;
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

### 3. HTML5有哪些新特性

这篇文章写的很清楚：https://www.cnblogs.com/vicky1018/p/7705223.html

##### a. 用于绘画的canvas元素；

##### b. 用于媒介回放的video和audio元素；

##### c. 对本地离线存储有更好的支持(**localStorage**, **sessionStorage**)

- 共同点

  存储大小为5MB，都保存在客户端，不与服务器进行交互通信，有相同的Web API

- 不同点：

  localStorage长期存储数据，浏览器关闭后数据不丢失；sessionStorage的数据在浏览器关闭后自动删除；

- 共同的api

  setItem(key,value)：为指定key值设置一个对应的value值

  ```javascript
  // 把name值存储到name的键上
  sessionStorage.setItem('name', 'jacky'); // 法1 
  // sessionStorage.name = 'jacky'; // 法2 
  // sessionStorage['name'] = 'jacky'; // 法3 
  ```

  getItem（key）：根据指定的key值获取对应的value值

  ```javascript
  // 获取存储到 name 的键上的值
  var name = sessionStorage.getItem('name');
  // var name = sessionStorage.name;
  // var name = sessionStorage['name'];
  ```

  removeItem（key）：删除指定的key值对应的value值

  ```javascript
  var name = sessionStorage.getItem('name'); // "jacky"
  sessionStorage.removeItem('name');
  name = sessionStorage.getItem('name'); // null
  ```

  clear()：删除所有存储的内容

  ```javascript
  // 清除 localStorage
  sessionStorage.clear();
  var len = sessionStorage.length; // 0
  //length属性用于获取 sessionStorage 中键值对的数量。
  ```

  key(index)：在指定的数字位置获取该位置的名字

  ```javascript
  sessionStorage.setItem('name','jacky');
  var key = sessionStorage.key(0); // 'name'
  sessionStorage.setItem('age', 10);
  key = sessionStorage.key(0); // 'age'
  key = sessionStorage.key(1); // 'name'
  ```

 ##### d. 语意化更好的内容元素

　语义化标签使得页面的内容结构化

| 标签                  | 描述                             |
| --------------------- | -------------------------------- |
| <hrader></header>     | 定义了文档的头部区域             |
| <footer></footer>     | 定义了文档的尾部区域             |
| <nav></nav>           | 定义文档的导航                   |
| <section></section>   | 定义文档中的节（section、区段）  |
| <article></article>   | 定义页面独立的内容区域           |
| <aside></aside>       | 定义页面的侧边栏内容             |
| <detailes></detailes> | 用于描述文档或文档某个部分的细节 |
| <summary></summary>   | 标签包含 details 元素的标题      |
| <dialog></dialog>     | 定义对话框，比如提示框           |

 ##### e. 新的表单控件：

HTML5 拥有多个新的表单 Input 输入类型。这些新特性提供了更好的输入控制和验证。

| 输入类型       | 描述                         |
| -------------- | ---------------------------- |
| color          | 主要用于选取颜色             |
| date           | 从一个日期选择器选择一个日期 |
| datetime       | 选择一个日期（UTC 时间）     |
| datetime-local | 选择一个日期和时间 (无时区)  |
| email          | 包含 e-mail 地址的输入域     |
| month          | 选择一个月份                 |
| number         | 数值的输入域                 |
| range          | 一定范围内数字值的输入域     |
| search         | 用于搜索域                   |
| tel            | 定义输入电话号码字段         |
| time           | 选择一个时间                 |
| url            | URL 地址的输入域             |
| week           | 选择周和年                   |

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- 选取颜色的 -->
  <input type='color' value="#ff0878" id="color">

  <!-- 选取日期 -->
  <input type='date' id='date'>
</body>
<script type="text/javascript">
  document.getElementById("date").onchange = function(e) {
    console.log("date", e.target.value)
  }
  document.getElementById("color").onchange = function(e) {
    console.log("color", e.target.value)
  }
</script>
</html>
```

 ##### f. 新的技术webworker,websockt、Geolocation；

[webworker](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)， [websockt](http://www.ruanyifeng.com/blog/2017/05/websocket.html)，[Geolocation](https://javascript.ruanyifeng.com/bom/window.html#toc21)

### 3. html5哪些标签可以做SEO优化？

​      title、meta、header、footer、nav、article、aside

### 4. src和href的区别

- src是指向外部资源的位置，指向的内容会嵌入到文档中当前标签所在的位置，在请求src资源时会将其指向的资源下载并应用到文档内，如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，知道将该资源加载、编译、执行完毕，所以一般js脚本会放在底部而不是头部。
- href是指网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。

### 5. 什么叫优雅降级和渐进增强？

- `渐进增强`：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能，达到更好的用户体验。
- `优雅降级`：一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

### 6. defer和async的区别

- `defer`要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行。多个defer脚本会按照它们在页面出现的顺序加载。==“渲染完再执行”==
- `async`一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。多个async脚本是不能保证加载顺序的。==“下载完就执行”==

### 7. 各个浏览器的内核

* IE:trident
* 谷歌： 以前是webkit， 现在是Blink
* 火狐： gecko
* 欧朋： 开始是自己的presto， 后改称webkit, 现在是Blink
* 360: IE—chrome 双内核

