var Hashkit = require('./hashkit.js');

var a = [0,1,2,3,4,5,6,7,8,9,10,100,101,102,1000,1001,10000,10001,1000000,1000001,1000000000];

function test(array, seed, padding, shuffle) {
    var hashkit = new Hashkit({
        'seed': seed,
        'padding': padding,
        'shuffle': shuffle
    });

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
test(a, 0, 0, false);

// Shuffled characters
test(a, 0, 0, true);

// Masked numbers with padding
test(a, 0, 3, false);

// Masked numbers with padding and shuffling
test(a, 0, 3, true);

// All options
test(a, 123456789, 10, true);
