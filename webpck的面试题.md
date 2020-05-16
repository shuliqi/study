### 1. webpack于grunt，gulp 有什么区别

相同点：都是前端构建的工具

不同点：

* Grunt, Gulp  是基于流管理任务的，在一个配置文件里面通过构建一个一个的task， 合理分配task之间的各种调用关系。来完成对某些文件的编译， 打包，压缩等工作， 之后这些task就可以帮助我们完成任务了。
* webpack 是基于入口文件的，把整个项目当成一个整体，通过入口文件，递归的构建关系依赖图， 然后通过loaders， plugins 扩展功能，来把项目的模块打包成一个或者多个浏览器能够识别的buldes

### 2. 与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？

* webpack适用于大型的前端构建的网站

* rollup 适用于基础库的打包

* parcel 更适用于简单恶实验性的项目， 可以满足快速看到效果的。

  但是parcel在打包的过程中给出的信息很少，所以打包出错的话， 很难调试。

  

### 3. .有哪些常见的Loader？他们是解决什么问题的？

* image-loader： 对图片进行压缩
* source-map-loader： 在soure-map 添加文件的，便于断点调试
* babel-loader: 将ES6 转 成ES5 语法 的
* eslint-loader: 通过ESlint检查j s代码
* css-loader： 加载css，支持模块化， 压缩等
* style-loader: 将css注入JavaScript里面， 通过dom去加载css

如何配置一个loader（如css-loader）

```javascript
npm i --save-dev css-loader
```

```javascript
module.exports = {
	module: {
		rules: [
			{ test: /\.css$/, use: ['css-loader']}
		]
	}
}
```

### 4. .有哪些常见的Plugin？他们是解决什么问题的

* DefinePlugin： 在编译的时候配置一个全局变量的

  ```javascript
  module.exports = {
  	plugins: [
  		new webpack.DefinePlugin({
  			name:"shuliqi",
  			age:23
  		})
  	]
  }
  ```

* CommonChunkPlugin:  提取公共代码的

  ```javascript
  {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
      	filename: string, // 提取出来的公共的代码的文件的名字
      })
  
    ]
  }
  ```

### 5. Loader和Plugin的不同？

##### 不同的作用：

webpack 是将所有的文件都看成是模块，但是webpack本身就只能解析javascript文件， 所有想要解析其他的类型的文件， 就需要用到loader了， 换种说法来说， loader就是给webpack 提供了解析非javascript文件的能力。

plugin 是为了扩展webpack的功能，是为了让webpack更加灵活。 在webpack运行的过程中会广播出很多事件， webpack能监听到到这些事件， 然后通过webpack 提供的恶api改变输出的结果

##### 不同的用法：

loader 是在是没module 的rules使用的。是当成一个模块的规则来使用的。 类型是一个数组，数组是一个一个的loader 配置obj， 有真多某种类型(test),使用某种loader。

plugin 是单独配置的。配置项是在构造函数里面配置的。



### 6. webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全

* 初始化参数

  根据配置文件或者是shell命令整合一下参数， 得到最终的一个参数

* 开始编译：

  根据上一步得到的参数初始化对象， 加载所有的配置插件， 开始执行对象的run 方法

* 确认入口：

  从配置文件的entry 确认入口

* 编译模块

  从入口开始，对所有的模块用loader翻译， 然后找出模块依赖的模块. 递归循环此步骤。

* 完成模块编译： 

  得到每个模块翻译后额内容已经它们的之间的依赖关系

* 输出结果

  根据入口的文件以及个模块之前的关系， 组装成一个一个的chunk。 然后每一个chunk都加入到输出文件列表

* 完成输出：

  根绝配置文件的output。 将编辑好的文件命名号然后输出到执行路径的文件系统  。   

