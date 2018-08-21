const { Readable } = require('stream');
const logger = require('pino')();

const readable = new Readable();
// const logger = new Logger();


// event even loop
readable.on('close', () => {
  logger.info('关闭可读流');
})

let body = '';
readable.on('data', (chunk) => {
  body += chunk;
})
logger.info('读取可读流的数据', body);

readable.on('readable', () => {
  logger.info('是否可读');
})

readable.on('end', () => {
  logger.info('over');
});

// 方法
// readable.pipe(writable, [options]) // 接收一个可写流
// readable.destroy() // 销毁流 触发error事件
// readable.pause() // 关闭flowing流
