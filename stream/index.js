// let stream = getWritableStreamSomehow();

const http = require('http');
// const assert = require('assert')
const stream = require('stream')

/* const writable = new stream.Writable();

writable.cork(); */

const app = http.createServer((req, res) => {
  const writer = res;
  const reader = req;
  /* for (let i = 0; i < 10; i++) {
    writer.write(`你好，#${i}!\n`);
  } */
  // stream.cor;
  /* process.nextTick(() => {
    writer.uncork();
  }) */
  writer.write('some thing')
  setTimeout(() => writer.end('这是结尾\n'), 1000);

  writer.on('finish', () => {
    console.error('所有写入已完成。');
  });
  /* writable.cork()
  process.nextTick(() => {
    console.log('坎坎坷坷', writable.uncork())
  }) */
  writer.on('pipe', (src) => {
    console.error('有数据正通过管道流入写入器');
    // assert.equal(src, reader);
  })

  writer.on('error', (error) => {
    console.log('流错误', error)
  })

  reader.pipe(writer);
  // console.log('ad', writable.writableHighWaterMark);
  // writer.destroy("哦哦哦哦哦哦");
  writer.on('close', error => {
    console.log('关闭流', error);
  })
})


app.on('request', (request, response) => {
  // some wrong
});

app.listen(4001)

