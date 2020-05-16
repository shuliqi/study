# 冒泡排序

`思想：`比较相临的两个数，大的数和小的数进行交换位置。

```javascript
{
    // 冒泡算法
    function bubbleSort(arr) {
        const len = arr.length;
        for(let i = len - 1; i > 0; i--) {
            for(let j = 1; j <= i; j++ ) {
                if (arr[j-1] > arr[j]) {
                    let temp = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    return arr;
    }
    console.log(bubbleSort([4,1,8,3,2,8,11,0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}
```

![img](https://images0.cnblogs.com/blog2015/687225/201508/231536252537446.png)





# 快速排序

`思想：` 选定一个数作为基准，小于这个基数放在一个S集合， 大于这个基数的放在另外一个B集合。这两个集合分别进行快速排序。 最后S集合，基数，B 集合进行合并。

```javascript
{
    // 快速排序
    function quickSort(arr) {
        if (arr.length <= 1) {
          
        } else {
            var leftArr = []; // 比基数小的集合
            var rightArr = []; // 比基数大的集合
            var base = arr[0]; // 基数
            for(let i = 1; i < arr.length; i++ ) { // 注意不能和基数混合 i是从1 开始的
                if (arr[i] < base) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
        }
        return quickSort(leftArr).concat(base, quickSort(rightArr));
    }
    console.log(quickSort([4,1,8,3,2,9,11,0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}
```

![img](https://images0.cnblogs.com/blog2015/687225/201508/231537564105629.jpg)







# 归并排序

采用分治的方式，将无序的数组拆分成N 部分，然后再合并

```javascript
{
    // 递归排序
    function mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        } else {
            const mid = Math.ceil(arr.length * 0.5);
            const left = arr.slice(0, mid);
            const right = arr.slice(mid);
            return merge(mergeSort(left), mergeSort(right))
        }
    }
    function merge(left, right) {
        const result = [];
        while(left.length > 0 && right.length > 0) { // 注意这里是&&
            if (left[0] < right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        return result.concat(left, right);
    }
    console.log(mergeSort([4,1,8,3,2,9,11,0])); // [0, 1, 2, 3, 4, 8, 9, 11]
}
```

![clipboard.png](https://segmentfault.com/img/bVbc9vd?w=1014&h=855)



# 插入排序

`思想：`在已经排好序的序列上在插入一个数， 这个数与有序序列的数进行比较，放在合适的位置

```javascript
{
    // 插入排序
    function insertSort(a) {
        let len = a.length;
        for( let i = 1; i < len; i++) {
            let key = a[i];
            let j = i - 1;
            while( j >= 0) {
                if (a[j] > key) {
                    a[j+1] = a[j];
                } else {
                    break; // 结束循环
                }
                j--;
            }
            a[j + 1] = key;
        }
        return a;
    }
    console.log(insertSort([4,1,8,3,2,9,11,0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}
```

![img](https://images0.cnblogs.com/blog2015/687225/201508/231533515818732.png)





# 选择排序

`思想:`每一次循环都找出最大的数或者最小的数；

```javascript

{
    // 选择排序
    function selectSort(a) {
        const len = a.length;
        for( let i = 0; i < len; i++ ) {
            let min = a[i];
            let index = i;
            for( let j = i + 1; j < len; j++ ) { // 注意： 是从i+1 开始的
                if (a[j] < min) {
                    min = a[j];
                    index = j;
                }
            }
            if (index !== i) {
                let temp = a[i];
                a[i] = min;
                a[index] =temp;
            }
        }
        return a;
    }
    console.log(selectSort([4,1,8,3,2,9,11,0])); // [0, 1, 2, 3, 4, 8, 8, 11]
}
```

![img](https://images0.cnblogs.com/blog2015/687225/201508/231538466606780.jpg)