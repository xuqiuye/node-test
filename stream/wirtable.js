const { PassThrough, Writable, Readable } = require('stream');

const pass = new PassThrough();
const writable = new Writable();
// const readable = new Readable();

console.log("流的状态112", pass.readableFlowing)

pass.pipe(writable);
pass.unpipe(writable);

console.log("流的状态", pass.readableFlowing)

pass.on('data', (chunk) => {
  console.log("流的状态-data", pass.readableFlowing)
  console.log(chunk.toString());
})

// 不会触发 'data' 事件。
for (let i = 0; i < 500; i++)
  pass.write(`OK${i}`);

// 调用它才会触发 'data' 事件。
process.nextTick(() => {
  console.log(1000)
  // pass.resume();
})

setTimeout(() => {
  pass.resume();
}, 2000)

/* Readable.on('readable', function () {

}); */

/* async function sleep(ms) {
  return await setTimeout(() => {
    return 'one'
  }, ms);
}
(async () => { */


  // await sleep(10000);
// })()
