
// 退出前 eventEmitter
process.on('beforeExit', function (code) {
  console.log(code);
})

// throw new ('sdfj');
// 退出
process.on('exit', () => {
  console.log('exit event');
})

process.on('uncaughtException', (err) => {
  console.log('uncaught!!!', err.message);
})

nonexistentFunc();