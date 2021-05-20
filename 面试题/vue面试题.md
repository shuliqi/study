# vue 面试题





## 1.vue 组件有哪些通讯方式

- props，$emit

- $parent，$childen

- ref

- $attrs， $listeners

- provide/ inject 

  不支持响应式，如果要做成响应式的， vue2版本以上的，可以使父级组件的 provide 值是一个函数， 函数里面返回该组件的动态数据，子组件就调用这个函数。因为函数保存了父组件的实例，所以能获取到最新的数据。注意函数要写箭头函数

- eventBus.js --- 事件总线的方式

