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

const linked = new LinkedList();
linked.insert('1', 'head');
linked.insert('2', '1');
linked.insert('3', '2');
linked.insert('4', '3');
console.log(linked);
linked.remove('2');
console.log("------");
console.log(linked);


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






//  表示节点的类
class Node {
  constructor (data) {
    this.data = data; // 节点的数据
    this.next = null; // 指向下一个点的链接
  }
}

// 生成链表及其操作链表的方法 --> 链表类
class LinkedList {
  constructor () {
    // 生成头节点
    this.head = new Node("head");
  }

  /**
   * 找到含有该数据的节点
   * @param {*} data 
   */
  find(data) {
    // 创建一个新节点，将链表的头节点赋给这个新创建的节点
    let currentNode = this.head;
    while (currentNode && currentNode.data != data) {
      // 然后在链表上循环，如果当前节点的 element 属性和我们要找的信息不符，就将当前节点移动到下一个节点
      currentNode =  currentNode.next;
    }
    // 如果查找成功，该方法返回包含该数据的节点；否则，就会返回null。
    return currentNode;
  }
 
  /**
   * 插入节点， 在节点后面插入一个新节点：newData
   * @param {*} newData 新的数据
   * @param {*} data 在含有该数据的节点
   */
  insert(newData, data) {
    // 查找要在这个节点后面插入新节点的节点
    const currentNode = this.find(data);

    // 新的节点
    const newNode = new Node(newData); 

    // 新节点的next指向 在该节点后面插入新节点的节点的next
    newNode.next = currentNode.next;

    //  在该节点后面插入新节点的节点的next指向这个新节点
    currentNode.next = newNode;
  }

  // 查找一个节点的前一个节点
  findPrev(data) {
    let currentNode = this.head;
    while( currentNode.next && currentNode.next.data !== data) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  // 删除一个节点
  remove(removeData) {
    // 找到带删除节点的前一个节点
    const preNode = this.findPrev(removeData);
    // 如果前一个点为null，则直接退出
    if (preNode.next !== null) {
      // 待删除的节点
      const removeNode = this.find(removeData);
      // 待删除节点的 next 属性指向 待删除节点的 next
      preNode.next = removeNode.next;
    }
  }

  // 打印节点的数据
  display() {
    let currentNode = this.head;
    while( currentNode && currentNode.next ) {
      console.log(currentNode.next.data);
      currentNode = currentNode.next;
    }
  }
}

const linked = new LinkedList();
linked.insert('1', 'head');
linked.insert('2', '1');
linked.insert('3', '2');
linked.insert('4', '3');
linked.display();
linked.remove('2');
console.log("------");
linked.display();



//  表示节点的类
class Node {
  constructor (data) {
    this.data = data; // 节点的数据
    this.next = null; // 下一个点的链接
    this.pre = null // 上一节点的链接
  }
}

// 双向链表
class LLinkedList {
  constructor() {
    this.head = new Node("head");
  }

  /**
   * 找到含有该数据的节点
   * @param {*} data 
   */
  find(data) {
     // 创建一个新节点，将链表的头节点赋给这个新创建的节点
     let currentNode = this.head;
     while (currentNode && currentNode.data != data) {
       // 然后在链表上循环，如果当前节点的 element 属性和我们要找的信息不符，就将当前节点移动到下一个节点
       currentNode =  currentNode.next;
     }
     // 如果查找成功，该方法返回包含该数据的节点；否则，就会返回null。
     return currentNode;
  } 

  /**
   *  插入一个节点
   * @param {*} newData 插入的新数据
   * @param {*} currentData 要插入到有该数据的节点之后
   */
  insert(newData, currentData) {
    // 新节点
    const newNode = new Node(newData);
    // 当前节点：在该节点之后插入新的节点
    const currentNode = this.find(currentData);
    newNode.next = currentNode.next;
    newNode.pre = currentNode;
    currentNode.next = newNode;
  }

  /**
   * 删除一个节点
   * @param {*} removeData 删除含有该节点的节点
   */
  remove(removeData) {
    const removeNode = this.find(removeData);
    if (removeNode.next !== null) {
      removeNode.pre.next = removeNode.next;
      removeNode.next.pre = removeNode.pre;
    }
  }

  /**
   * 查找链表的最后有一个元素
   */
  findLast() {
    let currentNode = this.head;
    while(currentNode.next != null) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  // 打印节点的数据
  display() {
    let currentNode = this.head;
    while( currentNode && currentNode.next ) {
      console.log(currentNode.next.data);
      currentNode = currentNode.next;
    }
  }

  /**
   * 反向打印链表的数据
   */
  displayReverse() {
    let currentNode = this.findLast();
    while(currentNode.pre !== null ) {
      console.log(currentNode.data);
      currentNode = currentNode.pre;
    }
  }
}

const linked = new LLinkedList();
linked.insert('1', 'head');
linked.insert('2', '1');
linked.insert('3', '2');
linked.insert('4', '3');
linked.display();
linked.remove('2');
console.log("--删除了数据为2的节点----");
linked.display();
console.log("----findLast---");
console.log(linked.findLast().data);
console.log("----反向打印---");
linked.displayReverse();



class Node {
  constructor(data) {
    this.data = data;
    this.
  }
}
