/**
 * Hashkit.js
 *
 * A tool for generating short ids like Youtube, Bitly and Imgur.
 *
 * Copyright 2014 Mike Cao <mike@mikecao.com>
 * Licensed under the MIT license
 */
(function() {
    /*** Core functions ***/

    var defaultChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Constructor
    var Hashkit = function(options) {
        this.chars = defaultChars;
        this.padding = 0;
        this.seed = 0;
        this.shuffle = false;

        if (options) {
            for (i in options) {
                this[i] = options[i];
            }
        }

        if (this.shuffle) {
            this.shuffleChars(this.seed);
        }
    };

    // Converts a number into an encoded string
    Hashkit.prototype.encode = function(i) {
        if (this.padding > 0) {
            if (this.padding > 8) this.padding = 8;

            i = getMaskedNum(i, this.seed, this.padding);
        }

        return baseEncode(i, this.chars);
    };

    // Converts an encoded string into a number
    Hashkit.prototype.decode = function(s) {
        var num = baseDecode(s, this.chars);

        if (this.padding > 0) {
            if (this.padding > 8) this.padding = 8;

            return parseInt(num.toString().substr(this.padding));
        }

        return num;
    };

    // Converts a number into a base-n string
    function baseEncode(i, chars) {
        if (i == 0) return chars[0];

        var s = '';
        var base = chars.length;

        while (i > 0) {
            s = chars[i % base] + '' + s;
            i = Math.floor(i / base);
        }

        return s;
    }

    // Converts a base-n string into a number
    function baseDecode(s, chars) {
        var n = 0;
        var base = chars.length;

        for (var i = 0; i < s.length; i++) {
            n += chars.indexOf(s[i]) * Math.pow(base, s.length - i - 1);
        }

        return n;
    }

    // Shuffles the default character set
    Hashkit.prototype.shuffleChars = function(seed) {
        if (typeof seed == "string") {
            seed = getHashCode(seed);
        }

        this.chars = shuffleArray(defaultChars.split(''), seed).join('');
    };

    // Gets a masked number
    function getMaskedNum(i, seed, padding) {
        var r = getRandom(i ^ seed, 10);
        var max = Math.pow(10, padding) - 1;
        var min = Math.pow(10, padding - 1);
        var mask = Math.floor(min + r * (max - min));

        return parseInt(mask + '' + i);
    }

    // Gets a random number [0,1] for a given seed
    function getRandom(x, n) {
        n = n || 1;

        // xorshift
        for (var i = 0; i < n; i++) {
            x ^= (x << 21);
            x ^= (x >>> 35);
            x ^= (x << 4);
        }
        return (x >>> 0) / 4294967296;
    };

    // Gets the hash code of a string
    function getHashCode(s) {
        return s.split('').reduce(function(a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0); 
    }

    // Shuffles the contents of an array
    function shuffleArray(array, seed) {
        var i = array.length, j, tmp;

        while (i > 0) {
            j = Math.floor(getRandom(i ^ seed, 10) * i);
            i--;
            tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }

        return array;
    }

    /*** Export ***/

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Hashkit;
    }
    else {
        if (typeof define === 'function' && define.amd) {
            define([], function () {
                return Hashkit;
            });
        }
        else {
            window.Hashkit = Hashkit;
        }
    }
})();
