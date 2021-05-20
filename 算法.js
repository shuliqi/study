const { Console } = require("node:console");

// 冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j - 1] > arr[j]) {
        const temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbleSort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]

// 快速排序
function quickySort(arr) {
  if (arr.length == 0) {
    return arr;
  } else {
    var leftArr = [];
    var rightArr = [];
    var base = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > base) {
        rightArr.push(arr[i]);
      } else {
        leftArr.push(arr[i]);
      }
    }
  }
  return quickySort(leftArr).concat(base, quickySort(rightArr));
}
console.log(quickySort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    const mid = Math.ceil(arr.length * 0.5);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
  }
}

function merge(left, right) {
  const result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  return result.concat(left, right);
}
console.log(mergeSort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]

function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0) {
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
console.log(insertSort([4, 1, 8, 3, 2, 8, 11, 0])); // [0, 1, 2, 3, 4, 8, 8, 11]

function unique(a) {
  const result = [a[0]];
  for (let i = 0; i < a.length; i++) {
    const items = a[i];
    if (!result.includes(items)) {
      result.push(items);
    }
  }
  return result;
}
console.log(unique([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]));

function permutate(str) {
  var array = str.split("");
  function loop(array, pre = []) {
    if (array.length == 1) {
      return [pre.concat(array).join("")];
    }
    let res = [];
    for (let index = 0; index < array.length; index++) {
      var first = array.pop();
      res = res.concat(loop(array, [...pre, first]));
      array.unshift(first);
    }
    return res;
  }
  return Array.from(new Set(loop(array)));
}

console.log(permutate("abc"));



// 回文字符串
// 使用api方式
function isPalindrome(str) {
  if (typeof str !== 'string') return;
  return str.split("").reverse().join("") === str;
}



// 递归方式
function isPalindrome (str) {
  if (typeof str !== 'string') return;
  let i = 0, j = str.length - 1;
  while(i < j) {
    if (str.charAt(i) === str.charAt(j)) {
      i++;
      j--;
    } else {
      return false
    }
  }
  return true;
}
console.log("11", isPalindrome('abccba')) // true


function lengthOfLongest(str) {
  const subArr = [];
  let max = 0;
  for(let i = 0 ; i < str.length; i++ ) {
    const index = subArr.indexOf(str.charAt(i))

    if (index === -1) {
      subArr.push(str[i]);
      //  Math.max 返回一组数据中较大的值
      max = Math.max(subArr.length, max) 
    } else {
      subArr.splice(0, index)
    }
  }
  return max
}

console.log(lengthOfLongest('abcabcbb')); // 3




// 最小栈
function MinStack() {
  this.items = [];
  this.min = null;
}
MinStack.prototype.push = function (x) {
  if (!this.min) this.min = x;
  this.min = Math.min(x, this.min)
  this.items.push(x);

}
MinStack.prototype.pop = function() {
  this.items.pop();
  this.min = Math.min(...this.items)
};
MinStack.prototype.top = function() {
  return this.items[this.items.length - 1];
}
MinStack.prototype.getMin = function() {
  return this.min;
}

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin());   // --> 返回 -3.
minStack.pop();
console.log(minStack.top());      // --> 返回 0.
console.log(minStack.getMin());   // --> 返回 -2.

function isvalid(str) {
  const obj = {
    '{':'}',
    '[':']',
    '(':')'
  };
  const stack = [];
  for( let i = 0; i < str.lengt; i++) {
    if (obj[str[i]] === str[i]) {
      stack.push(str[i]);
    } else if (str[i] !== obj[stack.pop()]) {
      return false;
    }
  }
  return stack.length === 0;
}
console.log(isvalid("([)]"));
console.log(isvalid( "()"));
console.log(isvalid('()[]{}'));
console.log(isvalid( "(]"));

console.log(isvalid( "()"));

function deletStr(str) {
  const stack = [str[0]];
  for (let i = 1; i < str.length; i++) {
    const popValue = stack.pop();
    if ( popValue !== str[i]) {
      stack.push(popValue);
      stack.push(str[i]);
    }
  };
  return stack.join("");
}
console.log(deletStr("abbaca"));