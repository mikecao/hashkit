var hashkit = require('./hashkit.js');

var h = new hashkit();

var a = [0,1,2,3,4,5,10,100,363,1000,10000];

for (var i = 0; i < a.length; i++) {
    var j = a[i];
    var s = h.encode(j);
    var n = h.decode(s);
    console.log("%s -> %s -> %s", j, s, n);
}

h.salt = 'abc';
for (var i = 0; i < a.length; i++) {
    var j = a[i];
    var s = h.encode(j);
    var n = h.decode(s);
    console.log("%s -> %s -> %s", j, s, n);
}
