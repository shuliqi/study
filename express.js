const http = require("http")
const express = function () {
  const middlewares = [];
  const app = function (req, res) {

    // 是否匹路由
    const  m = req.method.toLowerCase();
    const path = url



    // 中间件
    let i = 0;
    const next = function () {
        const fn = middlewares[i++];
        if (!fn) {
          return;
        }
        fn(req, res, next);
    } 
    next();


  }
  app.use = function (middleware) {
    middlewares.push(middleware);
  }


  //  管理路由
  const routers = [];
  app.get = function(path, handler) {
    const route = {
      path,
      method: "get",
      handler
    }
    routers.push(route);
  }

  app.listen = function(...arg) {
    // http.createServer的参数是一个函数， 将req, res 传递进去
    const server=  http.createServer(app);
    server.listen(...arg);
    return server
  }
  return app;
}


var app = express();
app.listen(3000, 'localhost', () => {
  console.log(`开始监听3000端口`)
})

function middleware1(req, res, next) {
  console.log('middleware1 before next()');
  next();
  console.log('middleware1 after next()');
}

function middleware2(req, res, next) {
  console.log('middleware2 before next()');
  next();
  console.log('middleware2 after next()');
}

function middleware3(req, res, next) {
  console.log('middleware3 before next()');
  next();
  console.log('middleware3 after next()');
}

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);

