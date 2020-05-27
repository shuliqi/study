### 1.盒子模型

![https://img4.mukewang.com/5b73f51e00015f7907740523.jpg](https://img4.mukewang.com/5b73f51e00015f7905000338.jpg)

![https://img1.mukewang.com/5b73f53f0001a7ec07610507.jpg](https://img.mukewang.com/5b73f53f0001a7ec05000334.jpg)





标准盒子模型： content就是content，不包含padding 和border： width = content.width

IE盒子模型： content 包含了 pading 和 border：width = content.width+ + padding + border；

box-sizing: content-box(加上padding和border，content不会减少)，border-box（加上border + padding， 内容是减少的）

[box-sizing的例子](https://codepen.io/shuliqi/pen/MWarpmQ)

### 2.css3的新属性

* word-wrap: 文字换行---->break-word， normal（浏览器默认处理）

* text-overflow：clip(修剪)，ellipsis(超出省略)

* text-decoration：

  * underline(文本下定义一条线)
  * overline(文本上定义一条线)
  * line-through(穿过文本的一条线)
  * blink(定义闪烁的文本

* text-shadow(h-shadow, v-shadow, blur, color)

  * h-shadow： 水平阴影的位置
  * v-shadow:    垂直阴影的位置
  * blur: 模糊的距离
  * color: 阴影的颜色

  ```css
  text-shadow: 5px 5px 5px #FF0000;
  ```

* gradient 渐变效果

  * liner-gradient: 上下左右渐变

    ```
    background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
    background-image: linear-gradient(#e66465, #9198e5);
    ```

  * radial-gradient： 径向渐变

    ````
    background-image: radial-gradient(shape size at position, start-color, ..., last-color);
    background-image: radial-gradient(red, yellow, green);
    ````

  

* transition：过度效果

  ```
  transition: property duration timing-function delay;
  ```

  * property: 规定设置过渡效果的 CSS 属性的名称。
  * duration： 过度时间
  * timing-function： 过渡曲线
  * delay： 延迟多少执行过度效果

  ```css
  .box {
    width: 200px;
    transition:width 2s ease-in 2s
  }
  .box: hover {
    width: 400px;
  }
  
  ```

* transform 2d 或者3d 变换

  translate --> 平面

  rotate(32deg) ---> 旋转

  scal() ---> 缩放

  skew----> 翻转

* animation(动画函数，动画时间，动画曲线，动画次数，是否反方向)

  * 动画曲线：linear（匀速）， ease（低速开始，然后加快，然后放慢结束），ease-in（低速开始），ease-out低速结束）， ease-in-out(低速开始和结束)
  * 是否反方向： alternate 反方向 normal(默认值)

  ```
  .box {
     animation:mymove 5s infinite;
  }
  @keyframes mymove {
  	0% {width: 100px;}
  	10% {width: 200px;}
  	100% {width: 500px;}
  }
  ```

Animation和transition大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是transition需要触发一个事件才能改变属性，而animation不需要触发任何事件的情况下才会随时间改变属性值，并且transition为2帧，从from .... to，而animation可以一帧一帧的。



### 3.选择器及其优先级

!imprtant > 内联样式 > id > class（类）> 元素 > 通配符

各选择器的权重：

内联样式： 1000   id： 0100， class： 0010， 其他的都是0000

选择用哪个css, 看权重的大小，权重大的优先使用， 如果权重相等， 那么按顺序来看， 在后面的回覆盖前面的。



### 4.BFC 

 块格式化上下文 , 一个独立的渲染区域

##### BFC的触发

* 跟元素（html）
* float 不为 none
* position 为 fixed 或者 absolute
* Overflow 不为visible
* Display 为 inline-block，flex, table-ceil等

##### BFC的规则

* 内部的box 垂直排列， 一个接着一个的放
* 垂直方向的距离由margin 决定,同一个bfc的box margi内会重叠，即使存在浮动元素也是如此
* 盒子的margin-left 会与其父级的盒子的border-left相接触，
* BFC区域的元素不会与浮动的元素重叠在一起
* b f c 计算高度的时候， 浮动元素的高度也需要计算进去
* Bfs 是一个独立的渲染空间，不会影响到外部
* ‘

##### BFC的应用

* 防止margin重叠

  [防止margin重叠](https://codepen.io/shuliqi/pen/bGVaRVy)

  由于b f cd的第二条规则： 会导致同一个bfc的margin重叠。但是不同的bfc 不会重叠，所以解决的办法就是另一个box 用一个b f c 包起来。

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>防止margin重叠</title>
  </head>
  <style>
      *{
          margin: 0;
          padding: 0;
      }
      p {
          color: #f55;
          background: yellow;
          width: 200px;
          line-height: 100px;
          text-align:center;
          margin: 30px;
      }
  </style>
  <body>
      <p>看看我的 margin是多少</p>
    <p>看看我的 margin是多少</p>
  </body>
  </html>
  ```

  效果是这样的

  ![image-20200208233305675](/Users/shuliqi/Library/Application Support/typora-user-images/image-20200208233305675.png)



如果我们不想想margin 重叠， 可以设置一个bFC

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>防止margin重叠</title>
</head>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    p {
        color: #f55;
        background: yellow;
        width: 200px;
        line-height: 100px;
        text-align: center;
        margin: 30px;
    }
    
    .shu {
        overflow: hidden;
    }
</style>

<body>
    <p>看看我的 margin是多少</p>
    <div class="shu">
        <p>看看我的 margin是多少</p>
    </div>
</body>

</html>
```

效果如图

![image-20200208235849899](/Users/shuliqi/Library/Application Support/typora-user-images/image-20200208235849899.png)



* 两栏自适应布局

  由于b f c的第二条规则,

  b f c 里面有一规定： 就是b f c 里面的元素的左边都紧紧挨着b f c的左边， 即使是浮动的元素。

  所以在左左边固定并且float： left， 右边自适应的时候， 右边的也是紧挨着b f c的左边。所以不能实现，但是b f c 里面也还有一条，bfc 不会与浮动元素重叠。 所以我们只需要把右右边的box设置成b f c 就可以了。

  [左边固定， 右边自适应的例子](https://codepen.io/shuliqi/pen/rNOpwjj) 

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <style>
      *{
          margin: 0;
          padding: 0;
      }
      body {
          width: 100%;
          position: relative;
      }
   
      .left {
          width: 100px;
          height: 150px;
          float: left;
          background: rgb(139, 214, 78);
          text-align: center;
          line-height: 150px;
          font-size: 20px;
      }
   
      .right {
          height: 300px;
          background: rgb(170, 54, 236);
          text-align: center;
          line-height: 300px;
          font-size: 40px;
      }
  </style>
  <body>
      <div class="left">LEFT</div>
    <div class="right">RIGHT</div>
  </body>
  </html>
  ```

  效果如图

  ![image-20200209000225092](/Users/shuliqi/Library/Application Support/typora-user-images/image-20200209000225092.png)

又因为第三条规则。b f c 不会与浮动元素重叠

​	

所以我们让right单独成为一个BFC

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    body {
        width: 100%;
        position: relative;
    }
 
    .left {
        width: 100px;
        height: 150px;
        float: left;
        background: rgb(139, 214, 78);
        text-align: center;
        line-height: 150px;
        font-size: 20px;
    }
 
    .right {
        overflow: hidden;
        height: 300px;
        background: rgb(170, 54, 236);
        text-align: center;
        line-height: 300px;
        font-size: 40px;
    }
</style>
<body>
    <div class="left">LEFT</div>
    <div class="right">RIGHT</div>
</body>
</html>

```

![image-20200209000336363](/Users/shuliqi/Library/Application Support/typora-user-images/image-20200209000336363.png)



* 清除浮动

  当一个父级不设置高度， 里面的元素有浮动， 那么就有父级高度塌陷的结果. 但是如果这个父级一个b f c。 bfc 里面有一条规则就是 算父级的高度， 需要把浮动元素的高度算上

  所以解决的办法就是： 给父级设置为一个bfc。

  [清除浮动的方法](https://codepen.io/shuliqi/pen/QWjagMb)

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>清除浮动</title>
  </head>
  <style>
      .par {
          border: 5px solid rgb(91, 243, 30);
          width: 300px;
      }
      
      .child {
          border: 5px solid rgb(233, 250, 84);
          width:100px;
          height: 100px;
          float: left;
      }
  </style>
  <body>
      <div class="par">
          <div class="child"></div>
          <div class="child"></div>
      </div>
  </body>
  </html>
  
  ```

  ![image-20200209000554640](/Users/shuliqi/Library/Application Support/typora-user-images/image-20200209000554640.png)

  由于 b f c 计算高度的时候， 浮动元素的高度也需要计算进去

  所以我们可以设置父级的元素为一个bfc

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>清除浮动</title>
  </head>
  <style>
      .par {
          border: 5px solid rgb(91, 243, 30);
          width: 300px;
          overflow: hidden;
      }
      
      .child {
          border: 5px solid rgb(233, 250, 84);
          width:100px;
          height: 100px;
          float: left;
      }
  </style>
  <body>
      <div class="par">
          <div class="child"></div>
          <div class="child"></div>
    </div>
  </body>
  </html>
  ```

  

  ![image-20200209000645044](/Users/shuliqi/Library/Application Support/typora-user-images/image-20200209000645044.png)

### 5.块级元素

块级元素一般为结构性标记

H1 ~ h6, div, form， ul, table， p等

块级元素的特点

* 块级元素总是从新的一行开始
* 块级元素的宽高，都是可控的
* 块级元素的默认宽高都是100%
* 块级元素可以包含块级元素，行内元素



### 6.行内元素

行内元素一般是描述性标签

span  img， a, br, input, select等

行内元素的特点

* 行内元素与其他元素在同一行
* 行内元素宽高是不可控的
* 行内元素的宽就是内容的宽度，高就是内容的高度
* 行内元素 不可以包含块级元素

### 7. position的值

* absolute ： 生成绝对定位，相对于static以为的第一个元素进行定位的， 元素的定位通过top，left，buttom， right 来定位的
* fixed: 生成绝对定位， 相对于浏览器来定位的。通过top，button，left，right 来定位的。
* rrelective: 生成相对定位的， 就是相对于它自己正常的定位来定位的，假如：left： 20， 那么这元素的左边会多处20px
* static： 没有定位， 就就出现在正常的流里面， 设置to， left，right 是没有用的。 



### 8. flex 布局

[f le x布局](https://shuliqi.github.io/2018/03/31/Flex%E5%B8%83%E5%B1%80)

##### 设置为f le x 布局

```
.div {
		display: flex;
}

// 行内元素
span {
display: inline-block;
}
```

也就是说在一个连接里面， 可以发多个请求。

* flex-direction:  设置主轴

  row，row- reverse， column， column-reverse

* flex-wrap： 当空间容不下时

  nowrap， wrap，wrap-reverse

* flex-flow：flex-direction flex-flow（row nowrap）

* Justify-content:  主轴的对齐返回式

  flex-start, flex-end, center, space-bettween, space-around;


* align-items: 设置交叉轴的对齐方式

  flex-start， flex-end，center， baseline，stretch

* aligin-content：flex-start，lex-end，center， stretch， space-between， space-around

  align-items 是单轴， 多轴都是有效的，aligin-content 是多轴有效， 如果当前布局是单轴： align-items ， aligin-content 同时存在， 那么align-items  有效。 如果是多轴，align-items ， aligin-content 同时存在， 那么aligin-content有效

##### 项目的属性

* order： 项目排列的顺序， 数值越小越在前面

* flex-grow： 项目的放大属性，默认值为0， 即 存在剩余空间 也不放大

* flex-shrink： 项目的缩小，默认值是1 ， 如果空间不足， 则虽小

* flex-basis： 浏览器计算剩余空间时， 项目占主轴的空间， 默认值是auto 按照元素自己的大小

* flex： flex-grow flex-shrink：flex-basis（0 1 auto）

* aligin-self： 单独设置某个项目：

  flex-start，flex-end， center， baseline，center， stretch



### 9.水平垂直居中

[垂直居中](https://codepen.io/shuliqi/pen/gOazvab)

* 块级元素 [已知道宽高 + position](https://codepen.io/shuliqi/pen/jObYLXz)

  ```javascript
  .div {
    position: absolute;
  	width: 100px;
  	height: 100px;
  	background: yellow;
  	left: 50%;
  	margin-left: -50px;
  	top: 50%;
  	margin-top: -50px
  }
  ```

* 块级元素 行内元素都有用：[flex布局](https://codepen.io/shuliqi/pen/abvEyge)

  ```
  .con {
  	width: 100%;
  	height: 100vh;
  	display: flex;
  	justify-content; center;
  	align-items: center;
  }
  .div {
  	width: 100%;
  	height: 100px;
  	background: red;
  }
  ```

* [未知宽高](https://codepen.io/shuliqi/pen/RwWxLNK)

  ```css
  .con {
    width: 100%;
    height: 100vh;
  }
  .div {
    position: absolute;
    width: 100px;
    height: 100px;
    background: red;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  ```

* [top/left/bottom/right=0, 绝对定位](https://codepen.io/shuliqi/pen/abvELNb)

  ```
  .div { 
  	width:100px;
  	height: 100px;
  	backgrpund: red;
  	position: absolute;
  	top: 0;
  	left: 0;
  	right: 0;
  	bottom:0;
  	margin:auto;
  }
  ```



### 10.水平居中

* 行内元素

  ```css
  text-align: center
  ```

* 块级元素

  ```
  margin: 0. auto
  ```

* Flex 布局

  ```css
  display: flex
  justify-content:center
  ```

* 绝对定位定宽

  ```css
  {
  	position: absolute;
  	width: 100px;
  	left: 50%;
  	margin-left: -50px;
  }
  ```

* 绝对定位不定宽

  ```css
  {
  	position: absolute;
  	left: 50%;
  	transform: translate(-50%, 0)
  }
  ```

* Left/right： 0

  ```
  {
  	position: absolute;
  	width: 200px;
  	left: 0;
  	right: 0;
  	margin: 0 auto;
  }
  ```



### 11. 垂直居中

* 行内元素

  ```css
  .parent {
  	height: 200px;
  }
  .child {
  	line-height: 200px;
  }
  ```

* 块级元素

  ```css
  .parent {
  	display: table;
  }
  .child {
  		display: table-ceil;
  		vertical-aligin: middle
  }	
  ```

* 绝对定位定宽

  ```css
  {
  	position: absolute;
  	height: 100px;
  	top: 50%;
  	margin-top: -50px;
  }
  ```

* Flex 布局

  ```css
  {
  	display: flex;
  	aligin-items: center
  }
  ```

* 绝对定位不定高

  ```css
  {
  	position: absolute;
  	top: 50%;
  	transform: translate(0, -50%);
  }
  ```

* Button/top： 0

  ```css
  {
  	positoon: absolute;
  	botton: 0;
  	top: 0;
  	margin: auto 0;
  }
  ```

  

### 12 个浏览器的内核

* IE:trident
* 谷歌： 以前是webkit， 现在是Blink
* 火狐： gecko
* 欧朋： 开始是自己的presto， 后改称webkit, 现在是Blink
* 360: IE—chrome 双内核

### 13. 怪异模式和标准模式

* 怪异模式： 就是使用浏览器自己的解析方式去解析。
* 标准模式： 就是html css 的标准去解析。

因为在没有出现html css  标准时， 是各个各个浏览器各自实现的。

其中最大的不同就是：就是盒子模型的不同。

 ##### 如何触发怪异模型：不写doctype

### 14. DOCTYPE 是什么

<!docTYPE> 在html 标签的前面。用来表明web浏览器该使用哪个版本的html来编写指令，然后浏览器才知道用哪个规范来解析。


### 15 em, rem, px

px 绝对的像素

em: 相对于父级的像素font-size， 浏览器默认fot-size：16px 1em = 16px;

rem: 相对于根元素的font-size 浏览器默认fot-size：16px 1rem = 16px



### 16.用css实现一个宽高恒为父容器宽度一半的正方形，父容器宽高均不固定



#### 17. position

* absolute：  生成绝对定位，以非static定位的第一个元素进行定位的， left，top
* fixed： 生成绝对定位，按照浏览器窗口来定位的 left，top
* relative： 生成相对定位，根据正常的定位的来定位的 left，top
* static： 没有定位， 以正常的流来布局

#### 19. 左边固定， 右边自适应

[float实现](https://codepen.io/shuliqi/pen/JjYmVZd)
[绝对定位](https://codepen.io/shuliqi/pen/dyYgLjX)

[b f c实现](https://codepen.io/shuliqi/pen/VwvENGm)

[flex](https://codepen.io/shuliqi/pen/BaoqEPJ)

