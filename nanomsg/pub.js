const nano = require('nanomsg');



const test = require('tape');

test('close a valid socket', function (t) {
    t.plan(1);

    const pub = nano.socket('pub');

    pub.bind('tcp://127.0.0.1:40009')

    /* while(true) {
        setTimeout(function () {
            pub.send("Hello from nanomsg!");
        }, 100);
    } */

    setInterval(function () {
        pub.send('Hello from nanomsg');
    }, 1000)
    var rc = pub.close();
    t.equal(rc, 0);
});
