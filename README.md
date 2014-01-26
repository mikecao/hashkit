hashkit
=======

A utility for generating short ids like Youtube, Bitly and Imgur.

# Usage

## Node.js

    var Hashkit = require('./hashkit.js');

## Browser

    <script src="hashkit.js"></script>

## Example

    var hashkit = new Hashkit();

    var str = hashkit.encode(1000);
    var num = hashkit.decode(str);

    console.log(1000 + ' -> ' + str + ' -> ' + num);

This should output:

    1000 -> bM -> 1000
