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

    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var defaults = {
        "chars": chars,
        "shuffle": false,
        "mask": false,
        "padding": 3,
        "seed": 123456789
    };

    // Constructor
    var Hashkit = function(options) {
        this.options = extend({}, defaults, options);

        if (this.options.padding < 1) {
            this.options.padding = 1;
        }
        else if (this.options.padding > 8) {
            this.options.padding = 8;
        }

        if (this.options.shuffle) {
            this.options.chars = shuffle(chars.split(''), hashcode(this.options.seed)).join('');
        }
    };

    // Converts a number into an encoded string
    Hashkit.prototype.encode = function(i) {
        if (this.options.mask) {
            i = getMaskedNum(i, hashcode(this.options.seed), this.options.padding);
        }

        return baseEncode(i, this.options.chars);
    };

    // Converts an encoded string into a number
    Hashkit.prototype.decode = function(s) {
        var num = baseDecode(s, this.options.chars);

        if (this.options.mask) {
            return parseInt(num.toString().substr(this.options.padding));
        }

        return num;
    };

    // Converts a number into a base-n string
    function baseEncode(i, chars) {
        if (i === 0) return chars[0];

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

    // Gets a masked number
    function getMaskedNum(i, seed, padding) {
        var r = random(i ^ seed, 10);
        var max = Math.pow(10, padding) - 1;
        var min = Math.pow(10, padding - 1);
        var mask = Math.floor(min + r * (max - min));

        return parseInt(mask + '' + i);
    }

    /*** Helper functions ***/

    // Gets a random number [0,1] for a given seed
    function random(x, n) {
        n = n || 1;

        // xorshift
        for (var i = 0; i < n; i++) {
            x ^= (x << 21);
            x ^= (x >>> 35);
            x ^= (x << 4);
        }
        return (x >>> 0) / 4294967296;
    }

    // Gets the hash code of a string
    function hashcode(str) {
        if (typeof str !== "string") {
            return str;
        }

        return str.split('').reduce(function(a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0); 
    }

    // Shuffles the contents of an array
    function shuffle(array, seed) {
        var i = array.length, j, tmp;

        while (i > 0) {
            j = Math.floor(random(i ^ seed, 10) * i);
            i--;
            tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }

        return array;
    }

    // Extends object properties
    function extend() {
        var obj = {},
            args = Array.prototype.slice.call(arguments);

        for (var i = args.length - 1; i > 0; i--) {
            var source = args[i];
            var target = copy({}, args[i-1]);
            obj = args[i-1] = copy(target, source);
        }

        return obj;
    }

    // Copies properties between objects
    function copy(target, source) {
        target = target || {};

        for (var prop in source) {
            if (typeof source[prop] === 'object') {
                target[prop] = extend(target[prop], source[prop]);
            }
            else {
                target[prop] = source[prop];
            }
        }

        return target;
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
