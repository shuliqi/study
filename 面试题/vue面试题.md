# vue全家桶 面试题





## 1.vue 组件有哪些通讯方式

- props，$emit

- $parent，$childen

- ref

- $attrs， $listeners

- provide/ inject 

  不支持响应式，如果要做成响应式的， vue2版本以上的，可以使父级组件的 provide 值是一个函数， 函数里面返回该组件的动态数据，子组件就调用这个函数。因为函数保存了父组件的实例，所以能获取到最新的数据。注意函数要写箭头函数

- eventBus.js --- 事件总线的方式



```JS

export let Vue;
export class Store {
  constructor (options) {

    const state = options.state; // 这时候的state 是没有响应式
    //  利用 vue 的双先生管护局绑定来实现 vuex 的响应式
    const computed = {}
    this.vm = new Vue({
      data: {  state  },
      computed,
    });

    // getter
    this.getters = {};
    Object.keys(options.getters).forEach((fnName) => {
      computed[fnName] = options.getters[fnName](this.vm.state);
      Object.defineProperty(this.getters, fnName, {
        get() {
          return this.vm[fnName](this.vm.state);
        }
      })
    })

    // mutation

    this.mutations = {};
    Object.keys(options.mutations).forEach((mutationName) => {
      this.mutations[mutationName] = ((payload) => {
        options.mutations[mutationName](this.vm.state, payload)
      })
    })


    // actions
    this.actions = {};
    Object.keys(options.actions).forEach((actionName) => {
      this.actions[actionName] = (payload) => options.actions[actionName](this, payload)
    })



  }
  commit = (type, payload) => {
    this.mutations[type](payload)
  }

  dispatch = (type, payload) => {
    this.actions[type](payload);
  }
  // es6 class 的get 是可以截取的
  get state() { // 属性访问器   new Store().state  Object.defineProperty({get()})
    return this._vm._data.$$state
  }

}

export const install = (_vue) => {
  // 需要将根组件传入的 store 分配给每一个组件
  const Vue = _vue;
  // 通过混入的方式， 在每个组件实例化的 beforeCreate 将store 注入到每个组件
  Vue.mixin({
    beforeCreate: () => {
      const options = this.options;
      if (options.store) {
        this.$store = options.store;
      } else if (options.parent && options.parent.store) {
        // 根实例上没有的store属性，往父亲节点找
        // new Vue({store}) 这里已经在根组件挂载有store属性
        this.$store =  options.parent.store
      }
    }
  })
  
}
```

