// 判断是否是回文
function isPalindrome(str) {
  return str.split("").reverse().join("") === str;
}
console.log(isPalindrome("abcdcba")); // true
console.log(isPalindrome("abcdcbF")); // false



function isPalindrome(str) {
  let i = 0, j = str.length - 1;
  while( i < j ) {
    if (str.charAt(i) !== str.charAt(j)) return false;
    i++;
    j--;
  }
  return true;
}
console.log(isPalindrome("abcdcba")); // true
console.log(isPalindrome("abcdcbF")); // false