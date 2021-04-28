### 1.react 的组件类型

- 构造函数组件

  构造函数组件 可接受外部传入的参数 props，生成并返回一个 React 元素（伪 DOM）

- Class 关键字组件

  class 关键字和 es6 的的书写方式非常相同，可以通过 React.Component 进行创建，与构造函数不同的是： 该组件可以进行复杂逻辑的处理，不仅可以接受参数 props， 还可以有自己的 state，用于内部的通信

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Hello React!</title>
      <script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
      <script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
      <script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
    </head>
  
    <body>
      <div id="example"></div>
      <script type="text/babel">
        // 构造函数组件
        可以接受一个参数props;
        function GetName(props) {
          return <div>{props.name}</div>;
        }
        //  class 关键字组件
        class GetAge extends React.Component {
          constructor(props) {
            super(props);
            const state = {
              age: 12,
            };
          }
          render() {
            const { name } = this.props;
            const { age } = this.state;
            return (
              <div>
                我的名字是： {name}， 我的年龄是：{age}
              </div>
            );
          }
        }
        const getinfoEle = <GetAge name="shuliqkjashdgjaksjk" />;
        const element = <GetName name="shuloiqi" />;
        ReactDOM.render(
          <div>
            {getinfoEle}
            {element}
          </div>,
          document.getElementById("example")
        );
      </script>
    </body>
  </html>
  ```

### 2. 为什么 react 的组件要 super(props)

- 调用 super 的原因： 在 es6 中， 在 constructo 中必须下调用 super， 才能使用 this
- 调用 super(props)的目的: 是为了在 constructor 中可以使用 this.props

### 3. react 的生命周期

- constructor

1. 组件的初始化， 定义组件内部自己的状态， 定义中在 state 里面
2. 必须调用 super，不然 this 指向是有问题以及报错的
3. 在这个生命周期里面是访问不到 props 的，如果需要访问的话， 就调用 super(this)

- componentWillMount: 组件即将被挂载， 调用一次

- componetDidM0nut: 组件已经挂载完成， 这是可以获取真实的 dom, 通过 refs 获取

  ```h r
  this.refs.shuliqi
  return <div ref="shuliqi">我的名字是： {name}， 我的年龄是</div>;}
  ```

### 4 react hook

](https://react.docschina.org/docs/hooks-intro.html)

