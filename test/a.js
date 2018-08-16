const mock = require('mockjs');
const Random = mock.Random;

Array.prototype.shuffle = function() {
    var array = this;
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
let a = [];
for(let i = 0; i <= 6; i++) {
    a.push(1,2,3,4,5,6,7,8,9,10,11,12,13);
}
for(let i = 0; i < 60; i++) {
    a.shuffle().shuffle().shuffle().shuffle().shuffle().shuffle().shuffle().shuffle().shuffle().shuffle().shuffle().shuffle();
    const f = Random.integer(1, 13);
    if(a[f + 1] == a[f + 3]) console.log('对子')
    if(a[f + 2] == a[f + 4]) console.log('对子')
}