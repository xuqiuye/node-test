const { Writable, Readable, PassThrough } = require('stream');
const fs = require('fs');

const writable = fs.createWriteStream('./file.txt'); // 可写流
const readable = fs.createReadStream('./index.js');

readable.pipe(writable);
// const readable = new Readable();
/* const pass = new PassThrough();

pass.pipe(writable);
pass.unpipe(writable);

pass.on('data', (chunk) => {


})

pass.write('一些东东吧!');

pass.resume();
pass.on('error', (e) => {
  console.log(e.message);
})

writable.on('error', () => {
  console.log('error');
}) */

/* readable.pipe(writable);
readable.unpipe(writable); */
