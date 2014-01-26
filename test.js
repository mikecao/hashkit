var Hashkit = require('./hashkit.js');

var h = new Hashkit();

var a = [0,1,2,3,4,5,10,100,363,1000,10000];

for (var i = 0; i < a.length; i++) {
    var j = a[i];
    var s = h.encode(j);
    var n = h.decode(s);
    console.log("%s -> %s -> %s", j, s, n);
}
console.log('---');
h.salt = 'abc';
for (var i = 0; i < a.length; i++) {
    var j = a[i];
    var s = h.encode(j);
    var n = h.decode(s);
    console.log("%s -> %s -> %s", j, s, n);
}
console.log('---');
h.padding = 3;
for (var i = 0; i < a.length; i++) {
    var j = a[i];
    var s = h.encode(j);
    var n = h.decode(s);
    console.log("%s -> %s -> %s", j, s, n);
}
