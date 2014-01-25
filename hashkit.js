(function(){
// Requirements
if (typeof require !== 'undefined') {
    var crypto = require('crypto');
}

// Constructor
var Hashkit = function(options){
    this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.salt = '';
    this.padding = 1;
};

// Converts a number into an encoded string
Hashkit.prototype.encode = function(i){
    if (this.salt != '' && this.padding > 0) {
        var seed = this.getSeed(i, this.salt, this.padding);
        i = parseInt(seed + '' + i);
    }

    return this.baseEncode(i);
};

// Converts an encoded string into a number
Hashkit.prototype.decode = function(s){
    var num = this.baseDecode(s);

    if (this.salt != '' && this.padding > 0) {
        return parseInt(num.toString().substr(this.padding));
    }

    return num;
};

// Converts a number into a base-n string
Hashkit.prototype.baseEncode = function(i){
    if (i == 0) return this.chars[0];

    var s = '';
    var base = this.chars.length;

    while (i > 0) {
        s = this.chars[i % base] + '' + s;
        i = Math.floor(i / base);
    }

    return s;
};

// Converts a base-n string into a number
Hashkit.prototype.baseDecode = function(s){
    var n = 0;
    var base = this.chars.length;

    for (var i = 0; i < s.length; i++) {
        n += this.chars.indexOf(s[i]) * Math.pow(base, s.length - i - 1);
    }

    return n;
};

// Gets the hash value of a string
Hashkit.prototype.getHash = function(s){
    return md5(s);
};

// Gets a seed value for number encoding
Hashkit.prototype.getSeed = function(i, salt, length) {
    var hash = this.getHash(i + '' + salt);
    var dec = parseInt(hash.substr(0, length), 16);
    var base = Math.pow(10, length);
    var num = dec % base;

    if (num == 0) num = 1;

    while (num < base / 10) {
        num = num * 10;
    }

    return num;
};

// Load MD5 function for hash function
var md5 = function(s) {
    if (typeof require !== 'undefined') {
        return crypto.createHash('md5').update(s).digest('hex')
    }
    else {
        return window.md5(s);
    }
};


// Export for nodejs, AMD, or browser
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Hashkit;
}
else {
    if (typeof define === 'function' && define.amd) {
        define([], function(){
            return Hashkit;
        });
    }
    else {
        window.Hashkit = Hashkit;
    }
}
})();
