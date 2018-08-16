const nano = require('nanomsg');

const test = require('tape');

test('test ....', function (t) {
    t.plan(2);

    t.equal(typeof nano._bindings.AF_SP, 'number', 'AF_SP is a number');
    t.equal(typeof nano._bindings.NN_PAIR, 'number', 'NN_PAIR is a number');
})