function Compile(vm) {
  this.vm = vm;
  this.el = vm.$el;
  this.fragment = null;
  this.init();
}
Compile.prototype = {
  init: function() {
    this.fragment = this.nodeFragment(this.el);
    this.compileNode(this.fragment);
  },
  // 获取当前 el 下面的所有元素 放到 文档片段 fragment 里面去
  nodeFragment: function(el) {
    // 创建一个空白的文档片段
    const fragment = document.createDocumentFragment();
    
    // 把页面 el 下面的所有 子节点都放到文档片段里面去
    // appendChild:Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。
    // 如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置
    //（不需要事先移除要移动的节点）。
    let child = el.firstChild;
    while(child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  // 解析节点： 也就是替换 {{}}
  compileNode: function(fragment) {
    // Node.childNodes 返回包含指定节点的子节点的集合
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(node => {
      if (this.isElementNode) {
        //如果是元素节点
        
      }
    });
  },

  isElementNode: function(node) {
    // nodeType 属性返回节点类型。
    // 如果节点是一个元素节点，nodeType 属性返回 1。
    // 如果节点是属性节点, nodeType 属性返回 2。
    // 如果节点是一个文本节点，nodeType 属性返回 3。
    // 如果节点是一个注释节点，nodeType 属性返回 8。

    // 元素节点：构成了DOM的基础。文档结构中，<html>是根元素，代表整个文档，其他的还有<head>,<body>,<p>,<span>等等。元素节点之间可以相互包含(当然遵循一定的规则)
    // 文本节点：包含在元素节点中。
    // 属性节点：元素都可以包含一些属性，属性的作用是对元素做出更具体的描述，比如id,name之类的。
     return node.nodeType === 1;
  }
}