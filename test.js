var Hashkit = require('./hashkit.js');

var h = new Hashkit();

var a = [0,1,2,3,4,5,6,7,8,9,10,100,101,102,363,1000,1001,10000,10001,1000000,1000001,1000000000];

for (var i = 0; i < a.length; i++) {
    var j = a[i];
    var s = h.encode(j);
    var n = h.decode(s);
    console.log("%s -> %s -> %s", j, s, n);
}
console.log(h.chars);

console.log('---');
h.salt = '0';
h.shuffleChars(h.salt);
for (var i = 0; i < a.length; i++) {
    var j = a[i];
    var s = h.encode(j);
    var n = h.decode(s);
    console.log("%s -> %s -> %s", j, s, n);
}
console.log(h.chars);

console.log('---');
h.salt = 'this is a really long salt value';
h.shuffleChars(h.salt);
for (var i = 0; i < a.length; i++) {
    var j = a[i];
    var s = h.encode(j);
    var n = h.decode(s);
    console.log("%s -> %s -> %s", j, s, n);
}
console.log(h.chars);
