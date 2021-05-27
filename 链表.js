function ListNode(val) {
  this.val = val; // 当前节点的值
  this.next = null // 下一个节点的链接
}

function LinkedList() {
  this.head = new ListNode("head");
}

LinkedList.prototype = {
  //查找节点
  find: function( item) {
    let currentNode = this.head;
    while( currentNode && currentNode.val !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  },
  //插入节点
  insert: function(newVal, item) {
    const currentNode = this.find(item);
    const newNode = new ListNode(newVal);
    newNode.next =  currentNode.next;
    currentNode.next = newNode;
    return newNode;
  },
   //删除节点
  remove: function(removeItem) {
    const preNode = this.findPrev(removeItem);
    const currentNode = this.find(removeItem);
    preNode.next = currentNode.next;

  },
  //查找前一个节点
  findPrev: function(item) {
    let currentNode = this.head;
    while(currentNode.next && currentNode.next.val !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  },
  //显示链表
  display: function() {
    let currentNode = this.head;
    while(currentNode.next !== null) {
      console.log(currentNode.next.val);
      currentNode = currentNode.next;
    }

  }
}

const l1 =  new LinkedList();
const l1_1 = l1.insert(2, 'head');
const l1_2 = l1.insert(4, 2);
const l1_13 = l1.insert(3, 4);


const l2 =  new LinkedList();
const l2_1 = l2.insert(5, 'head');
const l2_2 = l2.insert(6, 5);
const l2_13 = l2.insert(4, 6);

var addTwoNumbers = function(l1, l2) {
  let resNode = new ListNode(0); // 临时使用的 node 用来不停的增加链表节点
  let result = resNode; // 第一次挂载
  let tmpS = 0; // 相加 > 10 的进位数(1 或 0)
  while(l1 || l2 || tmpS) { // 判断 tmpS 的目的是防止最后还有一位进位需要前置
      let val1 = l1 ? l1.val || 0 : 0; // 需要判断 l1 是 null
      let val2 = l2 ? l2.val || 0 : 0; // 需要判断 l2 是 null
      let sum = val1 + val2 + tmpS; // this.val 相加并加上进位值
      tmpS = sum >= 10 ? 1 : 0; // 计算本次相加是否需要进位
      sum = sum % 10; // 当前位只需要个位数
      if(l1) l1 = l1.next; // 遍历链表
      if(l2) l2 = l2.next; // 遍历链表
      resNode.next = new ListNode(sum); // 将当前结果挂到临时的 node 上
      resNode = resNode.next; // 如果要继续挂载链表，需要将当前的指针移动到 next 上
      console.log(resNode)
  }
  return result.next; // result 是 resNode, resNode.next 才是最终结果
};
console.log("1111", addTwoNumbers(l1_1, l2_1))




let res  = {
  name: "111",
  next: null
}
let result  = res;

res.name = "hahah"
res.next = {
  name:"222",
  next: null
}
res = res.next;
console.log(result, res);