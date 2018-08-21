const assert = require('assert')

// 函数
// asert.ok()的别名，判断给定的值是否是真值
assert(5, '我是错误！')

// 
assert.deepEqual(1, 3, '是否')

// 检测promise是否接受reject错误
assert.doesNotReject(
  Promise.reject(new Error)
);

// 检测函数是否接受抛出的异常
assert.doesNotThrow(() => {
  throw new TypeError("类型错误"),
  TypeError
})

assert.equal(1, 2, '做工');

// 抛出 AssertionError，并带上提供的错误信息或默认的错误信息
assert.fail("fail")

// 
assert.throws();


