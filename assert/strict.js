// 严格的模式
// const assert = require('assert').strict;
const assert = require('assert')

// assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
let a = 9;
try {
    assert.deepEqual(1, '1', '错误不等人')
} catch (err) {
    console.log(err.message)
}

// assert.doesNotReject(
//     /* new Promise(
//         (resolve, reject) => { 
//             reject(new Error('真！错误'));
//         }
//     ) */
//     Promise.reject(new Error('真！错误'))
// ).then(err => {
//     console.log(err);
// });

assert.doesNotThrow(
    () => {
        throw new TypeError('类型错误')
    },
    'error'
    // TypeError
    //SyntaxError
)

