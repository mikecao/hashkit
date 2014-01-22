var crypto = require('crypto');
var md5 = crypto.createHash('md5');

var Hashkit = function(options){
    this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.salt = '';
    this.padding = 1;
};

Hashkit.prototype.encode = function(i){
    return this.baseEncode(i);
};

Hashkit.prototype.decode = function(s){
    return this.baseDecode(s);
};

Hashkit.prototype.baseEncode = function(i){
    if (i == 0) return this.chars[0];

    var s = '';
    var base = this.chars.length;

    while (i > 0) {
        s = this.chars[i % base] + "" + s;
        i = Math.floor(i / base);
    }

    return s;
};

Hashkit.prototype.baseDecode = function(s){
    var n = 0;
    var base = this.chars.length;

    for (var i = 0; i < s.length; i++) {
        n += this.chars.indexOf(s[i]) * Math.pow(base, s.length - i - 1);
    }

    return n;
};

Hashkit.prototype.getSeed = function(i) {
    var hash = md5.update(i + "" + this.salt).digest('hex');
    $dec = hexdec(substr($hash, 0, $padding));
    $num = $dec % pow(10, $padding);
    if ($num == 0) $num = 1;
    $num = str_pad($num, $padding, '0');

    return $num;
};

exports = module.exports = Hashkit;
