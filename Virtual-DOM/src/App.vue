<template>
  <div class="dom"></div>
</template>

<script>
import { createElement, render } from "./js/element";
export default {
  name: 'App',
  created () {
    var ul = createElement('div',{id:'virtual-dom'},[
      createElement('p',{},['Virtual DOM']),
      createElement('ul', { id: 'list' }, [
      createElement('li', { class: 'item' }, ['Item 1']),
      createElement('li', { class: 'item' }, ['Item 2']),
      createElement('li', { class: 'item' }, ['Item 3'])
      ]),
      createElement('div',{},['Hello World'])
    ]);
    var el = render(ul);
    document.body.appendChild(el);
  }
}
</script>
