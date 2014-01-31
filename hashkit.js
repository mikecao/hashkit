/**
 * Hashkit.js
 *
 * A utility for generating short ids like Youtube, Bitly and Imgur.
 *
 * Copyright 2014 Mike Cao <mike@mikecao.com>
 * Licensed under the MIT license
 */
(function() {
    /*** Core functions ***/

    // Constructor
    var Hashkit = function(options) {
        this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.salt = '';
        this.padding = 0;

        if (options) {
            for (i in options) {
                this[i] = options[i];
            }
        }
    };

    // Converts a number into an encoded string
    Hashkit.prototype.encode = function(i) {
        if (typeof this.salt === "string" && this.salt.length > 0) {
            i = getMaskedNum(i, this.salt, this.padding | 3);
        }

        return baseEncode(i, this.chars);
    };

    // Converts an encoded string into a number
    Hashkit.prototype.decode = function(s) {
        var num = baseDecode(s, this.chars);

        if (typeof this.salt === "string" && this.salt.length > 0) {
            return parseInt(num.toString().substr(this.padding | 3));
        }
        else if (this.padding > 0) {
            return parseInt(num.toString().substr(this.padding));
        }

        return num;
    };

    // Shuffles the default character set
    Hashkit.prototype.shuffleChars = function(seed) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        if (typeof this.salt === "string" && this.salt.length > 0) {
            this.chars = shuffleArray(chars.split(''), seed).join('');
        }
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

    // Gets a masked number
    function getMaskedNum(i, salt, length) {
        var hash = getHash(i + '' + salt);
        var rand = getRandom(hash);
        var max = Math.pow(10, length) - 1;
        var min = Math.pow(10, length - 1);
        var mask = Math.floor(min + rand * (max - min));

        return parseInt(mask + '' + i);
    }

    // Gets the hash value of a string
    function getHash(s) {
        return md5(s);
    }

    // Gets a random number
    function getRandom(hash) {
        return parseInt(hash.substr(0, 8), 16) / 4294967295;
    }

    // Shuffles the contents of an array
    function shuffleArray(array, seed) {
        var counter = array.length, temp, index, r;

        while (counter > 0) {
            r = getRandom(getHash(index + '' + seed));
            index = Math.floor(r * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    /*** MD5 functions ***/

    // Gets the MD5 hash of a string
    var md5 = function(str) {
        var i, j,
            bytes = [],
            words = [],
            hex = [];

        var Y = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];

        var Z = [0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
            0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
            0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
            0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,

            0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
            0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
            0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
            0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,

            0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
            0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
            0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
            0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,

            0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
            0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
            0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
            0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391];

        // Convert string to UTF-8
        str = unescape(encodeURIComponent(str));

        // Convert string to bytes
        for (i = 0; i < str.length; i++) {
            bytes.push(str.charCodeAt(i) & 0xFF);
        }

        // Convert bytes to words
        for (i = 0, j = 0; i < bytes.length; i++, j += 8) {
            words[j >>> 5] |= bytes[i] << (24 - j % 32);
        }

        var m = words,
            l = str.length * 8,
            a = 0x67452301,
            b = 0xefcdab89,
            c = 0x98badcfe,
            d = 0x10325476;

        // Swap endian
        for (i = 0; i < m.length; i++) {
            m[i] = ((m[i] << 8) | (m[i] >>> 24)) & 0x00FF00FF |
                ((m[i] << 24) | (m[i] >>> 8)) & 0xFF00FF00;
        }

        // Padding
        m[l >>> 5] |= 0x80 << (l % 32);
        m[(((l + 64) >>> 9) << 4) + 14] = l;

        // Calculate
        for (i = 0; i < m.length; i += 16) {
            var aa = a,
                bb = b,
                cc = c,
                dd = d;

            var tmp, n, x, y, z;

            for (j = 0; j < 64; j++) {
                z = Z[j];
                if (j < 16) {
                    x = m[i + j];
                    y = Y[j % 4];
                    n = a + (b & c | ~b & d) + (x >>> 0) + z;
                }
                else if (j < 32) {
                    x = m[i + (5 * j + 1) % 16];
                    y = Y[4 + j % 4];
                    n = a + (b & d | c & ~d) + (x >>> 0) + z;
                }
                else if (j < 48) {
                    x = m[i + (3 * j + 5) % 16];
                    y = Y[8 + j % 4];
                    n = a + (b ^ c ^ d) + (x >>> 0) + z;
                }
                else {
                    x = m[i + (7 * j) % 16];
                    y = Y[12 + j % 4];
                    n = a + (c ^ (b | ~d)) + (x >>> 0) + z;
                }

                a = ((n << y) | (n >>> (32 - y))) + b;

                // Rotate
                tmp = d;
                d = c;
                c = b;
                b = a;
                a = tmp;
            }

            a = (a + aa) >>> 0;
            b = (b + bb) >>> 0;
            c = (c + cc) >>> 0;
            d = (d + dd) >>> 0;
        }

        words = [a, b, c, d];

        // Swap endian
        for (i = 0; i < words.length; i++) {
            words[i] = ((words[i] << 8) | (words[i] >>> 24)) & 0x00FF00FF |
                ((words[i] << 24) | (words[i] >>> 8)) & 0xFF00FF00;
        }

        // Convert words to bytes
        for (bytes = [], i = 0; i < words.length * 32; i += 8) {
            bytes.push((words[i >>> 5] >>> (24 - i % 32)) & 0xFF);
        }

        // Convert bytes to hex
        for (hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        
        return hex.join('');
    };

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
