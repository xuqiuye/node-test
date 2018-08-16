const moment = require('moment');

console.log(moment('2018-07-06').day(7).format('YYYY-MM-DD'));
var b = moment('2018-07-02').subtract(7, 'day').format('YYYY-MM-DD');
console.log(b);