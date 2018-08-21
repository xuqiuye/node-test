// const buffer = require('buffer');

// console.log(Buffer.from('string'));
var arr = new Uint16Array(2);

arr[1] = 333
arr[2] = 444

// 复制 typeArray的值
var buf1 = Buffer.from(arr);

// 共享内存
var buf2 = Buffer.from(arr.buffer);

/* console.log(buf1)

console.log(buf2)

arr[1] = 2322

console.log(buf1)

console.log(buf2) */


var buf3 = Buffer.alloc(10, 333);
// console.log(buf3)

// 使用allocUnsafe很明显会包含其他数据
var buf4 = Buffer.allocUnsafe(10);
console.log(buf4)
buf4.fill(0)
console.log(buf4);
/* 
console.log(buf4.toString('hex'));
console.log(buf3.toString('hex')); */