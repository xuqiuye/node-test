const nano = require('nanomsg');


const sub = nano.socket('sub');
sub.connect('tcp://127.0.0.1:40009');

sub.on('data', function (buf) {
    console.log(String(buf));
});



