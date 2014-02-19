var Hashkit = require('./hashkit.js');

var a = [0,1,2,3,4,5,6,7,8,9,10,100,101,102,1000,1001,10000,10001,1000000,1000001,10000000];

function test(array, options) {
    var hashkit = new Hashkit(options);

    console.log(hashkit.options);
 
    for (var i = 0; i < array.length; i++) {
        var j = array[i];
        var s = hashkit.encode(j);
        var n = hashkit.decode(s);
        console.log("%s -> %s -> %s", j, s, n);
    }

    console.log('---');
}

// Default
test(a);

// Shuffled characters
test(a, { "shuffle": true });

// Masked numbers
test(a, { "mask": true });

// Masked numbers with shuffling
test(a, { "shuffle": true, "mask": true });

// All options
test(a, { "shuffle": true, "mask": true, "seed": 99999 });
test(a, { "shuffle": true, "mask": true, "seed": "this is a string" });
test(a, { "shuffle": true, "mask": true, "padding": 10, "seed": Math.random() * Date.now() });
