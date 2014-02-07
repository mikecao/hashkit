hashkit
=======

A tool for generating short ids like Youtube, Bitly and Imgur.

## Usage

### node.js

To use Hashkit on the server, require the file:

    var Hashkit = require("./hashkit.js");

### Browser

To use Hashkit in a browser, include the script in your markup:

    <script src="hashkit.js"></script>

## Example

After loading the script you can declare an instance of Hashkit and use the `encode` and `decode` methods:

    var hashkit = new Hashkit();

    // Pass in an int and get a short id string
    var str = hashkit.encode(1000);

    // Pass in a short id string and get the original number
    var num = hashkit.decode(str);

    console.log(1000 + " -> " + str + " -> " + num);

This should output:

    1000 -> bM -> 1000

## Options

Hashkit provides the following options:

    chars - Character set to use for encoding (default: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789)
    shuffle - Shuffle the default character set (default: false)
    mask - Mask the real number being encoded (default: false)
    padding - Padding length for number masking (default: 3)
    seed - Seed used to randomize number masking and character shuffling (default: 123456789)

You can pass in options as an object to the constructor:

    var hashkit = new Hashkit({ shuffle: true, mask: true });

## Character Shuffling

When you encode a series of numbers using the default character set, you will get a predictable set of ids:

    100 -> bM
    101 -> bN
    102 -> bO

If you provide a shuffled character set, for example:

    WLgvI6CN7tqi8xfdFJZYDVeuP5K0kpAhmTEG2SjH39cXoyMzQbsraUBwl1OR4n

You will instead get:

    100 -> Lj
    101 -> LH
    102 -> L3

You can either pass in your own shuffled character set:

    var hashkit = new Hashkit({ chars: "WLgvI6CN7tqi8xfdFJZYDVeuP5K0kpAhmTEG2SjH39cXoyMzQbsraUBwl1OR4n" });

Or just enable the shuffle option:

    var hashkit = new Hashkit({ shuffle: true });

## Number Masking

Besides character shuffling, number masking is another way to add randomness to short ids. When number masking is enabled, the number being
encoded will be padded with a random number and then encoded. When the id is decoded, you will get back the original number minus the padding.
Masking makes sequential numbers much more randomized and almost impossible to guess. For example:

    number -> masked number -> short id -> original number

    1 -> 8571 -> cop -> 1
    2 -> 1512 -> yy -> 2
    3 -> 4003 -> bcJ -> 3

To enable number masking:

    var hashkit = new Hashkit({ mask: true });

## Padding

The default padding length for number masking is 3. So the number 9 can be padded with 123 and result in 1239. You can adjust the padding length by
passing in a different value:

    var hashkit = new Hashkit({ mask: true, padding: 2 });

## Seeding

You can further randomize the results of character shuffling and number masking by passing in your own seed value:

    var hashkit = new Hashkit({ shuffle: true, mask: true, seed: 123456789 });

The seed can be any integer number or a string. The default seed will produce the following character set:

    WLgvI6CN7tqi8xfdFJZYDVeuP5K0kpAhmTEG2SjH39cXoyMzQbsraUBwl1OR4n

And the following short ids:

    1 -> gfd
    2 -> PP
    3 -> LgG

By changing the seed value:

    var hashkit = new Hashkit({ shuffle: true, mask: true, seed: 99999 });

You will get a different character set:

    yWjaFqLb8uIliZz7vr2REC30MPUhSxtpY1J6TfswGcmXdV9KDnegoHQkAN54OB

And different short ids:

    1 -> WT7
    2 -> AO
    3 -> UB
