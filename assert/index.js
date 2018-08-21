const assert = require('assert');

// 断句，方便调试函数
// strict 模式 和 legacy 模式

/**
 * 要理解是什么意思
 * 声明actual属性为 1 实际结果
 * 声明expected属性为 2 预期结果
 * 使用 strictEqual 操作符操作
 */ 
// 生成 ---> 模板
const { message } = new assert.AssertionError({
    actual: 2, // 实际输出结果 只能是数值吗？对象？数组？字符串？布尔值？函数？
    expected: 2, // 预期输出结果
    operator: 'strictEqual'
});

try {
    let a = 2;
    // 使用严格的模式比较实际值和预期值，如果符合预期则不抛出错误， 不符合则报错
    assert.strictEqual(3, 3);
} catch (err) {
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message);
    assert.strictEqual(err.name, 'AssertionError [ERR_ASSERTION]');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 2);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
}